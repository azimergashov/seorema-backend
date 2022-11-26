import {read, write} from '../utils/FS.js'
import {createAdminValidate, createTaskValidate, createWorkerValidate} from '../validate/login.validate.js'
import {ErrorCostumer} from '../exceptions/errorCostumer.js'
// import { date } from 'joi'

export const supperAdminGet = (req, res, next)=>{

   const allWorkers = read('users.json').filter(e => e.role == "worker")
   const allAdmins = read('users.json').filter(e => e.role == "admin" && e.id != req.userId)
   console.log(allWorkers);

   const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1
    const day = new Date().getDate()

   return  res.render('supperadmin.ejs', {allWorkers: allWorkers, allAdmins: allAdmins, newDate: `${year}.${month}.${day}`})
}

export const createWorkerSup =  (req, res, next) =>{
   const {error, value} = createWorkerValidate.validate(req.body)

   if(error){
     return   next(new ErrorCostumer(error.message, 400))
   }

   const {name, password} = value
   const allUsers = read('users.json')

   const foundUser = allUsers.find(e => e.name == name && e.password == password)

   if(foundUser){
       return next(new ErrorCostumer("Bu foydalanuvchi hali ham mavjud", 400))
   }
   allUsers.push({id: allUsers.at(-1).id + 1 || 1, name: name, password: password, role: "worker"})

   const newWorker = write("users.json", allUsers)

   if(!newWorker){
     return  next(new ErrorCostumer("Server error", 500))
   }
   return res.redirect('/supperadmin')
}

export  const  deleteWorkerSup = (req, res, next)=>{
   const {id} = req.params

   const allUsers = read('users.json')
   const foundWorker = allUsers.findIndex(e => e.id == id)

   console.log(foundWorker);

    allUsers.splice(foundWorker, 1)

    const deleteWorker = write('users.json', allUsers)

   return res.redirect('/supperadmin')
}

export const createAdmin = (req, res, next)=>{
    const {error, value} = createAdminValidate.validate(req.body)

    if(error){
        return next(new ErrorCostumer(error.message, 400))
    }

    const {name, password} = value
    const allUsers = read('users.json')
    const foundUser = allUsers.find(e => e.name == name &  e.password == password)

    if(foundUser){
        return next(new ErrorCostumer('Bu foydalanuvchi hali ham mavjud', 400))
    }

    allUsers.push({id: allUsers.at(-1).id + 1 || 1, name, password, role: "admin"})
    const newAdmin = write('users.json', allUsers)

    if(!newAdmin){
        return next(new ErrorCostumer('Server error', 500))
    }

    return res.redirect('/supperadmin')
}
export const createTask = (req, res, next) =>{
    const {error, value} = createTaskValidate.validate(req.body)

    if(error){
        return next(new ErrorCostumer(error.message, 400))
    }

    const {title, workerId} = value

    const allTasks = read('tasks.json')
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1
    const day = new Date().getDate()
    const hour = new Date().getHours()
    const minute = new Date().getMinutes()


    allTasks.push({id: allTasks.at(-1)?.id + 1 || 1, workerId, title, comment: "", commentDate: "", commentHour: "", year: year, month: month, day: day, hour: hour, minute: minute, isComplited: false})

    const newTask = write('tasks.json', allTasks)

    if(!newTask){
        return next(new ErrorCostumer('Server error', 500))
    }

    return res.redirect(`/supperadmin/worker/${workerId}`)


}

export const deleteTask = (req, res, next) =>{
    const {id, workerId} = req.params


    const allTasks = read('tasks.json')

    const foundTask = allTasks.findIndex(e => e.id == id)

    allTasks.splice(foundTask, 1)

    const deleteTask = write('tasks.json', allTasks)

    if(!deleteTask){
        return next(new ErrorCostumer('Server error', 500))
    }

    return res.redirect(`/supperadmin/worker/${workerId}`)
}