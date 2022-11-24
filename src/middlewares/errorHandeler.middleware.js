
export const erorrHandeler = (err, req, res, next) =>{
    // return res.status(err.status).json({
    //     message: err.message,
    //     status: err.status
    // })

    res.render('errors.ejs', {message: err.message, status: err.status})
    return
}