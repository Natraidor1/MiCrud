import ClientsModel from "../models/Clients.js"
import EmployeesModel from "../models/Employees.js"
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { config } from "../config.js"

const loginController = {}

loginController.login = async (req,res) =>{
    const{email,password} = req.body;

    try {
        
        let userFound; //para guardar el usuario encontrado
        let userType; //para guardar el tipo de usuario encontrado

        // 1 - ADMIN
        if(email === config.emailAdmin.email && password === config.emailAdmin.password){

            userType = "Admin",
            userFound = {_id: "admin"}
        }else{
            //2 - empleado

            userFound = await EmployeesModel.findOne({email})
            userType = "employee"

            // 3- cliente
            if(!userFound){

                userFound = await ClientsModel.findOne({email})
                userType = "Client"
            }
            
        }

        //Usuario no encontrado
        if(!userFound){
            console.log("the user not exist")
            return res.json({message: "user not found"})
        }


        //validar la contraseña
        //solo si no es ADMIN

        if(userType !== "Admin"){
            //veamos si la contraseña que estan escribiendo en el login
            //es la misma, que en la base de datos
            const isMatch = await bcryptjs.compare(password, userFound.password)
            if(!isMatch){
                return res.json({message: "incorrect password"})
            }
        }

        jsonwebtoken.sign(
            //1- que voy a guardar
            {id: userFound._id, userType},

            config.JWT.secret,

            {expiresIn: config.JWT.expiresIn},

            (error, token) =>{

                if(error) console.log(error)
                
                res.cookie("authToken", token)
                res.json({message : "log in succesfull"})

            }


        )

    } catch (error) {
        
        res.json({message: "error"})

    }
}

export default loginController;