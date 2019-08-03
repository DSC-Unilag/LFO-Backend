"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = function _default(_ref) {
  var joi = _ref.joi;

  var validateAddNewTimeline =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res, next) {
      var schema, imageMimes;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              schema = {
                description: Joi.string().required()
              };
              _context.next = 4;
              return Joi.validate(req.body, schema);

            case 4:
              if (!(req.files === null)) {
                _context.next = 6;
                break;
              }

              throw new Error('Meal Image Required');

            case 6:
              imageMimes = ['image/jpeg', 'image/jpg', 'image/png'];

              if (imageMimes.includes(req.files.image.mimetype)) {
                _context.next = 9;
                break;
              }

              throw new Error('Only JPG, JPEG & PNG Images are allowed');

            case 9:
              next();
              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                message: String(_context.t0.details[0].message),
                type: 'validation'
              }));

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 12]]);
    }));

    return function validateAddNewTimeline(_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();

  var validateUpdateTimeline =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res, next) {
      var schema, imageMimes;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              schema = {
                description: Joi.string().allow('', null)
              };
              _context2.next = 4;
              return Joi.validate(req.body, schema);

            case 4:
              if (!(req.files !== null)) {
                _context2.next = 8;
                break;
              }

              imageMimes = ['image/jpeg', 'image/jpg', 'image/png'];

              if (imageMimes.includes(req.files.image.mimetype)) {
                _context2.next = 8;
                break;
              }

              throw new Error('Only JPG, JPEG & PNG Images are allowed');

            case 8:
              next();
              _context2.next = 14;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(400).json({
                status: 'error',
                message: String(_context2.t0.details[0].message),
                type: 'validation'
              }));

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 11]]);
    }));

    return function validateUpdateTimeline(_x4, _x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  return {
    validateAddNewTimeline: validateAddNewTimeline,
    validateUpdateTimeline: validateUpdateTimeline
  };
};

exports["default"] = _default;