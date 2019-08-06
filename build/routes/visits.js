"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _visits = _interopRequireDefault(require("../controllers/visits"));

var _visit = _interopRequireDefault(require("../middlewares/visit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(_ref) {
  var express = _ref.express,
      VisitModel = _ref.VisitModel,
      joi = _ref.joi,
      authController = _ref.authController,
      trimRequest = _ref.trimRequest;
  var visitsController = (0, _visits["default"])({
    VisitModel: VisitModel
  });
  var visitMiddlware = (0, _visit["default"])({
    joi: joi
  });
  var router = express.Router();
  router.get('/', authController.verifyToken, visitsController.getVisits);
  router.post('/', trimRequest.body, authController.verifyToken, visitMiddlware.validateAddNewVisit, visitsController.addVisitsRecord);
  return router;
};

exports["default"] = _default;