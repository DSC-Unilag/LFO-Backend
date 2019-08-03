"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _donations = _interopRequireDefault(require("../controllers/donations"));

var _auth = _interopRequireDefault(require("../controllers/auth"));

var _donation = _interopRequireDefault(require("../middlewares/donation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(_ref) {
  var express = _ref.express,
      DonationsModel = _ref.DonationsModel,
      jwt = _ref.jwt,
      joi = _ref.joi;
  var donationsController = (0, _donations["default"])({
    DonationsModel: DonationsModel
  });
  var authMiddleware = (0, _auth["default"])({
    jwt: jwt
  });
  var donationMiddleware = (0, _donation["default"])({
    joi: joi
  });
  var router = express.Router();
  router.get('/', authMiddleware.verifyToken, donationsController.getDonations);
  router.post('/', donationMiddleware.validateAddNewDonation, authMiddleware.verifyToken, donationsController.addDonationRecord);
  return router;
};

exports["default"] = _default;