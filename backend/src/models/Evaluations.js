import { Schema, model } from "mongoose";


const evaluationsSchema = new Schema({

    comment:{
        type: String,
    },

    grade:{

        type: Number,
        min : 1,
        max: 5
    },

    role:{

        type: String,
    },

    idEmployee:{
        type:Schema.Types.ObjectId,
        ref: "Employees"
    },
},

    {
        timestamps: true,
        strict: false,
    }    
);

export default model("Evaluations", evaluationsSchema);