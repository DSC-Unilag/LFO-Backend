import VisitsController from '../controllers/visits';
import VisitMiddlware from '../middlewares/visit';

export default ({express, VisitModel, joi, authController, trimRequest}) => {
    const visitsController = VisitsController({VisitModel});
    const visitMiddlware = VisitMiddlware({joi});

    const router = express.Router();

    router.get('/', authController.verifyToken, visitsController.getVisits);
    router.post(
        '/',
        trimRequest.body,
        authController.verifyToken,
        visitMiddlware.validateAddNewVisit,
        visitsController.addVisitsRecord
    );

    return router;
};
