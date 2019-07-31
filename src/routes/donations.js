import DonationsController from '../controllers/donate';

export default({ express }) => {
    const donationsController = DonationsController();
    const router = express.Router();

    router.get("/", donationsController.getDonations);

    router.post("/", donationsController.addDonationRecord);

    return router;
};