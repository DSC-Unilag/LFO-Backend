import {ApiError, handleApiError} from '../util/logger/api';

export default ({VisitModel}) => {
    const getVisits = async (req, res) => {
        try {
            const visits = await VisitModel.findAll();
            return res.status(200).json({
                status: 'success',
                message: 'Found the Data!!',
                data: visits,
            });
        } catch (error) {
            return handleApiError(res, error);
        }
    };

    const addVisitsRecord = async (req, res) => {
        try {
            const {fullName, organization, phone, date, description} = req.body;
            const visits = await VisitModel.create({
                fullName,
                organization,
                phone,
                date,
                description,
            });
            return res.status(201).json({
                status: 'success',
                message: 'retrieved the donations records.',
                data: visits,
            });
        } catch (error) {
            return handleApiError(res, error);
        }
    };
    return {
        getVisits,
        addVisitsRecord,
    };
};
