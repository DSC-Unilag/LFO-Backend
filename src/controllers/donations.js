import {ApiError, handleApiError} from '../util/logger/api';

export default () => {
    const getDonations = async (req, res) => {
        try {
        } catch (error) {
            return handleApiError(res, error);
        }
    };

    const addDonationRecord = async (req, res) => {
        try {
        } catch (error) {
            return handleApiError(res, error);
        }
    };
    return {
        getDonations,
        addDonationRecord,
    };
};
