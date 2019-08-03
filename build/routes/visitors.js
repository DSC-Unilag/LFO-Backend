"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _visitors = _interopRequireDefault(require("../controllers/visitors"));

var _auth = _interopRequireDefault(require("../controllers/auth"));

var _visitors2 = _interopRequireDefault(require("../middlewares/visitors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(_ref) {
  var express = _ref.express,
      VisitorModel = _ref.VisitorModel,
      jwt = _ref.jwt,
      joi = _ref.joi;
  var visitorController = (0, _visitors["default"])({
    VisitorModel: VisitorModel
  });
  var authMiddleware = (0, _auth["default"])({
    jwt: jwt
  });
  var visitorMiddleware = (0, _visitors2["default"])({
    joi: joi
  });
  var router = express.Router();
  router.get('/', authMiddleware.verifyToken, visitorController.getAllVisitors);
  router.post('/', visitorMiddleware.validateAddNewVisitor, authMiddleware.verifyToken, visitorController.addVisitor);
  router.get('/:id', authMiddleware.verifyToken, visitorController.getSingleVisitor);
  return router;
};

exports["default"] = _default;