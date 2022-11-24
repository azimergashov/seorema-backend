import { ErrorCostumer } from "../exceptions/errorCostumer.js"
import { read } from "../utils/FS.js"
import { loginValidate } from "../validate/login.validate.js"
import { sign } from "../utils/jwt.js"


export const loginGet = (req, res, next)=>{
    res.render('index.ejs')
    return
}

export const login = (req, res, next) =>{
    const {error, value} = loginValidate.validate(req.body)

    if(error){
        return next(new ErrorCostumer(error.message, 400))
    }

    const {name, password} = value

    const allUsers = read("users.json")

    const foundUser = allUsers.find(e => e.name == name &&  e.password == password)

    if(!foundUser){
        return next( new ErrorCostumer("User not found", 404))
    }


    if(foundUser.role == "admin"){
        res.cookie("access_token", sign({id: foundUser.id, role: foundUser.role}))
        res.redirect("/supperadmin")
        return
    }

    if(foundUser.role == "worker"){
        res.cookie("access_token", sign({id: foundUser.id, role: foundUser.role}))
        res.redirect("/workers")
        return
    }
}