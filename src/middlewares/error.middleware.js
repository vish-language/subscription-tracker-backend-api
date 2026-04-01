const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err };
        error.message = err.message;
        console.error("Error:", error);

        if (err.name === 'CAST_ERROR') {
            const message = `Resource not found with id ${err.value}`;
            error = new Error(message);
            error.statusCode = 404;
        } else if (err.name === 'VALIDATION_ERROR') {
            const message = Object.values(err.errors).map(val => val.message).join(', ');
            error = new Error(message);
            error.statusCode = 400;
        } else if (err.code === 11000) {
            const message = `Duplicate field value entered: ${JSON.stringify(err.keyValue)}`;
            error = new Error(message);
            error.statusCode = 400; 
        }
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || 'Server Error'
        });      
    } catch (error) {
        next(error);
    }
}   