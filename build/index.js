"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _helmet = _interopRequireDefault(require("helmet"));

var _compression = _interopRequireDefault(require("compression"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _cloudinary = require("cloudinary");

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _expressListEndpoints = _interopRequireDefault(require("express-list-endpoints"));

var _trimRequest = _interopRequireDefault(require("trim-request"));

var _db = _interopRequireDefault(require("./util/db"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _index = require("./util/logger/index");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _admins = _interopRequireDefault(require("./models/admins"));

var _wards = _interopRequireDefault(require("./models/wards"));

var _medicals = _interopRequireDefault(require("./models/medicals"));

var _visitors = _interopRequireDefault(require("./models/visitors"));

var _resources = _interopRequireDefault(require("./models/resources"));

var _timeline = _interopRequireDefault(require("./models/timeline"));

var _donations = _interopRequireDefault(require("./models/donations"));

var _auth = _interopRequireDefault(require("./routes/auth"));

var _wards2 = _interopRequireDefault(require("./routes/wards"));

var _donations2 = _interopRequireDefault(require("./routes/donations"));

var _visitors2 = _interopRequireDefault(require("./routes/visitors"));

var _resources2 = _interopRequireDefault(require("./routes/resources"));

var _timelines = _interopRequireDefault(require("./routes/timelines"));

var _visits = _interopRequireDefault(require("./routes/visits"));

var _auth2 = _interopRequireDefault(require("./controllers/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Models
//Routes
//Controllers
_dotenv["default"].config();

var URL_PREFIX = '/api/v1';
var PORT = process.env.PORT || 7000;
var db = (0, _db["default"])({
  Sequelize: _sequelize["default"]
}); // Connect to Database

db.sync().then(function () {
  console.log('DB Connection has been established');
  app.listen(PORT);
  console.log('App Running on PORT', PORT);
})["catch"](function (err) {
  console.error('Failed To connect to Database', err);
}); // Models Initialization

var adminModel = (0, _admins["default"])({
  Sequelize: _sequelize["default"],
  db: db
});
var wardModel = (0, _wards["default"])({
  Sequelize: _sequelize["default"],
  db: db
});
var medicalModel = (0, _medicals["default"])({
  Sequelize: _sequelize["default"],
  db: db,
  Ward: wardModel
});
var visitorModel = (0, _visitors["default"])({
  Sequelize: _sequelize["default"],
  db: db
});
var visitsModel = (0, _visitors["default"])({
  Sequelize: _sequelize["default"],
  db: db
});
var donationsModel = (0, _donations["default"])({
  Sequelize: _sequelize["default"],
  db: db
});
var resourcesModel = (0, _resources["default"])({
  Sequelize: _sequelize["default"],
  db: db
});
var timelineModel = (0, _timeline["default"])({
  Sequelize: _sequelize["default"],
  db: db,
  Ward: wardModel
}); //Controller Init

var authController = (0, _auth2["default"])({
  jwt: _jsonwebtoken["default"]
}); // Cloudinary Config

var CLOUDINARY_URL = process.env.CLOUDINARY_URL;
var cloud_name = CLOUDINARY_URL.split('@')[1];
var api_key = CLOUDINARY_URL.slice(13, CLOUDINARY_URL.length).split(':')[0];
var api_secret = CLOUDINARY_URL.slice(13, CLOUDINARY_URL.length).split(':')[1].split('@')[0];

_cloudinary.v2.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret
});

var app = (0, _express["default"])();
app.use((0, _compression["default"])());
app.use((0, _helmet["default"])());
app.use(_bodyParser["default"].json());
app.use((0, _expressFileupload["default"])()); // Enable CORS

app.use(function (req, res, next) {
  (0, _index.debugLogger)("Request body: ".concat((0, _index.prettyStringify)(req.body)));
  (0, _index.debugLogger)("Request params: ".concat((0, _index.prettyStringify)(req.params)));
  (0, _index.debugLogger)("Request headers: ".concat((0, _index.prettyStringify)(req.headers)));
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, Authorization');
  res.header('Access-Control-Request-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, Authorization');
  next();
}); // Auth

app.use("".concat(URL_PREFIX, "/auth"), (0, _auth["default"])({
  express: _express["default"],
  AdminModel: adminModel,
  authController: authController,
  bcrypt: _bcrypt["default"],
  trimRequest: _trimRequest["default"],
  joi: _joi["default"]
})); // Wards Route

app.use("".concat(URL_PREFIX, "/wards"), (0, _wards2["default"])({
  express: _express["default"],
  WardModel: wardModel,
  MedicalModel: medicalModel,
  cloudinary: _cloudinary.v2,
  joi: _joi["default"],
  authController: authController,
  trimRequest: _trimRequest["default"]
})); // Visitors

app.use("".concat(URL_PREFIX, "/visitors"), (0, _visitors2["default"])({
  express: _express["default"],
  VisitorModel: visitorModel,
  trimRequest: _trimRequest["default"],
  joi: _joi["default"],
  authController: authController
})); // Donations

app.use("".concat(URL_PREFIX, "/donations"), (0, _donations2["default"])({
  express: _express["default"],
  DonationsModel: donationsModel,
  trimRequest: _trimRequest["default"],
  joi: _joi["default"],
  authController: authController
})); // Visits

app.use("".concat(URL_PREFIX, "/visits"), (0, _visits["default"])({
  express: _express["default"],
  VisitModel: visitsModel,
  trimRequest: _trimRequest["default"],
  joi: _joi["default"],
  authController: authController
})); // Timeline

app.use("".concat(URL_PREFIX, "/timelines"), (0, _timelines["default"])({
  express: _express["default"],
  TimelineModel: timelineModel,
  WardModel: wardModel,
  cloudinary: _cloudinary.v2,
  joi: _joi["default"],
  trimRequest: _trimRequest["default"],
  authController: authController
})); // Resource

app.use("".concat(URL_PREFIX, "/resources"), (0, _resources2["default"])({
  express: _express["default"],
  ResouceModel: resourcesModel,
  joi: _joi["default"],
  trimRequest: _trimRequest["default"],
  authController: authController
}));
app.use("".concat(URL_PREFIX, "/endpoints"), function (req, res) {
  return res.status(200).json((0, _expressListEndpoints["default"])(app));
}); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  res.status(404).json({
    error: ['Path does not exist'],
    status: 404,
    message: "This route doesn't exist for you!"
  });
  next();
});
var _default = app;
exports["default"] = _default;