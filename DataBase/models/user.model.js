import {model , Schema , Types} from 'mongoose'
const userSchema = new Schema ({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    status: {
        type: String,
        default: 'Offline',
        enum: ['Online', 'Offline'],
      },
    age:String,
    
},
{timestamps:true})

export const userModel = model ('User' , userSchema)