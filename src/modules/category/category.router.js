import { Router } from "express";
import * as cc from './category.controller.js'
const router = Router()
router.post('/', cc.createCategory)
router.get('/',cc.getCategory)
router.put('/:categoryId',cc.updateCategory)
router.delete('/',cc.deleteCategory)
export default router