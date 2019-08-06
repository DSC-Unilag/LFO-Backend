"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _visitors = _interopRequireDefault(require("../controllers/visitors"));

var _visitors2 = _interopRequireDefault(require("../middlewares/visitors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(_ref) {
  var express = _ref.express,
      VisitorModel = _ref.VisitorModel,
      joi = _ref.joi,
      authController = _ref.authController,
      trimRequest = _ref.trimRequest;
  var visitorController = (0, _visitors["default"])({
    VisitorModel: VisitorModel
  });
  var visitorMiddleware = (0, _visitors2["default"])({
    joi: joi
  });
  var router = express.Router();
  router.get('/', authController.verifyToken, visitorController.getAllVisitors);
  router.post('/', trimRequest.body, authController.verifyToken, visitorMiddleware.validateAddNewVisitor, visitorController.addVisitor);
  router.get('/:id', authController.verifyToken, visitorController.getSingleVisitor);
  return router;
};

exports["default"] = _default;