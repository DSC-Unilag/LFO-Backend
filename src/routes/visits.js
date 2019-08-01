import VisitsController from '../controllers/visits';

export default ({express, VisitModel}) => {
    const visitsController = VisitsController({VisitModel});
    const router = express.Router();

    router.get('/', visitsController.getVisits);
    router.post('/', visitsController.addVisitsRecord);

    return router;
};
