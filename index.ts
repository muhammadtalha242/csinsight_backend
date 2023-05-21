import http from 'http';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';

import logger from './utils/logger';
import { getRoutes } from './routes';


require('dotenv').config();

const main = async () => {


  const models = require('./db/models');

  const NAMESPACE = 'Server';
  const router = express();

  const { PORT, SESSION_SECRET, WEBHOOK_MQTT_RECIEVER_URL, SENTRY_DNS_URL } = process.env;
  const port: number = PORT ? parseInt(PORT) : 8080;


  /** Allow CORS */
  router.use(cors());

  /** Log the request */
  router.use((req: Request, res: Response, next: NextFunction) => {
    /** Log the req */
    logger.info(`${NAMESPACE}: METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
      /** Log the res */
      logger.info(`${NAMESPACE}: METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
  });

  /** Parse the body of the request */
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());
  // router.use(session({
  //   resave: true,
  //   saveUninitialized: true,
  //   secret: SESSION_SECRET!,
  // }));
  // router.use(passport.initialize());
  // router.use(passport.session());

  /** Rules of our API */
  router.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({ message: 'Method not allowed.' });
    }

    next();
  });

  /** Routes go here */
  router.use('/', getRoutes());

  router.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not found.');

    res.status(404).json({
      message: error.message,
    });
  });

  const httpServer = http.createServer(router);

  httpServer.listen(port, () => logger.info(`${NAMESPACE}: Running on ${port}`));
};

main();
