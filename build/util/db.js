"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(_ref) {
  var Sequelize = _ref.Sequelize;
  var sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false
  });
  return sequelize;
};

exports["default"] = _default;