
import express from 'express'
import {  adminWorkersGet } from '../controller/admin.controller.js'
import { login, loginGet } from '../controller/login.controller.js'
import { createAdmin, createTask, createWorkerSup, deleteTask, deleteWorkerSup, supperAdminGet } from '../controller/supperadmin.js'
import { createComment, wokersGet } from '../controller/workers.js'
import { supperAdminCostumer, workersCostumer } from '../middlewares/role.costumer.middleware.js'
import { verifyToken } from '../middlewares/verify.middleware.js'


const router = express.Router()

// login
// get
router.get('/', loginGet)
//
router.post('/login', login )
// midelwares
router.use(verifyToken)
// midelwares

// superadmin
router.get('/supperadmin', supperAdminCostumer, supperAdminGet)
router.get('/supperadmin/worker/:id',  supperAdminCostumer,  adminWorkersGet)
router.get('/supperadmin/deleteWorker/:id', supperAdminCostumer, deleteWorkerSup)
router.get('/deleteTask/:id/:workerId', supperAdminCostumer, deleteTask)
// post
router.post('/createWorkerSup', supperAdminCostumer, createWorkerSup)
router.post('/createAdmin', supperAdminCostumer, createAdmin)
router.post('/createTask', supperAdminCostumer, createTask)
// superadmin

// admin
// get
// workers
router.get('/workers', workersCostumer, wokersGet)
// post
router.post('/createComment/:id', workersCostumer, createComment)
// workers





export default router