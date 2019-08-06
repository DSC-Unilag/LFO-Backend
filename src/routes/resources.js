import ResourceController from '../controllers/resources';
import AuthMiddleware from '../controllers/auth';

export default ({express, ResourceModel, jwt}) => {
    const resourceController = ResourceController({ResourceModel});
    const authMiddleware = AuthMiddleware({jwt});
    const router = express.Router();

    router.get(
        '/',
        authMiddleware.verifyToken,
        resourceController.getAllResources
    );
    router.post(
        '/',
        authMiddleware.verifyToken,
        resourceController.addToResources
    );
    router.put(
        '/:id',
        authMiddleware.verifyToken,
        resourceController.updateSingleResource
    );
    router.delete(
        '/:id',
        authMiddleware.verifyToken,
        resourceController.deleteSingleResource
    );

    return router;
};
