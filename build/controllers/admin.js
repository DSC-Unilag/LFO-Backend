"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = require("../util/logger/api");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = function _default(_ref) {
  var AdminModel = _ref.AdminModel,
      bcrypt = _ref.bcrypt,
      authController = _ref.authController;

  var adminSignup =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var _req$body, name, email, phone, password, hash, admin, validAdmin, token;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, name = _req$body.name, email = _req$body.email, phone = _req$body.phone, password = _req$body.password;
              _context.next = 4;
              return bcrypt.hash(password, 10);

            case 4:
              hash = _context.sent;
              _context.next = 7;
              return AdminModel.create({
                name: name,
                email: email,
                phone: phone,
                password: hash
              });

            case 7:
              admin = _context.sent;

              if (admin) {
                _context.next = 10;
                break;
              }

              throw new _api.ApiError('Failed to create Admin', 'server');

            case 10:
              validAdmin = {
                id: admin.id,
                name: admin.name,
                email: admin.email,
                phone: admin.phone
              };
              token = authController.signAdminToken(validAdmin);
              return _context.abrupt("return", res.status(201).json({
                status: 'success',
                message: 'Admin Registered',
                token: "Bearer ".concat(token),
                admin: validAdmin
              }));

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", (0, _api.handleApiError)(res, _context.t0));

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 15]]);
    }));

    return function adminSignup(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var adminLogin =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var _req$body2, email, password, admin, result, validAdmin, token;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
              _context2.next = 4;
              return AdminModel.findOne({
                where: {
                  email: email
                }
              });

            case 4:
              admin = _context2.sent;

              if (admin) {
                _context2.next = 7;
                break;
              }

              throw new _api.ApiError('Admin with that email does not exist', 'validation');

            case 7:
              _context2.next = 9;
              return bcrypt.compare(password, admin.password);

            case 9:
              result = _context2.sent;

              if (result) {
                _context2.next = 12;
                break;
              }

              throw new _api.ApiError("Password doesn't match our records", 'validation');

            case 12:
              validAdmin = {
                id: admin.id,
                name: admin.name,
                email: admin.email,
                phone: admin.phone
              };
              token = authController.signAdminToken(validAdmin);
              return _context2.abrupt("return", res.status(200).json({
                status: 'success',
                message: 'Admin Logged In',
                token: "Bearer ".concat(token),
                admin: validAdmin
              }));

            case 17:
              _context2.prev = 17;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", (0, _api.handleApiError)(res, _context2.t0));

            case 20:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 17]]);
    }));

    return function adminLogin(_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }();

  return {
    adminSignup: adminSignup,
    adminLogin: adminLogin
  };
};

exports["default"] = _default;