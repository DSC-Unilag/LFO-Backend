"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = require("../util/logger/api");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = function _default(_ref) {
  var VisitorModel = _ref.VisitorModel;

  var addVisitor =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var _req$body, fullName, email, phone, date, description, visitor;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, fullName = _req$body.fullName, email = _req$body.email, phone = _req$body.phone, date = _req$body.date, description = _req$body.description;
              _context.next = 4;
              return VisitorModel.create({
                fullName: fullName,
                email: email,
                phone: phone,
                date: date,
                description: description
              });

            case 4:
              visitor = _context.sent;
              return _context.abrupt("return", res.status(201).json({
                status: 'success',
                message: 'Visitor visit/details Registered',
                data: visitor
              }));

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", (0, _api.handleApiError)(res, _context.t0));

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));

    return function addVisitor(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var getAllVisitors =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var visitors;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return VisitorModel.findAll();

            case 3:
              visitors = _context2.sent;
              return _context2.abrupt("return", res.status(200).json({
                status: 'success',
                message: 'Visitors Retrived',
                data: visitors
              }));

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", (0, _api.handleApiError)(res, _context2.t0));

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 7]]);
    }));

    return function getAllVisitors(_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }();

  var getSingleVisitor =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var id, visitor;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              id = req.params.id;
              _context3.next = 4;
              return VisitorModel.findOne({
                where: {
                  id: id
                }
              });

            case 4:
              visitor = _context3.sent;

              if (visitor) {
                _context3.next = 7;
                break;
              }

              throw new _api.ApiError('Visior does not exist', 'notfound');

            case 7:
              return _context3.abrupt("return", res.status(200).json({
                status: 'success',
                message: 'Single details of visitor Found!',
                data: visitor
              }));

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", (0, _api.handleApiError)(res, _context3.t0));

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 10]]);
    }));

    return function getSingleVisitor(_x5, _x6) {
      return _ref4.apply(this, arguments);
    };
  }();

  return {
    addVisitor: addVisitor,
    getAllVisitors: getAllVisitors,
    getSingleVisitor: getSingleVisitor
  };
};

exports["default"] = _default;