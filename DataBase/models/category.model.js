import { Schema , Types, model } from "mongoose";
const categorySchema = new Schema ({
    categoryName:{
        type:String,
        required:true
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    },
    slug:{
        type:String,
        required:true
    }

},{
    toJSON:true,
    toObject:true,
    timestamps:true
})
categorySchema.virtual('Task',{
    localField: '_id',
    foreignField:'categoryId',
    ref:'Task'
    }
    )
export const categoryModel = model ('Category',categorySchema)