import DonationsController from '../controllers/donations';
import DonationMiddleware from '../middlewares/donation';

export default ({
    express,
    DonationsModel,
    joi,
    authController,
    trimRequest,
}) => {
    const donationsController = DonationsController({DonationsModel});
    const donationMiddleware = DonationMiddleware({joi});
    const router = express.Router();

    router.get(
        '/',
        authController.verifyToken,
        donationsController.getDonations
    );

    router.post(
        '/',
        trimRequest.body,
        authController.verifyToken,
        donationMiddleware.validateAddNewDonation,
        donationsController.addDonationRecord
    );

    return router;
};
