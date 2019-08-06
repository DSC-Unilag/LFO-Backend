import ResourceController from '../controllers/resources';

export default ({express, ResourceModel, authController, trimRequest}) => {
    const resourceController = ResourceController({ResourceModel});
    const router = express.Router();

    router.get(
        '/',
        authController.verifyToken,
        resourceController.getAllResources
    );
    router.post(
        '/',
        trimRequest.body,
        authController.verifyToken,
        resourceController.addToResources
    );
    router.put(
        '/:id',
        trimRequest.body,
        authController.verifyToken,
        resourceController.updateSingleResource
    );
    router.delete(
        '/:id',
        authController.verifyToken,
        resourceController.deleteSingleResource
    );

    return router;
};
