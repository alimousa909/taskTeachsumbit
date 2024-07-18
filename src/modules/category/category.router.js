import { Router } from "express";
import * as cc from './category.controller.js'
import { auth } from "../../midlewares/authenticatio.js";
import { validationCoreFunction } from "../../midlewares/validation.js";
import * as validator from "./categooryValidation.js";
const router = Router()
router.post('/',auth,validationCoreFunction(validator.createCategorySchema),cc.createCategory)
router.get('/all',cc.getCategory)
router.put('/:categoryId',auth,validationCoreFunction(validator.updateCategorySchema),cc.updateCategory)
router.delete('/',cc.deleteCategory)
export default router