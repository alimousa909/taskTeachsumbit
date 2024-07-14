import { Router } from "express";
import * as tc from './task.controller.js'
const router = Router()
router.post('/', tc.createTask)
router.get('/',tc.getTask)
router.put('/:categoryId',tc.updateTask)
router.delete('/',tc.deleteTask)
export default router