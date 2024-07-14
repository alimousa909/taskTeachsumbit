import { Router } from "express";
import * as uc from './user.controller.js'
const router = Router()
router.post('/', uc.SignUp)
router.get('/confirm/:token', uc.confirmemiel)
router.post('/login', uc.SignIn)
router.post('/forget', uc.forgetPassowrd)
export default router