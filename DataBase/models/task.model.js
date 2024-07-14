import { model , Schema , Types } from "mongoose";
const taskSchema = new Schema ({
    taskName:{
        type:String,
    },
    taskList:[{
        text:{
            type:String
        }

    }],
    taskDeadline:{
        type:String,
        required:true
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    },
    isPuplic:{
        type:Boolean,
        default:false,
    }

},{timestamps:true})

export const taskModel = model ('Task',taskSchema)