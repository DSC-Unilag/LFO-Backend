"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _admin = _interopRequireDefault(require("../controllers/admin"));

var _auth = _interopRequireDefault(require("../controllers/auth"));

var _admin2 = _interopRequireDefault(require("../middlewares/admin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(_ref) {
  var express = _ref.express,
      AdminModel = _ref.AdminModel,
      jwt = _ref.jwt,
      bcrypt = _ref.bcrypt,
      trimRequest = _ref.trimRequest,
      joi = _ref.joi;
  var authMiddleware = (0, _auth["default"])({
    jwt: jwt
  });
  var adminMiddleware = (0, _admin2["default"])({
    joi: joi
  });
  var adminController = (0, _admin["default"])({
    AdminModel: AdminModel,
    bcrypt: bcrypt,
    authMiddleware: authMiddleware
  });
  var router = express.Router();
  router.post('/signup', adminMiddleware.validateSignUp, trimRequest.body, authMiddleware.signAdminToken, adminController.adminSignup);
  router.post('/login', adminMiddleware.validateLogin, trimRequest.body, authMiddleware.verifyToken, adminController.adminLogin);
  return router;
};

exports["default"] = _default;