import { categoryModel } from "../../../DataBase/models/category.model.js";
import { taskModel } from "../../../DataBase/models/task.model.js";
import { asyncHandler } from "../../utiels/errhandelr.js";
import { ApiFeatures } from "../../utiels/ApiFeatures.js";

export const createTask = asyncHandler(async (req, res, next) => {
    const { textTask, taskDeadline, taskList, typesTasks } = req.body
    const Category = await categoryModel.findById(req.params.categoryId)
    if (!Category) {
        return next(
            new Error('this category dosent exist'
            ),
            { cause: 400 })
    }
    if (typesTasks === 'text') {
        const createTaskobject = await taskModel.
            create({
                textTask,
                taskDeadline,
                createdBy: req.user._id,
                categoryId: req.params.categoryId,
                typesTasks
            });

        return res.status(201).json({ message: 'created Succefully', createTaskobject })
    }
    if (typesTasks === 'list') {
        const createTaskobject = await taskModel.
            create({
                taskList,
                taskDeadline,
                createdBy: req.user._id,
                categoryId: req.params.categoryId,
                typesTasks
            });

        return res.status(201).json({ message: 'created Succefully', createTaskobject })
    }

})
export const updateTask = asyncHandler(async (req, res, next) => {
    const { typesTasks, textTask, taskList, taskDeadline } = req.body
    const task = await taskModel.findById(req.params.task_id);
    if (!task) {
        return next(new Error('invalid task Id'))
    }
    if (req.user._id.toString() !== task.createdBy.toString()) {
        return next(new Error('not authorized'))
    }
    if (typesTasks == "text") {
        task.textTask = textTask ? textTask : task.textTask
        task.taskDeadline = taskDeadline ? taskDeadline : task.taskDeadline

        return res.status(200).json({ "msg": 'Update complete' });
    }
    if (typesTasks == "list") {

        task.taskDeadline = taskDeadline
            ? taskDeadline
            : task.taskDeadline
        await task.save()
      const tasks = taskList.map(async task => {
        console.log(task._id);
            await taskModel.findOneAndUpdate(
                { 'taskList._id': task._id },
                { $set: { 'taskList.$.text': task.text } },
                { new: true }
            );
        });
        // !Waiting for a task to update, then another task, and so on, and then updating the entire object
        await Promise.all(tasks);
        return res.status(200).json({ "msg": 'Update complete' });
    }
});
export const getTask = asyncHandler(async (req, res, next) => {
    const getTask = await taskModel.find()
    res.status(200).json({ msg: 'Done' })
})
export const deleteTask = asyncHandler(async (req, res, next) => {
    const { task_Id } = req.query

    // check category id
    const taskExists = await categoryModel.findOneAndDelete({
        taskId

    })
    if (!taskExists) {
        return next(new Error('invalid categoryId', { cause: 400 }))
    }

})
export const getAlltaskwithFilter = async (req, res, next) => {
    const apiFeaturesInstance = new ApiFeatures(taskModel.find(), req.query)
        .sort()
        // .pagination()
        .filters()

    const data = await apiFeaturesInstance.mongooseQuery

    res.status(200).json({ message: 'Done', data })
}
