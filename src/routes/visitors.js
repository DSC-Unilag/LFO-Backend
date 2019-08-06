import VisitorController from '../controllers/visitors';
import VisitorMiddleware from '../middlewares/visitors';

export default ({express, VisitorModel, joi, authController, trimRequest}) => {
    const visitorController = VisitorController({VisitorModel});
    const visitorMiddleware = VisitorMiddleware({joi});
    const router = express.Router();

    router.get(
        '/',
        authController.verifyToken,
        visitorController.getAllVisitors
    );
    router.post(
        '/',
        trimRequest.body,
        authController.verifyToken,
        visitorMiddleware.validateAddNewVisitor,
        visitorController.addVisitor
    );
    router.get(
        '/:id',
        authController.verifyToken,
        visitorController.getSingleVisitor
    );

    return router;
};
