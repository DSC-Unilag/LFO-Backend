import {handleApiError} from '../util/logger/api';

export default ({DonationsModel}) => {
    const getDonations = async (req, res) => {
        try {
            const getDonations = await DonationsModel.findAll();
            return res.status(200).json({
                status: 'success',
                message: 'Found the Data in the Model',
                data: getDonations,
            });
        } catch (error) {
            return handleApiError(res, error);
        }
    };

    const addDonationRecord = async (req, res) => {
        try {
            const {name, amount, description, phone} = req.body;
            const donationRecord = await DonationsModel.create({
                name,
                amount,
                description,
                phone,
            });
            return res.status(201).json({
                status: 'success',
                message: 'retrieved the donations records.',
                data: donationRecord,
            });
        } catch (error) {
            return handleApiError(res, error);
        }
    };
    return {
        getDonations,
        addDonationRecord,
    };
};
