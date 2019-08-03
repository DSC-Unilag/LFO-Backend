import VisitsController from '../controllers/visits';
import AuthMiddleware from '../controllers/auth';
import VisitMiddlware from '../middlewares/visit';

export default ({express, VisitModel, joi, jwt}) => {
    const visitsController = VisitsController({VisitModel});
    const authMiddleware = AuthMiddleware({jwt});
    const visitMiddlware = VisitMiddlware({joi});

    const router = express.Router();

    router.get('/', authMiddleware.verifyToken, visitsController.getVisits);
    router.post(
        '/',
        visitMiddlware.validateAddNewVisit,
        visitsController.addVisitsRecord
    );

    return router;
};
