import TimelineController from '../controllers/timelines';
import AuthMiddleware from '../controllers/auth';
import TimelineMiddleware from '../middlewares/timeline';

export default ({express, WardModel, cloudinary, TimelineModel, jwt, joi}) => {
    const timelineController = TimelineController({
        WardModel,
        TimelineModel,
        cloudinary,
    });
    const authMiddleware = AuthMiddleware({jwt});
    const timelineMiddleware = TimelineMiddleware({joi});
    const router = express.Router();

    router.get(
        '/:wardId',
        authMiddleware.verifyToken,
        timelineController.getAllTimelineForWard
    );
    router.post(
        '/:wardId',
        timelineMiddleware.validateAddNewTimeline,
        authMiddleware.verifyToken,
        timelineController.addNewTimelineForWard
    );
    router.put(
        '/:wardId/:id',
        timelineMiddleware.validateUpdateTimeline,
        authMiddleware.verifyToken,
        timelineController.updateTimelineEntryForWard
    );
    router.delete(
        '/:wardId/:id',
        authMiddleware.verifyToken,
        timelineController.deleteSingleTimelineEntryForWard
    );

    return router;
};
