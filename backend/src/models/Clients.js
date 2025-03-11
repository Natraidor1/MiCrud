import { Schema, model } from "mongoose";

const clientsSchema = new Schema(
{
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

    isVerified:{
        type: Boolean
    },
},

    {
        timestamps: true,
        strict: false, 
    }
);

export default model("Clients", clientsSchema);