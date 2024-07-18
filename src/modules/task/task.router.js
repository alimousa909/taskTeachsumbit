import { Router } from "express";
import * as tc from './task.controller.js'
import * as validator from './taskValidation.js'
import { validationCoreFunction } from "../../midlewares/validation.js";
import { auth } from "../../midlewares/authenticatio.js";
const router = Router()
router.post('/create/:categoryId',auth,validationCoreFunction(validator.createTask),tc.createTask)
router.get('/',tc.getTask)
router.patch('/:task_id',tc.updateTask)
router.delete('/',tc.deleteTask)
export default router