"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _wards = _interopRequireDefault(require("../controllers/wards"));

var _ward = _interopRequireDefault(require("../middlewares/ward"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(_ref) {
  var express = _ref.express,
      WardModel = _ref.WardModel,
      MedicalModel = _ref.MedicalModel,
      cloudinary = _ref.cloudinary,
      trimRequest = _ref.trimRequest,
      joi = _ref.joi,
      authController = _ref.authController;
  var wardController = (0, _wards["default"])({
    WardModel: WardModel,
    MedicalModel: MedicalModel,
    cloudinary: cloudinary
  });
  var wardMiddleware = (0, _ward["default"])({
    joi: joi
  });
  var router = express.Router();
  router.get('/', authController.verifyToken, wardController.getAllWards);
  router.get('/adopted', authController.verifyToken, wardController.getAdoptedWards);
  router.get('/:id', authController.verifyToken, wardController.getSingleWard);
  router.post('/', trimRequest.body, authController.verifyToken, wardMiddleware.validateAddNewWard, wardController.addWard);
  router.put('/:id/adopt', trimRequest.body, authController.verifyToken, wardController.updateAdoptionStatus);
  router["delete"]('/:id', authController.verifyToken, wardController.deleteWard);
  return router;
};

exports["default"] = _default;