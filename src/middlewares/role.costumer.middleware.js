import { ErrorCostumer } from "../exceptions/errorCostumer.js"

export const supperAdminCostumer = (req, res, next)=>{
    console.log(req.role);
    if(req.role == "admin"){
        next()
    }else{
        next( new ErrorCostumer("you are not admin", 400))
    }

}


export const workersCostumer = (req, res, next)=>{
    console.log(req.role);
    if(req.role == "worker"){
        next()
    }else{
        next( new ErrorCostumer("you are not worker", 400))
    }

}