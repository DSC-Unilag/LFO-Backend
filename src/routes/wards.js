import WardController from '../controllers/wards';
import WardMiddleware from '../middlewares/ward';
import AuthMiddleware from '../controllers/auth';

export default ({
    express,
    WardModel,
    MedicalModel,
    cloudinary,
    trimRequest,
    joi,
    jwt,
}) => {
    const wardController = WardController({
        WardModel,
        MedicalModel,
        cloudinary,
    });
    const authMiddleware = AuthMiddleware({jwt});
    const wardMiddleware = WardMiddleware({joi});
    const router = express.Router();

    router.get('/', authMiddleware.verifyToken, wardController.getAllWards);

    router.get(
        '/adopted',
        authMiddleware.verifyToken,
        wardController.getAdoptedWards
    );

    router.get(
        '/:id',
        authMiddleware.verifyToken,
        wardController.getSingleWard
    );

    router.post(
        '/',
        wardMiddleware.validateAddNewWard,
        trimRequest.body,
        authMiddleware.verifyToken,
        wardController.addWard
    );

    router.put(
        '/:id/adopt',
        trimRequest.body,
        authMiddleware.verifyToken,
        wardController.updateAdoptionStatus
    );

    router.delete(
        '/:id',
        authMiddleware.verifyToken,
        wardController.deleteWard
    );

    return router;
};
