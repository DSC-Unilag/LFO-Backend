"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(_ref) {
  var Sequelize = _ref.Sequelize,
      db = _ref.db;
  var Resource = db.define('resource', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    createdAt: Sequelize.DATEONLY,
    updatedAt: Sequelize.DATEONLY
  });
  return Resource;
};

exports["default"] = _default;