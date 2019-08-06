import WardController from '../controllers/wards';
import WardMiddleware from '../middlewares/ward';

export default ({
    express,
    WardModel,
    MedicalModel,
    cloudinary,
    trimRequest,
    joi,
    authController,
}) => {
    const wardController = WardController({
        WardModel,
        MedicalModel,
        cloudinary,
    });
    const wardMiddleware = WardMiddleware({joi});
    const router = express.Router();

    router.get('/', authController.verifyToken, wardController.getAllWards);

    router.get(
        '/adopted',
        authController.verifyToken,
        wardController.getAdoptedWards
    );

    router.get(
        '/:id',
        authController.verifyToken,
        wardController.getSingleWard
    );

    router.post(
        '/',
        trimRequest.body,
        authController.verifyToken,
        wardMiddleware.validateAddNewWard,
        wardController.addWard
    );

    router.put(
        '/:id/adopt',
        trimRequest.body,
        authController.verifyToken,
        wardController.updateAdoptionStatus
    );

    router.delete(
        '/:id',
        authController.verifyToken,
        wardController.deleteWard
    );

    return router;
};
