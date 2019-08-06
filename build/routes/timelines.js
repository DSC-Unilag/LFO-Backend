"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _timelines = _interopRequireDefault(require("../controllers/timelines"));

var _timeline = _interopRequireDefault(require("../middlewares/timeline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(_ref) {
  var express = _ref.express,
      WardModel = _ref.WardModel,
      cloudinary = _ref.cloudinary,
      TimelineModel = _ref.TimelineModel,
      joi = _ref.joi,
      authController = _ref.authController,
      trimRequest = _ref.trimRequest;
  var timelineController = (0, _timelines["default"])({
    WardModel: WardModel,
    TimelineModel: TimelineModel,
    cloudinary: cloudinary
  });
  var timelineMiddleware = (0, _timeline["default"])({
    joi: joi
  });
  var router = express.Router();
  router.get('/:wardId', authController.verifyToken, timelineController.getAllTimelineForWard);
  router.post('/:wardId', trimRequest.body, authController.verifyToken, timelineMiddleware.validateAddNewTimeline, timelineController.addNewTimelineForWard);
  router.put('/:wardId/:id', trimRequest.body, authController.verifyToken, timelineMiddleware.validateUpdateTimeline, timelineController.updateTimelineEntryForWard);
  router["delete"]('/:wardId/:id', authController.verifyToken, timelineController.deleteSingleTimelineEntryForWard);
  return router;
};

exports["default"] = _default;