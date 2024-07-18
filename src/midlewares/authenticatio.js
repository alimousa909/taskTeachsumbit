/*
import { userModel } from '../../DataBase/models/user.model.js'
import { generateToken, verifyToken } from '../utiels/tokenFunction.js'

export const isAuth = (roles) => {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers
      if (!authorization) {
        return next(new Error('Please login first', { cause: 400 }))
      }

      if (!authorization.startsWith('ecomm__')) {
        return next(new Error('invalid token prefix', { cause: 400 }))
      }

      const splitedToken = authorization.split(' ')[1]
      console.log(splitedToken)
      try {
        const decodedData = verifyToken({
          token: splitedToken,
          signature: process.env.SIGN_IN_TOKEN_SECRET,
        })
        console.log({ decodedData })
        const findUser = await userModel.findById(
          decodedData._id,
          'email userName role',
        )
        if (!findUser) {
          return next(new Error('Please SignUp', { cause: 400 }))
        }

        //============================== authorization ============
        // console.log(roles)
        // console.log(findUser.role)

        if (!roles.includes(findUser.role)) {
          return next(new Error('Unauthorized user', { cause: 401 }))
        }

        req.authUser = findUser
        next()
      } catch (error) {
        // token  => search in db
        if (error == 'TokenExpiredError: jwt expired') {
          // refresh token
          const user = await userModel.findOne({ token: splitedToken })
          if (!user) {
            return next(new Error('Wrong token', { cause: 400 }))
          }
          // generate new token
          const userToken = generateToken({
            payload: {
              email: user.email,
              _id: user._id,
            },
            signature: process.env.SIGN_IN_TOKEN_SECRET,
            expiresIn: '1h',
          })

          if (!userToken) {
            return next(
              new Error('token generation fail, payload canot be empty', {
                cause: 400,
              }),
            )
          }

          // user.token = userToken
          // await user.save()
          await userModel.findOneAndUpdate(
            { token: splitedToken },
            { token: userToken },
          )
          return res.status(200).json({ message: 'Token refreshed', userToken })
        }
        return next(new Error('invalid token', { cause: 500 }))
      }
    } catch (error) {
      console.log(error)
      next(new Error('catch error in auth', { cause: 500 }))
    }
  }

}
*/
import { userModel } from '../../DataBase/models/user.model.js'
import { generateToken, verifyToken } from '../utiels/tokenFunction.js'
import { asyncHandler } from '../utiels/errhandelr.js';
import { tokenModel } from '../../DataBase/models/token.model.js';
import jwk from 'jsonwebtoken'
 
export const auth = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization || !authorization.startsWith('loly__'))
    return next(
      new Error('authorization is required or in-valid Bearer Key', {
        cause: 400,
      })
    );

  const token = authorization.split('loly__')[1];
  // const decoded = verifyToken(token);
  const decoded = jwk.verify(token,' jaldjakldja');
  if (!decoded?._id)
    return next(new Error("in-valid token payload", { cause: 400 }));

  const tokenDB = await tokenModel.findOne({ token, isValid: true });
  if (!tokenDB) return next(new Error('token expired', { cause: 401 }));

  const user = await userModel.findById(decoded._id);
  if (!user) return next(new Error('Not register account', { cause: 401 }));

  req.user = user;
  return next();
});