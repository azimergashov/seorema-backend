import { ErrorCostumer } from '../exceptions/errorCostumer.js'
import {read, write} from '../utils/FS.js'
import { createCommentValidate } from '../validate/login.validate.js'


export const wokersGet = (req, res, next)=>{
    const allTasks = read('tasks.json')
    const foundTasks = allTasks.filter(e => e.workerId == req.userId)
    const foundUser = read('users.json').find(e => e.id == req.userId)

    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1
    const day = new Date().getDate()

    return res.render('workers.ejs', {foundTasks: foundTasks, foundUser: foundUser, newDate: `${year}.${month}.${day}` })
}

export const createComment = (req, res, next) =>{
    const {id} = req.params
    const {error, value } = createCommentValidate.validate(req.body)

    const allTasks = read('tasks.json')

    const foundTask = allTasks.find(e => e.id == id)

    if(error){
        return next( new ErrorCostumer(error.message, 400))
    }
    const {comment} = value


    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1
    const day = new Date().getDate()
    const hour = new Date().getHours()
    const minute = new Date().getMinutes()

    foundTask.comment = comment
    foundTask.commentDate = `${year}.${month}.${day}`
    foundTask.commentHour = `${hour}:${minute}`

    const newComment = write('tasks.json', allTasks)

    res.redirect('/workers')

}

export const iscomplited = (req, res, next)=>{
    const {id} = req.params

    const allTasks = read('tasks.json')

    const foundTask = allTasks.find(e => e.id == id)

    if(!foundTask){
        return next( new ErrorCostumer("Task not found", 404))
    }

    foundTask.isComplited = true

    const isComplit = write('tasks.json', allTasks)

    return res.redirect('/workers')
    // res.redirect(req.get('referer'));
    // return res.json({
    //     message: "ok"
    // })

}
