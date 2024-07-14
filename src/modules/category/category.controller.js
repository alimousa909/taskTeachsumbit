import slugify from "slugify";
import { categoryModel } from "../../../DataBase/models/category.model.js";
import { asyncHandler } from "../../utiels/errhandelr.js";
import slug from "slugify"
import { taskModel } from "../../../DataBase/models/task.model.js";
export const createCategory = asyncHandler( async (req, res, next) => {
     const { _id } = req.authUser
     const { categoryName } = req.body
    // const slug = slugify(name, '_')
     if (await categoryModel.findOne({ categoryName })) {
       return next(
         new Error('please enter different category name', { cause: 400 }),
       )
     }
   
     const categoryObject = {
       categoryName,
       slug:slugify(req.body.categoryName,'_'),
       createdBy: _id,
     }
     const createCategory = await categoryModel.create(categoryObject)
     return res.status(201).json({msg:'Done',createCategory})
})
export const updateCategory = asyncHandler (async (req, res, next) => {
    // const { _id } = req.authUser
     const { categoryId } = req.params
     const { categoryName } = req.body
     // console.log()
     // get category by id
     const category = await categoryModel.findOne({
       _id: categoryId,
       // createdBy: _id,
     })
     if (!category) {
       return next(new Error('invalud category Id' ))
     }
   
     if (categoryName) {
       // different from old name
       if (category.categoryName == req.body.categoryName.toLowerCase()) {
         return next(
           new Error('please enter different name from the old category name'
          ),
         )
       }
       // unique name
       if (await categoryModel.findOne({ categoryName })) {
         return next(
           new Error('please enter different category name , duplicate name'
          ),
         )
       }
   
       category.categoryName = categoryName
       category.slug = slugify(categoryName, '_')
     }
   
     
   //  category.updatedBy = _id
     await category.save()
     res.status(200).json({ message: 'Updated Done', category })
})
export const deleteCategory = asyncHandler ( async (req, res, next) => {
    // const { _id } = req.authUser
     const { categoryId } = req.query
   
     // check category id
     const categoryExists = await categoryModel.findOneAndDelete({
       categoryId,
      // createdBy: _id,
     })
     if (!categoryExists) {
       return next(new Error('invalid categoryId', { cause: 400 }))
     }
     const deleteRealtedtasks = await taskModel.deleteMany({
      categoryId,
    })
  
    if (!deleteRealtedtasks.deletedCount) {
      return next(new Error('delete fail task', { cause: 400 }))
    }
} )
export const getCategory = asyncHandler ( async (req,res,next)=>  {
  const findCategory = await categoryModel.find().populate([{
      path:'Task'
  }])
  res.status(200).json({msg:'Done'})
 })
 export const getAllcategorywithFilter = async (req, res, next) => {
  const apiFeaturesInstance = new ApiFeatures(categoryModel.find(), req.query)
    .sort()
    .filters()

  const data = await apiFeaturesInstance.mongooseQuery

  res.status(200).json({ message: 'Done', data })
}
