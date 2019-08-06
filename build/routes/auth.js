"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _admin = _interopRequireDefault(require("../controllers/admin"));

var _admin2 = _interopRequireDefault(require("../middlewares/admin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(_ref) {
  var express = _ref.express,
      AdminModel = _ref.AdminModel,
      bcrypt = _ref.bcrypt,
      trimRequest = _ref.trimRequest,
      joi = _ref.joi,
      authController = _ref.authController;
  var adminMiddleware = (0, _admin2["default"])({
    joi: joi
  });
  var adminController = (0, _admin["default"])({
    AdminModel: AdminModel,
    bcrypt: bcrypt,
    authController: authController
  });
  var router = express.Router();
  router.post('/signup', trimRequest.body, adminMiddleware.validateSignUp, adminController.adminSignup);
  router.post('/login', trimRequest.body, adminMiddleware.validateLogin, authController.verifyToken, adminController.adminLogin);
  return router;
};

exports["default"] = _default;