"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _resources = _interopRequireDefault(require("../controllers/resources"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(_ref) {
  var express = _ref.express,
      resourceModel = _ref.resourceModel;
  var resourceController = (0, _resources["default"])({
    resourceModel: resourceModel
  });
  var router = express.Router();
  router.get('/', resourceController.getAllResources);
  router.post('/', resourceController.addToResources);
  router.put('/:id', resourceController.updateSingleResource);
  router["delete"]('/:id', resourceController.deleteSingleResource);
  return router;
};

exports["default"] = _default;