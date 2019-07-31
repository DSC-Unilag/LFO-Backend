import { ApiError, handleApiError } from "../util/logger/api";

export default({ VisitorModel }) => {
    
    const addVisitor = async (req, res) => {
		try {
            const { fullName, email, phone, date, description } = req.body;

			const visitor = await VisitorModel.create({
                fullName, 
                email, 
                phone, 
                date,
                description
			});
			return res.status(201).json({
				status: "success",
				message: "Visitor visit/details Registered",
				data: visitor
			});
		} catch (err) {
			return handleApiError(res, err);
		}
    };
    
    const getAllVisitors = async (req, res) => {
		try {
			const visitors= await VisitorModel.findAll();
			return res.status(200).json({
                status: "success",
                message: 'Visitors Retrived',
				data: visitors
			});
		} catch (err) {
			return handleApiError(res, err);
		}
    };
    
    const getSingleVisitor = async(req, res) => {
        try {
            const { id } = req.params;
			const visitor = await VisitorModel.findOne({ where: { id } });
			if (!visitor) {
				throw new ApiError("Visior does not exist", 'notfound');
			}
			return res.status(200).json({
				status: "success",
				message: "Single details of visitor Found!",
				data: visitor
			});
		} catch (err) {
			return handleApiError(res, err);
		}
    };

    return {
        addVisitor,
        getAllVisitors,
        getSingleVisitor
    };
};