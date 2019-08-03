"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = function _default(_ref) {
  var joi = _ref.joi;

  var validateAddNewWard =
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
                name: Joi.string().required(),
                age: Joi.string().required(),
                school: Joi.string().required(),
                origin: Joi.string().required(),
                date_admitted: Joi.string().required(),
                height: Joi.string().required(),
                weight: Joi.string().required(),
                blood_group: Joi.string().required(),
                genotype: Joi.string().required(),
                adopted: Joi["boolean"]()
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

    return function validateAddNewWard(_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();

  return {
    validateAddNewWard: validateAddNewWard
  };
};

exports["default"] = _default;