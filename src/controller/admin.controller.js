
import { ErrorCostumer } from '../exceptions/errorCostumer.js'
import {read, write} from '../utils/FS.js'
import { createWorkerValidate } from '../validate/login.validate.js'

export const adminGet = (req, res, next) =>{
    const allWorkers = read('users.json').filter(e => e.role == "worker")


    return  res.render('admin.ejs', {allWorkers: allWorkers})
}

export const adminWorkersGet = (req, res, next)=>{
    const {id} = req.params

    const allWorkers = read('users.json').filter(e => e.role == "worker")

    const foundWorker = allWorkers.find(e => e.id == id)

    const allWorkInTheDay = read('tasks.json')

    const foundWork = allWorkInTheDay.filter(e => e.workerId == id)


    return res.render('admin.workers.ejs', {foundWorker: foundWorker, foundWork: foundWork})

}

export const createWorker =  (req, res, next) =>{
    const {error, value} = createWorkerValidate.validate(req.body)

    if(error){
        next( new ErrorCostumer(error.message, 400))
    }

    const {name, password} = value
    const allUsers = read('users.json')

    const foundUser = allUsers.find(e => e.name == name && e.password == password)

    if(foundUser){
        next( new ErrorCostumer("Bu foydalanuvchi hali ham mavjud", 400))
    }
    allUsers.push({id: allUsers.at(-1).id + 1 || 1, name: name, password: password, role: "worker"})

    const newWorker = write("users.json", allUsers)

    if(!newWorker){
        next(new ErrorCostumer("Server error", 500))
    }

    res.redirect('/admins')
 }

 export  const  deleteWorker = (req, res, next)=>{
    const {id} = req.params

    const allUsers = read('users.json')
    const foundWorker = allUsers.findIndex(e => e.id == id)

    console.log(foundWorker);

     allUsers.splice(foundWorker, 1)

     const deleteWorker = write('users.json', allUsers)

    return res.redirect('/admins')

 }
