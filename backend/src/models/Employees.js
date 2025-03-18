import { Schema, model } from "mongoose";

const employeesSchema = new Schema ({

    name:{
        type: String, 
        
    },

    lastName:{
        type: String,
        require: true,
    },

    birthday:{
        type: Date,
        require: true,
    },

    email:{
        type: String,
        require: true,
    },

    address:{
        type: String,
        require: true,
    },

    hireDate:{
        type: Date,
        require: true,
    },

    password:{
        type: String,
        require: true,
    },

    telephone:{
        type: String,
        
    },

    dui:{
        type: String,
        require: true,
    },

    isssNumber:{
        type: Number
    },

    isVerified:{
        type: Boolean
    },

},
    {
        timestamps: true,
        strict: false, 
    }
);  

export default model("Employees", employeesSchema);