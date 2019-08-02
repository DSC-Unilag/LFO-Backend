import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary';
import fileUpload from 'express-fileupload';
import listEndpoints from 'express-list-endpoints';
import trimRequest from 'trim-request';
import initializeDbConnection from './util/db';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {debugLogger, prettyStringify} from './util/logger/index';
import joi from '@hapi/joi';

//Models
import admins from './models/admins';
import wards from './models/wards';
import medicals from './models/medicals';
import visitors from './models/visitors';
import resources from './models/resources';
import timeline from './models/timeline';
import donations from './models/donations';
import visits from './models/visits.js';

//Routes
import authRouter from './routes/auth';
import wardRouter from './routes/wards';
import donationRouter from './routes/donations';
import visitorRouter from './routes/visitors';
import resourceRouter from './routes/resources';
import timelineRouter from './routes/timelines';
import visitsRouter from './routes/visits';

//Middleware
import authMiddleware from './middlewares/admin';
import wardMiddleware from './middlewares/ward';
import timelineMiddleware from './middlewares/timeline';
import resouceMiddleware from './middlewares/resources';
import donationMiddleware from './middlewares/donation';
import visitorMiddleware from './middlewares/visitors';
import visitMiddleware from './middlewares/visit';

dotenv.config();

const URL_PREFIX = '/api/v1';
const PORT = 7000;

const db = initializeDbConnection({Sequelize});

// Connect to Database
db.sync()
    .then(() => {
        console.log('DB Connection has been established');
        app.listen(PORT);
        console.log('App Running on PORT', PORT);
    })
    .catch(err => {
        console.error('Failed To connect to Database', err);
    });

// Models Initialization
const adminModel = admins({
    Sequelize,
    db,
});

const wardModel = wards({
    Sequelize,
    db,
});

const medicalModel = medicals({
    Sequelize,
    db,
    Ward: wardModel,
});

const visitorModel = visitors({
    Sequelize,
    db,
});

const visitsModel = visitors({
    Sequelize,
    db,
});

const donationsModel = donations({
    Sequelize,
    db,
});

const timelineModel = timeline({
    Sequelize,
    db,
    Ward: wardModel,
});

// Cloudinary Config
const {CLOUDINARY_URL} = process.env;
const cloud_name = CLOUDINARY_URL.split('@')[1];
const api_key = CLOUDINARY_URL.slice(13, CLOUDINARY_URL.length).split(':')[0];
const api_secret = CLOUDINARY_URL.slice(13, CLOUDINARY_URL.length)
    .split(':')[1]
    .split('@')[0];
cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
});

const app = express();
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(fileUpload());

// Enable CORS
app.use((req, res, next) => {
    debugLogger(`Request body: ${prettyStringify(req.body)}`);
    debugLogger(`Request params: ${prettyStringify(req.params)}`);
    debugLogger(`Request headers: ${prettyStringify(req.headers)}`);
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, Authorization'
    );
    res.header(
        'Access-Control-Request-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, Authorization'
    );
    next();
});

// Middleware
const AuthMiddleware = authMiddleware({joi});
const WardMiddleware = wardMiddleware({joi});
const TimelineMiddleware = timelineMiddleware({joi});
const ResourceMiddleware = resouceMiddleware({joi});
const DonationMiddleware = donationMiddleware({joi});
const VisitorMiddleware = visitorMiddleware({joi});
const VisitMiddleware = visitMiddleware({joi});

// Auth
app.use(
    `${URL_PREFIX}/auth`,
    authRouter({express, AdminModel: adminModel, jwt, bcrypt, trimRequest})
);

// Wards Route
app.use(
    `${URL_PREFIX}/wards`,
    wardRouter({
        express,
        WardModel: wardModel,
        MedicalModel: medicalModel,
        cloudinary,
        trimRequest,
    })
);

// Visitors
app.use(
    `${URL_PREFIX}/visitors`,
    visitorRouter({express, VisitorModel: visitorModel})
);

// Donations
app.use(
    `${URL_PREFIX}/donations`,
    donationRouter({express, DonationsModel: donationsModel})
);

// Visits
app.use(
    `${URL_PREFIX}/visits`,
    visitsRouter({express, VisitModel: visitsModel})
);

app.use(`${URL_PREFIX}/endpoints`, (req, res) =>
    res.status(200).json(listEndpoints(app))
);

app.use(
    `${URL_PREFIX}/timelines`,
    timelineRouter({
        express,
        TimelineModel: timelineModel,
        WardModel: wardModel,
        cloudinary,
    })
);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(404).json({
        error: ['Path does not exist'],
        status: 404,
        message: "This route doesn't exist for you!",
    });
    next();
});

export default app;
