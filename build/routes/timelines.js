"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _timelines = _interopRequireDefault(require("../controllers/timelines"));

var _auth = _interopRequireDefault(require("../controllers/auth"));

var _timeline = _interopRequireDefault(require("../middlewares/timeline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(_ref) {
  var express = _ref.express,
      WardModel = _ref.WardModel,
      cloudinary = _ref.cloudinary,
      TimelineModel = _ref.TimelineModel,
      jwt = _ref.jwt,
      joi = _ref.joi;
  var timelineController = (0, _timelines["default"])({
    WardModel: WardModel,
    TimelineModel: TimelineModel,
    cloudinary: cloudinary
  });
  var authMiddleware = (0, _auth["default"])({
    jwt: jwt
  });
  var timelineMiddleware = (0, _timeline["default"])({
    joi: joi
  });
  var router = express.Router();
  router.get('/:wardId', authMiddleware.verifyToken, timelineController.getAllTimelineForWard);
  router.post('/:wardId', timelineMiddleware.validateAddNewTimeline, authMiddleware.verifyToken, timelineController.addNewTimelineForWard);
  router.put('/:wardId/:id', timelineMiddleware.validateUpdateTimeline, authMiddleware.verifyToken, timelineController.updateTimelineEntryForWard);
  router["delete"]('/:wardId/:id', authMiddleware.verifyToken, timelineController.deleteSingleTimelineEntryForWard);
  return router;
};

exports["default"] = _default;