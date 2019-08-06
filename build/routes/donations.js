"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _donations = _interopRequireDefault(require("../controllers/donations"));

var _donation = _interopRequireDefault(require("../middlewares/donation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(_ref) {
  var express = _ref.express,
      DonationsModel = _ref.DonationsModel,
      joi = _ref.joi,
      authController = _ref.authController,
      trimRequest = _ref.trimRequest;
  var donationsController = (0, _donations["default"])({
    DonationsModel: DonationsModel
  });
  var donationMiddleware = (0, _donation["default"])({
    joi: joi
  });
  var router = express.Router();
  router.get('/', authController.verifyToken, donationsController.getDonations);
  router.post('/', trimRequest.body, authController.verifyToken, donationMiddleware.validateAddNewDonation, donationsController.addDonationRecord);
  return router;
};

exports["default"] = _default;