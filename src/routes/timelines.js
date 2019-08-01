import TimelineController from '../controllers/timelines';

export default ({express, WardModel, cloudinary, TimelineModel}) => {
    const timelineController = TimelineController({
        WardModel,
        TimelineModel,
        cloudinary,
    });
    const router = express.Router();

    router.get('/:wardId', timelineController.getAllTimelineForWard);
    router.post('/:wardId', timelineController.addNewTimelineForWard);
    router.put('/:wardId/:id', timelineController.updateTimelineEntryForWard);
    router.delete(
        '/:wardId/:id',
        timelineController.deleteSingleTimelineEntryForWard
    );

    return router;
};
