"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prettyStringify = exports.debugLogger = void 0;

var _debug = _interopRequireDefault(require("debug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var debugLogger = function debugLogger(log) {
  var env = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "lfo/".concat(process.env.NODE_ENV);
  return (0, _debug["default"])(env)(log);
};

exports.debugLogger = debugLogger;

var prettyStringify = function prettyStringify(data) {
  return JSON.stringify(data, null, '\t');
};

exports.prettyStringify = prettyStringify;