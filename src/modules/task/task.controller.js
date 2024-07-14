import { categoryModel } from "../../../DataBase/models/category.model.js";
import { taskModel } from "../../../DataBase/models/task.model.js";
import { asyncHandler } from "../../utiels/errhandelr.js";
import { ApiFeatures } from "../../utiels/ApiFeatures.js";

export const createTask = asyncHandler (async (req,res,next)=>{
    const {categoryId } = req.params
    const {_id} = req.authUser
    const checkCategory = await categoryModel.findById(categoryId)
    if(!checkCategory){
        return next(
            new Error('this category dosent exist'
           ),
          )
    }
    const createTaskobject = await taskModel.create({taskName,taskDeadline,taskList,createdBy:_id,categoryId})
    return res.status(201).json({message:'created Succefully',createTaskobject})
})
export const updateTask =  asyncHandler (async (req,res,next)=>{
    const {taskId} = req.params
    const task = await taskModel.findById(taskId)
    if(!task){
        return next(
            new Error('Invalid task'
           ),
          )
  }
     
    if (req.body.taskName){
        if (subCategory.taskName == req.body.taskName){
            return next(
                new Error('  same name !!!!!!'
               ),
              )
        }
        if(await taskModel.findOne({name:req.body.taskName})){
            return next(
                new Error('Name already exists'
               ),
              )
  
        }
        task.taskName = req.body.taskName;
        task.taskDeadline = req.body.taskDeadline;
        task.taskList = req.body.taskList;
        
    }
     
})
export const getTask = asyncHandler (async (req,res,next)=>{
    const getTask = await taskModel.find()
    res.status(200).json({msg:'Done'})
})
export const deleteTask = asyncHandler ( async (req, res, next) => {
    // const { _id } = req.authUser
     const { taskId } = req.query
   
     // check category id
     const taskExists = await categoryModel.findOneAndDelete({
       taskId
      
     })
     if (!taskExists) {
       return next(new Error('invalid categoryId', { cause: 400 }))
     }
 
} )
export const getAlltaskwithFilter = async (req, res, next) => {
    const apiFeaturesInstance = new ApiFeatures(taskModel.find(), req.query)
      .sort()
      // .pagination()
      .filters()
  
    const data = await apiFeaturesInstance.mongooseQuery
  
    res.status(200).json({ message: 'Done', data })
  }
  