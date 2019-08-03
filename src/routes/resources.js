import ResourceController from '../controllers/resources';

export default ({express, resourceModel}) => {
    const resourceController = ResourceController({resourceModel});
    const router = express.Router();

    router.get('/', resourceController.getAllResources);
    router.post('/', resourceController.addToResources);
    router.put('/:id', resourceController.updateSingleResource);
    router.delete('/:id', resourceController.deleteSingleResource);

    return router;
};
