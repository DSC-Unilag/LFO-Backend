"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _api = require("../util/logger/api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = function _default(_ref) {
  var TimelineModel = _ref.TimelineModel,
      WardModel = _ref.WardModel,
      cloudinary = _ref.cloudinary;

  var getAllTimelineForWard =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var wardId, wardTimeline;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              wardId = req.params.wardId;
              _context.next = 4;
              return TimelineModel.findAll({
                where: {
                  wardId: wardId
                }
              });

            case 4:
              wardTimeline = _context.sent;

              if (!(wardTimeline.length === 0)) {
                _context.next = 7;
                break;
              }

              throw new _api.ApiError('no timeline for ward', 'server');

            case 7:
              return _context.abrupt("return", res.status(200).json({
                status: 'success',
                message: 'successfully retreived timeline for ward',
                data: wardTimeline
              }));

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", (0, _api.handleApiError)(res, _context.t0));

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 10]]);
    }));

    return function getAllTimelineForWard(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var uploadImage = function uploadImage(imagePath) {
    return new Promise(function (resolve, reject) {
      cloudinary.uploader.upload(imagePath, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };

  var addNewTimelineForWard =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var wardId, ward, description, image, imagePath, result, newTimeline;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              wardId = req.params.wardId;
              _context2.next = 4;
              return WardModel.findOne({
                where: {
                  id: wardId
                }
              });

            case 4:
              ward = _context2.sent;

              if (ward) {
                _context2.next = 7;
                break;
              }

              throw new _api.ApiError("ward with id ".concat(wardId, " does not exist"), 'notfound');

            case 7:
              description = req.body.description;
              image = req.files.image;

              if (description) {
                _context2.next = 11;
                break;
              }

              throw new Error('Input the right paramters');

            case 11:
              imagePath = _path["default"].resolve("./src/temp_images/".concat(image.name));
              _context2.next = 14;
              return image.mv(imagePath);

            case 14:
              _context2.next = 16;
              return uploadImage(imagePath);

            case 16:
              result = _context2.sent;

              _fs["default"].unlink(imagePath, function (error) {
                if (error) throw new Error(error.message);
              });

              _context2.next = 20;
              return TimelineModel.create({
                imageUrl: result.secure_url,
                description: description,
                wardId: wardId
              });

            case 20:
              newTimeline = _context2.sent;
              return _context2.abrupt("return", res.status(201).json({
                status: 'success',
                message: 'successfully created new timeline',
                data: newTimeline
              }));

            case 24:
              _context2.prev = 24;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", (0, _api.handleApiError)(res, _context2.t0));

            case 27:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 24]]);
    }));

    return function addNewTimelineForWard(_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }();

  var updateTimelineEntryForWard =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var description, _req$params, id, wardId, timeline, imageUrl, image, imagePath, result, safeTimeline;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              description = req.body.description;
              _req$params = req.params, id = _req$params.id, wardId = _req$params.wardId;
              _context3.next = 5;
              return TimelineModel.findAll({
                where: {
                  id: id,
                  wardId: wardId
                }
              });

            case 5:
              timeline = _context3.sent;

              if (timeline) {
                _context3.next = 8;
                break;
              }

              throw new _api.ApiError('user has no timeline or user does not exist', 'notfound');

            case 8:
              imageUrl = timeline[0].dataValues.imageUrl;

              if (!(req.files !== null)) {
                _context3.next = 19;
                break;
              }

              image = req.files.image;
              imagePath = _path["default"].resolve("./src/temp_images/".concat(image.name));
              _context3.next = 14;
              return image.mv(imagePath);

            case 14:
              _context3.next = 16;
              return uploadImage(imagePath);

            case 16:
              result = _context3.sent;

              _fs["default"].unlink(imagePath, function (error) {
                if (error) throw new Error(error.message);
              });

              imageUrl = result.secure_url;

            case 19:
              safeTimeline = {
                imageUrl: imageUrl,
                description: !description ? timeline.dataValues.description : req.body.description
              };
              _context3.next = 22;
              return TimelineModel.update({
                imageUrl: safeTimeline.imageUrl,
                description: safeTimeline.description
              }, {
                where: {
                  id: id
                }
              });

            case 22:
              return _context3.abrupt("return", res.status(201).json({
                status: 'success',
                message: 'successfully updated timeline'
              }));

            case 25:
              _context3.prev = 25;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", (0, _api.handleApiError)(res, _context3.t0));

            case 28:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 25]]);
    }));

    return function updateTimelineEntryForWard(_x5, _x6) {
      return _ref4.apply(this, arguments);
    };
  }();

  var deleteSingleTimelineEntryForWard =
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var _req$params2, id, wardId, timeline;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _req$params2 = req.params, id = _req$params2.id, wardId = _req$params2.wardId;
              _context4.next = 4;
              return TimelineModel.findOne({
                where: {
                  id: id,
                  wardId: wardId
                }
              });

            case 4:
              timeline = _context4.sent;

              if (timeline) {
                _context4.next = 7;
                break;
              }

              throw new _api.ApiError("not timeline with id ".concat(id), 'notfound');

            case 7:
              _context4.next = 9;
              return TimelineModel.destroy({
                where: {
                  id: id
                }
              });

            case 9:
              return _context4.abrupt("return", res.status(200).json({
                status: 'success',
                message: 'Resource deleted successfully'
              }));

            case 12:
              _context4.prev = 12;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", (0, _api.handleApiError)(res, _context4.t0));

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 12]]);
    }));

    return function deleteSingleTimelineEntryForWard(_x7, _x8) {
      return _ref5.apply(this, arguments);
    };
  }();

  return {
    getAllTimelineForWard: getAllTimelineForWard,
    addNewTimelineForWard: addNewTimelineForWard,
    updateTimelineEntryForWard: updateTimelineEntryForWard,
    deleteSingleTimelineEntryForWard: deleteSingleTimelineEntryForWard
  };
};

exports["default"] = _default;