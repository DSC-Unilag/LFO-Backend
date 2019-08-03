"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _visits = _interopRequireDefault(require("../controllers/visits"));

var _auth = _interopRequireDefault(require("../controllers/auth"));

var _visit = _interopRequireDefault(require("../middlewares/visit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(_ref) {
  var express = _ref.express,
      VisitModel = _ref.VisitModel,
      joi = _ref.joi,
      jwt = _ref.jwt;
  var visitsController = (0, _visits["default"])({
    VisitModel: VisitModel
  });
  var authMiddleware = (0, _auth["default"])({
    jwt: jwt
  });
  var visitMiddlware = (0, _visit["default"])({
    joi: joi
  });
  var router = express.Router();
  router.get('/', authMiddleware.verifyToken, visitsController.getVisits);
  router.post('/', visitMiddlware.validateAddNewVisit, visitsController.addVisitsRecord);
  return router;
};

exports["default"] = _default;