 import joi from 'joi'

export const createTask = {
  body: joi
    .object({
      textTask: joi.string().min(2).max(55),
      taskDeadline: joi.date(),
      typesTasks:joi.string().min(2).max(55),
      taskList:joi.array().items({text:joi.string().required()}),
      typesTasks: joi.string().valid("text", "list").required(),

    })
    .required()
    .options({ presence: 'required' }),
}

export const updatetaskSchema = {
  body: joi
    .object({
      textTask: joi.string().min(4).max(10).optional(),
      taskDeadline: joi.date(),
      typesTasks:joi.string().min(2).max(55),
      typesTasks: joi.string().valid("text", "list").required(),
    })
    .required(),
}
