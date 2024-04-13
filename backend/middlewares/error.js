export default (err, req, res, next) => {
    let error = {
        statusCode : err?.statusCode || 500,
        message: err?.message || "Internal Server error",
    };

    if(process.env.NODE_ENV === "DEVELOPMENT") {
        res.status(error.statusCode).json({
            message: error.message,
            error: err,
            stack: err?.stack
        })
    }
    else if(process.env.NODE_ENV === "PRODUCTION") {
        res.status(error.statusCode).json({
            message: error.message
        })
    }
}