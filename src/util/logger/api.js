export const handleApiError = (res, error) => {
    if (error.type) {
        return res.status(error.statuses[error.type]).json({
            status: 'error',
            message: error.message,
            error: error.stack,
        });
    } else {
        return res.status(500).json({
            status: 'error',
            message: error.message,
            error: error.stack,
        });
    }
};

export class ApiError extends Error {
    constructor(message, type) {
        super(message);
        this.type = type;
        this.statuses = {
            server: 500,
            validation: 400,
            notfound: 404,
            unauthorized: 401,
        };
    }
}
