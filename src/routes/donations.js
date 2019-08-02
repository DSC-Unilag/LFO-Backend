import DonationsController from '../controllers/donations';
import AuthMiddleware from '../controllers/auth';
import DonationMiddleware from '../middlewares/donation';

export default ({express, DonationsModel, jwt, joi}) => {
    const donationsController = DonationsController({DonationsModel});
    const authMiddleware = AuthMiddleware({jwt});
    const donationMiddleware = DonationMiddleware({joi});
    const router = express.Router();

    router.get(
        '/',
        authMiddleware.verifyToken,
        donationsController.getDonations
    );

    router.post(
        '/',
        donationMiddleware.validateAddNewDonation,
        authMiddleware.verifyToken,
        donationsController.addDonationRecord
    );

    return router;
};
