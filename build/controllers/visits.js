"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = require("../util/logger/api");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = function _default(_ref) {
  var VisitModel = _ref.VisitModel;

  var getVisits =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var visits;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return VisitModel.findAll();

            case 3:
              visits = _context.sent;
              return _context.abrupt("return", res.status(200).json({
                status: 'success',
                message: 'Found the Data!!',
                data: visits
              }));

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", (0, _api.handleApiError)(res, _context.t0));

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    return function getVisits(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var addVisitsRecord =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var _req$body, fullName, organization, phone, date, description, visits;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body = req.body, fullName = _req$body.fullName, organization = _req$body.organization, phone = _req$body.phone, date = _req$body.date, description = _req$body.description;
              _context2.next = 4;
              return VisitModel.create({
                fullName: fullName,
                organization: organization,
                phone: phone,
                date: date,
                description: description
              });

            case 4:
              visits = _context2.sent;
              return _context2.abrupt("return", res.status(201).json({
                status: 'success',
                message: 'retrieved the donations records.',
                data: visits
              }));

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", (0, _api.handleApiError)(res, _context2.t0));

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 8]]);
    }));

    return function addVisitsRecord(_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }();

  return {
    getVisits: getVisits,
    addVisitsRecord: addVisitsRecord
  };
};

exports["default"] = _default;