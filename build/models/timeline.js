"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(_ref) {
  var Sequelize = _ref.Sequelize,
      db = _ref.db,
      Ward = _ref.Ward;
  var Timeline = db.define('timeline', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    wardId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    createdAt: Sequelize.DATEONLY,
    updatedAt: Sequelize.DATEONLY
  });
  Timeline.belongsTo(Ward, {
    constraints: true,
    onDelete: 'CASCADE'
  });
  Ward.hasMany(Timeline, {
    constraints: true,
    onDelete: 'CASCADE'
  });
  return Timeline;
};

exports["default"] = _default;