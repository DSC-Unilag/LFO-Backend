"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _api = require("../util/logger/api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = function _default(_ref) {
  var WardModel = _ref.WardModel,
      MedicalModel = _ref.MedicalModel,
      cloudinary = _ref.cloudinary;

  var getAllWards =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var wards;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return WardModel.findAll();

            case 3:
              wards = _context.sent;

              if (wards) {
                _context.next = 6;
                break;
              }

              throw new _api.ApiError('Failed to get Wards', 'server');

            case 6:
              return _context.abrupt("return", res.status(200).json({
                status: 'success',
                message: 'Wards Retrieved',
                data: wards
              }));

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", (0, _api.handleApiError)(res, _context.t0));

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 9]]);
    }));

    return function getAllWards(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var getSingleWard =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var id, ward;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              id = req.params.id;
              _context2.next = 4;
              return WardModel.findOne({
                where: {
                  id: id
                }
              });

            case 4:
              ward = _context2.sent;

              if (ward) {
                _context2.next = 7;
                break;
              }

              throw new _api.ApiError("Ward with Id ".concat(id, " not found"), 'notfound');

            case 7:
              return _context2.abrupt("return", res.status(200).json({
                status: 'success',
                message: 'Ward Retrieved',
                data: ward
              }));

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", (0, _api.handleApiError)(res, _context2.t0));

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 10]]);
    }));

    return function getSingleWard(_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }();

  var updateAdoptionStatus =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var id, ward;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              id = req.params.id;
              _context3.next = 4;
              return WardModel.findOne({
                where: {
                  id: id
                }
              });

            case 4:
              ward = _context3.sent;

              if (ward) {
                _context3.next = 7;
                break;
              }

              throw new _api.ApiError("Ward with Id ".concat(id, " does not exist"), 'notfound');

            case 7:
              _context3.next = 9;
              return ward.update({
                adopted: true
              }, {
                where: {
                  id: id
                }
              });

            case 9:
              return _context3.abrupt("return", res.status(200).json({
                status: 'success',
                message: 'Adoption Status Updated'
              }));

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", (0, _api.handleApiError)(res, _context3.t0));

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 12]]);
    }));

    return function updateAdoptionStatus(_x5, _x6) {
      return _ref4.apply(this, arguments);
    };
  }();

  var deleteWard =
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var id, ward;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              id = req.params.id;
              _context4.next = 4;
              return WardModel.findOne({
                where: {
                  id: id
                }
              });

            case 4:
              ward = _context4.sent;

              if (ward) {
                _context4.next = 7;
                break;
              }

              throw new _api.ApiError("Ward with Id ".concat(id, " does not exist"), 'notfound');

            case 7:
              _context4.next = 9;
              return WardModel.destroy({
                where: {
                  id: id
                }
              });

            case 9:
              return _context4.abrupt("return", res.status(200).json({
                status: 'success',
                message: 'Ward Deleted'
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

    return function deleteWard(_x7, _x8) {
      return _ref5.apply(this, arguments);
    };
  }();

  var getAdoptedWards =
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res) {
      var wards;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return WardModel.findAll({
                where: {
                  adopted: true
                }
              });

            case 3:
              wards = _context5.sent;
              return _context5.abrupt("return", res.status(200).json({
                status: 'success',
                message: 'Adopted Wards Retrived',
                data: wards
              }));

            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", (0, _api.handleApiError)(res, _context5.t0));

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 7]]);
    }));

    return function getAdoptedWards(_x9, _x10) {
      return _ref6.apply(this, arguments);
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

  var addWard =
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(req, res) {
      var _req$body, name, age, school, origin, date_admitted, height, weight, blood_group, genotype, adopted, image, imagePath, result, ward, medical;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _req$body = req.body, name = _req$body.name, age = _req$body.age, school = _req$body.school, origin = _req$body.origin, date_admitted = _req$body.date_admitted, height = _req$body.height, weight = _req$body.weight, blood_group = _req$body.blood_group, genotype = _req$body.genotype, adopted = _req$body.adopted;
              image = req.files.image;
              imagePath = _path["default"].resolve("./src/temp_images/".concat(image.name));
              _context6.next = 6;
              return image.mv(imagePath);

            case 6:
              _context6.next = 8;
              return uploadImage(imagePath);

            case 8:
              result = _context6.sent;

              _fs["default"].unlink(imagePath, function (error) {
                if (error) throw new Error(error.message);
              });

              _context6.next = 12;
              return WardModel.create({
                name: name,
                age: age,
                school: school,
                adopted: eval(adopted),
                imageUrl: result.secure_url,
                origin: origin,
                date_admitted: new Date(date_admitted).toDateString()
              });

            case 12:
              ward = _context6.sent;
              _context6.next = 15;
              return MedicalModel.create({
                height: height,
                weight: weight,
                blood_group: blood_group,
                genotype: genotype,
                wardId: ward.id
              });

            case 15:
              medical = _context6.sent;
              return _context6.abrupt("return", res.status(201).json({
                status: 'success',
                message: 'Ward Created',
                data: _objectSpread({}, ward.dataValues, {}, medical.dataValues)
              }));

            case 19:
              _context6.prev = 19;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", (0, _api.handleApiError)(res, _context6.t0));

            case 22:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 19]]);
    }));

    return function addWard(_x11, _x12) {
      return _ref7.apply(this, arguments);
    };
  }();

  return {
    getAllWards: getAllWards,
    getSingleWard: getSingleWard,
    updateAdoptionStatus: updateAdoptionStatus,
    deleteWard: deleteWard,
    getAdoptedWards: getAdoptedWards,
    addWard: addWard
  };
};

exports["default"] = _default;