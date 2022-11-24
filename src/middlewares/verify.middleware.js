import { ErrorCostumer } from "../exceptions/errorCostumer.js"
import jwt from 'jsonwebtoken'


export const verifyToken = (req, res, next) =>{
    const access_token = req.headers.cookie.split("=")[1]


    if(!access_token){
        return next(new ErrorCostumer("access token not found", 401))
    }

    jwt.verify(access_token, process.env.SECRET_KEY, (err, decode)=>{
        if(err instanceof jwt.JsonWebTokenError){
            return next(ErrorCostumer("Token is invalid", 400))
        }

        req.userId = decode.id
        req.role = decode.role
    })

    next()

}