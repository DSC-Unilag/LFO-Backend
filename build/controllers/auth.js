"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = function _default(_ref) {
  var jwt = _ref.jwt;

  var signAdminToken = function signAdminToken(admin) {
    return jwt.sign({
      admin: admin
    }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });
  };

  var verifyToken =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res, next) {
      var token, decoded;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = req.headers['x-access-token'] || req.headers.authorization; // Express headers are auto converted to lowercase

              if (token) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                message: 'No Auth Token Provided'
              }));

            case 3:
              token = token.slice(7, token.length);
              _context.prev = 4;
              _context.next = 7;
              return jwt.verify(token, process.env.JWT_SECRET);

            case 7:
              decoded = _context.sent;
              req.admin = decoded.admin;
              return _context.abrupt("return", next());

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](4);
              return _context.abrupt("return", res.status(401).json({
                status: 'error',
                message: 'Token is not valid'
              }));

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 12]]);
    }));

    return function verifyToken(_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();

  return {
    signAdminToken: signAdminToken,
    verifyToken: verifyToken
  };
};

exports["default"] = _default;