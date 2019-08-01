import ResourceController from '../controllers/resources';

export default ({express, resourceModel, goodModel}) => {
    const resourceController = ResourceController({resourceModel, goodModel});
    const router = express.Router();

    router.get('/', resourceController.getAllResources);
    router.post('/', resourceController.addToResources);
    router.put('/:id', resourceController.updateSingleResource);
    router.delete('/:id', resourceController.deleteSingleResource);

    return router;
};
