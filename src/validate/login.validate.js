import Joi from "joi"

export  const loginValidate = Joi.object({
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(4).max(30)
})

export const createWorkerValidate = Joi.object({
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(4).max(30)
})

export const createAdminValidate = Joi.object({
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(4).max(30)
})

export const createTaskValidate = Joi.object({
    title: Joi.string().required().min(2),
    workerId: Joi.number().required()
})

export const createCommentValidate = Joi.object({
    comment: Joi.string().required()
})