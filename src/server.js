import express from 'express'
import dotenv from 'dotenv'
import {erorrHandeler} from './middlewares/errorHandeler.middleware.js'
import { login } from './controller/login.controller.js'
import ejs from 'ejs'
import path from 'path'
import cors from "cors"
import router from './routes/router.js'


const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()


app.set('veiw engine', 'ejs')
app.set('views', path.join(process.cwd(), 'src', 'view'))
app.use('/assets', express.static(path.join(process.cwd(), 'src', 'assets')))
app.use(express.urlencoded())

app.use('/',  router)
// app.get('/', (req, res, next)=>{
//     res.end('ok')
// })

// app.get('/', (req, res, next)=>{
//     res.send('ok')
// })


app.use(erorrHandeler)

app.listen(9090, console.log(9090))