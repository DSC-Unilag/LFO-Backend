"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _resources = _interopRequireDefault(require("../controllers/resources"));

var _auth = _interopRequireDefault(require("../controllers/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(_ref) {
  var express = _ref.express,
      ResourceModel = _ref.ResourceModel,
      jwt = _ref.jwt;
  var resourceController = (0, _resources["default"])({
    ResourceModel: ResourceModel
  });
  var authMiddleware = (0, _auth["default"])({
    jwt: jwt
  });
  var router = express.Router();
  router.get('/', authMiddleware.verifyToken, resourceController.getAllResources);
  router.post('/', authMiddleware.verifyToken, resourceController.addToResources);
  router.put('/:id', authMiddleware.verifyToken, resourceController.updateSingleResource);
  router["delete"]('/:id', authMiddleware.verifyToken, resourceController.deleteSingleResource);
  return router;
};

exports["default"] = _default;