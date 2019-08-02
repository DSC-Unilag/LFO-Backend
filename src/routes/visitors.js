import VisitorController from '../controllers/visitors';
import AuthMiddleware from '../controllers/auth';
import VisitorMiddleware from '../middlewares/visitors';

export default ({express, VisitorModel, jwt, joi}) => {
    const visitorController = VisitorController({VisitorModel});
    const authMiddleware = AuthMiddleware({jwt});
    const visitorMiddleware = VisitorMiddleware({joi});
    const router = express.Router();

    router.get(
        '/',
        authMiddleware.verifyToken,
        visitorController.getAllVisitors
    );
    router.post(
        '/',
        visitorMiddleware.validateAddNewVisitor,
        authMiddleware.verifyToken,
        visitorController.addVisitor
    );
    router.get(
        '/:id',
        authMiddleware.verifyToken,
        visitorController.getSingleVisitor
    );

    return router;
};
