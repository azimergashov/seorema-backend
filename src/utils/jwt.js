import jwt from 'jsonwebtoken'

export const sign = payload => {
   return  jwt.sign(payload, process.env.SECRET_KEY)
}