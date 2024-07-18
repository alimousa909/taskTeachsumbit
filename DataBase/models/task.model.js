import { model , Schema , Types } from "mongoose";
const taskSchema = new Schema ({
    taskList:[{
        text:{ type:String }

    }],
    textTask:{
        type:String

    },
    taskDeadline:{
        type:Date,
        required:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    isPuplic:{
        type:Boolean,
        default:false,
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true

    },
    typesTasks: { type: String, enum: ["text", "list"], required: true, }

},{timestamps:true})

taskSchema.pre('save', function (next) {
    if (this.typesTasks === 'list' && this.taskList && this.taskList.length > 0) {
        this.taskList.forEach((task, index) => {
            task.id = index + 1;
        });
    }
    next();
});
export const taskModel = model ('Task',taskSchema)