"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _resources = _interopRequireDefault(require("../controllers/resources"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(_ref) {
  var express = _ref.express,
      ResourceModel = _ref.ResourceModel,
      authController = _ref.authController,
      trimRequest = _ref.trimRequest;
  var resourceController = (0, _resources["default"])({
    ResourceModel: ResourceModel
  });
  var router = express.Router();
  router.get('/', authController.verifyToken, resourceController.getAllResources);
  router.post('/', trimRequest.body, authController.verifyToken, resourceController.addToResources);
  router.put('/:id', trimRequest.body, authController.verifyToken, resourceController.updateSingleResource);
  router["delete"]('/:id', authController.verifyToken, resourceController.deleteSingleResource);
  return router;
};

exports["default"] = _default;