 import joi from 'joi'

export const createCategorySchema = {
  body: joi
    .object({
      categoryName: joi.string().min(4).max(55),
    })
    .required()
    .options({ presence: 'required' }),
}

export const updateCategorySchema = {
  body: joi
    .object({
        categoryName: joi.string().min(4).max(10).optional(),
    })
    .required(),
}
