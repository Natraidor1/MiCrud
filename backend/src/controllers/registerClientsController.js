import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

import ClientsModel from "../models/Clients.js";
import { config } from "../config.js";
import { text } from "express";
import { error, info } from "console";


const registerClientsController = {}

registerClientsController.register = async (req, res)=>{

   const {name, 
    lastName,
    birthday, 
    email, 
    password, 
    telephone, 
    dui, 
    isVerified,} = req.body

    try {
        //verificamos si el cliente ya existe
       const existClients = await ClientsModel.findOne({email})

       if(existClients){
            return res.json({message: "Client already exist"})
       }

       //encriptamos la contraseña
       const passwordHash = await bcrypt.hash(password, 10);

       //guardamos al nuevo cliente
       const newClient = new ClientsModel({name, lastName, birthday, email, password:passwordHash, telephone, dui: dui || null, isVerified: isVerified || false}) //lo del dui es en caso que no tenga dui
       await newClient.save();

       //Generar un codigo aleatorio para enviarlo por correo

       const verificationCode = crypto.randomBytes(3).toString("hex");

       //generar un token que contenga el codigo de verificacion


        
       const tokenCode = jsonwebtoken.sign(

        //¿que voy a guardar?

        {email, verificationCode},
        
        config.JWT.secret,
   
        {expiresIn: "2h"},
        
        (error, token) => {
            if(error) console.log(error)
            res.cookie("authToken", token)
            res.json({message: "Cliente"})
        }

       );

       res.cookie("verificationToken", tokenCode, {maxAge: 2*60*60*1000}) //esto expira en 2h, * 60 minutos, *60 segundos * 1000milisegundos = 2h en resumidas palabras
       //Enviar el correo electronico
       //1- Transporter o quien lo envia
       const transporter = nodemailer.createTransport({

        service: "gmail",
        auth:{
            user: config.credentialsEmail.email,
            pass: config.credentialsEmail.password
        }

       });

       //2- Quien lo recibe



       ////AQUI LE AGREGUE HTML Y CSS
       const mailOptions = {
        from: config.emailAdmin.email,
        to: email,
        subject: "Verificación de correo",
        // Usamos HTML en lugar de texto plano
        html: `
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  color: #333;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: white;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .header {
                  text-align: center;
                  color: #4CAF50;
                }
                .content {
                  font-size: 16px;
                  line-height: 1.5;
                  margin-top: 20px;
                }
                .code {
                  font-size: 18px;
                  font-weight: bold;
                  color: #4CAF50;
                  margin-top: 20px;
                  text-align: center;
                  padding: 10px;
                  border: 2px solid #4CAF50;
                  border-radius: 4px;
                }
                .footer {
                  font-size: 12px;
                  color: #777;
                  text-align: center;
                  margin-top: 30px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>Verificación de Cuenta</h2>
                </div>
                <div class="content">
                  <p>¡Hola!</p>
                  <p>Gracias por registrarte en nuestra plataforma. Para completar el proceso de verificación de tu cuenta, utiliza el siguiente código:</p>
                  <div class="code">${verificationCode}</div>
                  <p>Este código expira en 2 horas.</p>
                  <p>Si no solicitaste este correo, por favor ignóralo.</p>
                </div>
                <div class="footer">
                  <p>&copy; 2025 Tu Empresa. Todos los derechos reservados.</p>
                </div>
              </div>
            </body>
          </html>`
      };

    //3- Enviar el correo
    
    transporter.sendMail(mailOptions, (error, info)=>{

    if(error){
        return res.json({message: "error sending email" } + error);
    }  

    console.log("Email sent " + info)

    });

    res.json({message: "Client registered, please verify your email with the code we send"})




    } catch (error) {
        console.log(error)
        res.json({message:"Error a al registrar Cliente"})
    }

};


registerClientsController.verifyCodeEmail = async (req,res) =>{

    const {requireCode} = req.body;
    //obtengo el token guardado en las cookies
    const token = req.cookies.verificationToken;

    try {
        
        //verificar y decodificar el token
        const decoded = jsonwebtoken.verify(token,config.JWT.secret)
        const {email, verificationCode: storedCode} = decoded;

        //comparar el codigo que envie por correo y esta guardado en las cookies
        //con el codigo que el usuario esta ingresando

        if(requireCode !== storedCode){

            return res.json({message: "invalid code"})
        }

        //marcamos al cliente como verificado
        const client = await ClientsModel.findOne({email});
        client.isVerified = true;
        await client.save();

        res.clearCookie("verificationToken");

        res.json({message : "Email verified successfully"})

    } catch (error) {
        
        console.log(error);
        res.json({message: "Error al verificar"})
    };

}


export default registerClientsController;
