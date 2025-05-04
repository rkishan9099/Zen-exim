const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            message: Object.values(err.errors).map(error => error.message)
        });
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        return res.status(400).json({
            status: 'error',
            message: 'Duplicate field value entered'
        });
    }

    // Mongoose cast error (invalid ID)
    if (err.name === 'CastError') {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid ID format'
        });
    }

    // Default error
    return res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal server error'
    });
};

module.exports = errorHandler;