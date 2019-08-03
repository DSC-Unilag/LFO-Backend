"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _wards = _interopRequireDefault(require("../controllers/wards"));

var _ward = _interopRequireDefault(require("../middlewares/ward"));

var _auth = _interopRequireDefault(require("../controllers/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(_ref) {
  var express = _ref.express,
      WardModel = _ref.WardModel,
      MedicalModel = _ref.MedicalModel,
      cloudinary = _ref.cloudinary,
      trimRequest = _ref.trimRequest,
      joi = _ref.joi,
      jwt = _ref.jwt;
  var wardController = (0, _wards["default"])({
    WardModel: WardModel,
    MedicalModel: MedicalModel,
    cloudinary: cloudinary
  });
  var authMiddleware = (0, _auth["default"])({
    jwt: jwt
  });
  var wardMiddleware = (0, _ward["default"])({
    joi: joi
  });
  var router = express.Router();
  router.get('/', authMiddleware.verifyToken, wardController.getAllWards);
  router.get('/adopted', authMiddleware.verifyToken, wardController.getAdoptedWards);
  router.get('/:id', authMiddleware.verifyToken, wardController.getSingleWard);
  router.post('/', wardMiddleware.validateAddNewWard, trimRequest.body, authMiddleware.verifyToken, wardController.addWard);
  router.put('/:id/adopt', trimRequest.body, authMiddleware.verifyToken, wardController.updateAdoptionStatus);
  router["delete"]('/:id', authMiddleware.verifyToken, wardController.deleteWard);
  return router;
};

exports["default"] = _default;