"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = function _default(_ref) {
  var Joi = _ref.joi;

  var validateSignUp =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res, next) {
      var schema;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              schema = {
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                phone: Joi.number().min(11).required(),
                password: Joi.string().min(7).required()
              };
              _context.next = 4;
              return Joi.validate(req.body, schema);

            case 4:
              next();
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                message: _context.t0.message,
                type: 'validation'
              }));

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    return function validateSignUp(_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();

  var validateLogin =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res, next) {
      var schema;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              schema = {
                email: Joi.string().email().required(),
                password: Joi.string().min(7).required()
              };
              _context2.next = 4;
              return Joi.validate(req.body, schema);

            case 4:
              next();
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(400).json({
                status: 'error',
                message: _context2.t0.message,
                type: 'validation'
              }));

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 7]]);
    }));

    return function validateLogin(_x4, _x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  return {
    validateSignUp: validateSignUp,
    validateLogin: validateLogin
  };
};

exports["default"] = _default;