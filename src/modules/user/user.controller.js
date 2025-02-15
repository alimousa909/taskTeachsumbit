import { userModel } from "../../../DataBase/models/user.model.js";
import { asyncHandler } from "../../utiels/errhandelr.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { sendEmailService } from "../../services/sendemail.js";
import { verifyToken, generateToken } from "../../utiels/tokenFunction.js";
import { emailTemplate } from "../../utiels/emailtemplate.js";
import { tokenModel } from "../../../DataBase/models/token.model.js";


export const SignUp = asyncHandler(async (req, res, next) => {
  const { userName, email, password, age } = req.body
  const finduser = await userModel.findOne({ email })
  if (finduser) {
    res.json({ massage: "this email is already exist" })
  }
  const token = generateToken({
    payload: {
      email,
    },
    signature: 'adadadad',
    expiresIn: '1h',
  })


  const generate = jwt.sign({ email }, 'kdjakd')
  const confirmemiel = `${req.protcol}//${req.headers.host}:8000/user/confirmemiel/${token}`
  const isEmailSent = sendEmailService({
    to: email,
    subject: 'Confirmation Email',
    // message: `<a href=${conirmationlink}>Click here to confirm </a>`,
    message: emailTemplate({
      link: confirmemiel,
      linkData: 'Click here to confirm',
      subject: 'Confirmation Email',
    }),
  })

  if (!isEmailSent) {
    return next(new Error('fail to sent confirmation email', { cause: 400 }))
  }
  const createUser = await userModel.create({ userName, email, password, age })
  res.json({ msg: 'Done' })


})
export const confirmemiel = asyncHandler(async (req, res, next) => {
  const { token } = req.params
  const decode = verifyToken({
    token,
    signature: process.env.CONFIRMATION_EMAIL_TOKEN,
  })
  const user = await userModel.findOneAndUpdate(
    { email: decode?.email, isConfirmed: false },
    { isConfirmed: true },
    { new: true },
  )
  if (!user) {
    return next(new Error('already confirmed', { cause: 400 }))
  }
  res.status(200).json({ messge: 'Confirmed done, please try to login' })
})
export const SignIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  const user = await userModel.findOne({ email: req.body.email })
  if (!user) {
    return next(new Error('invalid login credentials', { cause: 400 }))
  }
  const isPassMatch = bcrypt.compare(password, user.password)
  if (!isPassMatch) {
    return next(new Error('invalid login credentials', { cause: 400 }))
  }

  const token = generateToken({
    payload: {
      email,
      _id: user._id,
    },
    signature: ' jaldjakldja',
    expiresIn: '1h',
  })
await tokenModel.create({token,user:user._id,agent: req.headers['user-agent']})
user.status = 'Online';
await user.save();
  res.status(200).json({ messge: 'Login done', token })
})
export const forgetPassowrd = asyncHandler(async (req, res, next) => {
  const { email } = req.body
  const user = await userModel.findOne({ email })
  if (!user) {
    res.json({ message: 'invalid email' })
  }
  const code = nanoid();
  const hashedCode = bcrypt.hashSync(code, 8)
  const token = generateToken({
    payload: {
      email,
      sentCode: hashedCode,
    },
    signature: 'aaaa',
    expiresIn: '1h',
  })
  const resetPasswordLink = `${req.protocol}://${req.headers.host}/user/reset/${token}`
  const isEmailSent = sendEmailService({
    to: email,
    subject: 'Reset Password',
    message: emailTemplate({
      link: resetPasswordLink,
      linkData: 'Click to Reset your password',
      subject: 'Reset Password Email',
    }),
  })
  if (!isEmailSent) {
    res.status(200).json({ message: 'fail to reset pass' })
  }

  const userUpdates = await userModel.findOneAndUpdate(
    { email },
    {
      forgetCode: hashedCode,
    },
    {
      new: true,
    },
  )
  res.status(200).json({ message: 'Done', userUpdates })
})
