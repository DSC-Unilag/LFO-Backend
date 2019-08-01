import DonationsController from '../controllers/donations';

export default ({express, DonationsModel}) => {
    const donationsController = DonationsController({DonationsModel});
    const router = express.Router();

    router.get('/', donationsController.getDonations);

    router.post('/', donationsController.addDonationRecord);

    return router;
};
