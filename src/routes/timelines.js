import TimelineController from '../controllers/timelines';
import TimelineMiddleware from '../middlewares/timeline';

export default ({
    express,
    WardModel,
    cloudinary,
    TimelineModel,
    joi,
    authController,
    trimRequest,
}) => {
    const timelineController = TimelineController({
        WardModel,
        TimelineModel,
        cloudinary,
    });
    const timelineMiddleware = TimelineMiddleware({joi});
    const router = express.Router();

    router.get(
        '/:wardId',
        authController.verifyToken,
        timelineController.getAllTimelineForWard
    );
    router.post(
        '/:wardId',
        trimRequest.body,
        authController.verifyToken,
        timelineMiddleware.validateAddNewTimeline,
        timelineController.addNewTimelineForWard
    );
    router.put(
        '/:wardId/:id',
        trimRequest.body,
        authController.verifyToken,
        timelineMiddleware.validateUpdateTimeline,
        timelineController.updateTimelineEntryForWard
    );
    router.delete(
        '/:wardId/:id',
        authController.verifyToken,
        timelineController.deleteSingleTimelineEntryForWard
    );

    return router;
};
