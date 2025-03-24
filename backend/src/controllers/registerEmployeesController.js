const registerEmployeesController = {}

import EmployeesModel from "../models/Employees.js"
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

registerEmployeesController.Register = async (req, res) =>{

    const {name, lastName, birthday,email, address, hireDate, password, telephone, dui, isssNumber,isVerified} = req.body;

    try {
    //verificamos si el empleado ya existe
        const existEmployee = await EmployeesModel.findOne({email})

        if (existEmployee) {
            
            return res.json({message : "this employee exist"})
        }

        //encriptar la contrasaña

        const passwordHash = await bcryptjs.hash(password)

        //guardamos el empleado nuevo
        const newEmployee = new EmployeesModel({name, lastName, birthday,email, address, hireDate, password:passwordHash , telephone, dui, isssNumber,isVerified});
        await register.save();

        res.json({message: "Employee inserted"})

        //TOKEN

        jsonwebtoken.sign(
            //1 que voy a guardar
            {id: newEmployee._id},
            
            //2- secreto
            config.JWT.secret,
         
            //3- cuando expira
            {expiresIn: config.JWT.expiresIn},

            //4- funcion flecha
            (error, token) => {
                if(error) console.log(error)
                res.cookie("authToken", token)
            }
        ) 

    } catch (error) {

        console.log(error);
        res.json({message: "error al registrar empleado"})

    }

    
}

export default registerEmployeesController;