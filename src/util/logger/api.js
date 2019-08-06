export const handleApiError = (res, error) => {
	let responseObj = {};
	if (process.env.NODE_ENV === "production") {
		responseObj = {
			status: "error",
			message: error.message
		};
	} else {
		responseObj = {
			status: "error",
			message: error.message,
			error: error.stack
		};
	}
	if (error.type) {
		return res.status(error.statuses[error.type]).json(responseObj);
	} else {
		if (error.stack.toString().includes("SequelizeUniqueConstraintError")) {
			responseObj.message = "Email already has an account";
		}
		return res.status(500).json(responseObj);
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
			unauthorized: 401
		};
	}
}
