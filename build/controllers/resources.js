"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = require("../util/logger/api");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = function _default(_ref) {
  var resourceModel = _ref.resourceModel;

  var getAllResources =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var resources;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return resourceModel.findAll();

            case 3:
              resources = _context.sent;

              if (!(resources.length === 0)) {
                _context.next = 6;
                break;
              }

              throw new _api.ApiError('No resources found', 'server');

            case 6:
              res.status(200).json({
                status: 'success',
                message: 'resouces retrieved',
                data: resources
              });
              _context.next = 12;
              break;

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

    return function getAllResources(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var addToResources =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var _req$body, type, description, quantity, resource;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body = req.body, type = _req$body.type, description = _req$body.description, quantity = _req$body.quantity;

              if (!(!type || !description || !quantity)) {
                _context2.next = 4;
                break;
              }

              throw new _api.ApiError('input the right paramters', 'server');

            case 4:
              _context2.next = 6;
              return resourceModel.create({
                type: type,
                description: description,
                quantity: quantity
              });

            case 6:
              resource = _context2.sent;
              res.status(201).json({
                status: 'success',
                message: 'created new resource successfully',
                data: resource
              });
              _context2.next = 13;
              break;

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

    return function addToResources(_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }();

  var updateSingleResource =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var _req$body2, type, description, quantity, id, resource, safeResource;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _req$body2 = req.body, type = _req$body2.type, description = _req$body2.description, quantity = _req$body2.quantity;
              id = req.params.id;
              _context3.next = 5;
              return resourceModel.findOne({
                where: {
                  id: id
                }
              });

            case 5:
              resource = _context3.sent;

              if (resource) {
                _context3.next = 8;
                break;
              }

              throw new _api.ApiError("not resource with id ".concat(id), 'notfound');

            case 8:
              safeResource = {
                type: !type ? resource.dataValues.type : req.body.type,
                description: !description ? resource.dataValues.description : req.body.description,
                quantity: !quantity ? resource.dataValues.quantity : Number(req.body.quantity)
              };
              _context3.next = 11;
              return resourceModel.update({
                type: safeResource.type,
                quantity: safeResource.quantity,
                description: safeResource.description
              }, {
                where: {
                  id: id
                }
              });

            case 11:
              return _context3.abrupt("return", res.status(201).json({
                status: 'success',
                message: 'successfully update resource'
              }));

            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", (0, _api.handleApiError)(res, _context3.t0));

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 14]]);
    }));

    return function updateSingleResource(_x5, _x6) {
      return _ref4.apply(this, arguments);
    };
  }();

  var deleteSingleResource =
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var id, resource;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              id = req.params.id;
              _context4.next = 4;
              return resourceModel.findOne({
                where: {
                  id: id
                }
              });

            case 4:
              resource = _context4.sent;

              if (resource) {
                _context4.next = 7;
                break;
              }

              throw new _api.ApiError("not resource with id ".concat(id), 'notfound');

            case 7:
              _context4.next = 9;
              return resourceModel.destroy({
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

    return function deleteSingleResource(_x7, _x8) {
      return _ref5.apply(this, arguments);
    };
  }();

  return {
    getAllResources: getAllResources,
    addToResources: addToResources,
    updateSingleResource: updateSingleResource,
    deleteSingleResource: deleteSingleResource
  };
};

exports["default"] = _default;