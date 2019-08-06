"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(_ref) {
  var Sequelize = _ref.Sequelize,
      db = _ref.db,
      Ward = _ref.Ward;
  var Medical = db.define('medical', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    weight: {
      type: Sequelize.STRING,
      allowNull: false
    },
    height: {
      type: Sequelize.STRING,
      allowNull: false
    },
    blood_group: {
      type: Sequelize.STRING,
      allowNull: false
    },
    genotype: {
      type: Sequelize.STRING,
      allowNull: false
    },
    wardId: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: false
    }
  });
  Medical.belongsTo(Ward, {
    constraints: true,
    onDelete: 'CASCADE'
  });
  return Medical;
};

exports["default"] = _default;