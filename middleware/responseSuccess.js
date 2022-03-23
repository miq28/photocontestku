function responseSuccess(req,res, next) {
    if (req.result) {
        const response = {
            status: res.statusCode,
            message: 'Success',
            result: req.result,
        }
        req.max ? response.max = req.max : null
        // console.log(response)
        return res.send(response)
    }
    next()
}

module.exports = {
    responseSuccess
}