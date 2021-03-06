import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import _ from 'lodash';
import cors from 'cors';
import path from 'path';
import session from "express-session";
import redis from "redis";
import conectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import typeDefs from './schemaGraphql';
import resolvers from './modules';
import { envVariable } from './configs';
import { logger, jwtUtils } from './utils';
import models from './models';
import { authenticationRouter, adminRouter } from './routers';
import adminMiddleware from './middlewares/adminMiddleware';

const pathServer = '/api/v1/graphql';

// setup session storage
const redisClient = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
  db: 0
});

const RedisStore = conectRedis(session);
const redisStore = new RedisStore({
  client: redisClient
});


export const startServer = async () => {
  const app = express();

  app.use(session({
    secret: 'z5l1c9dpSD', // random key
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    maxAgeRemember: 30 * 24 * 60 * 60 * 1000, // 30 days
    resave: false,
    saveUninitialized: true,
    store: redisStore
  }));

  const db = await models();
  //config routes api
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false, limit: '20mb', parameterLimit: 100 }));
  app.use(express.static(path.join(process.cwd(), 'public')));
  app.use(cookieParser());

  // app.use('/api/v1/images', imageRouter);
  app.use('/api', authenticationRouter({ db }));
  app.use('/', adminRouter({ db }));

  // view engine setup
  app.set('views', path.join(process.cwd(), 'views'));
  app.set('view engine', 'ejs');

  // app.use((req, res, next) => adminMiddleware.renderError(req, res, next));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: async ({ req }) => {
      let token = null,
        user = null;
      token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
      try {
        user = await jwtUtils.verify(token);
      } catch (error) { }

      return { user: _.get(user, 'data'), db };
    }
  });

  await server.start();
  server.applyMiddleware({ app, path: pathServer });

  global.logger = logger;
  // seed(); // initialize database

  app.listen({ port: envVariable.PORT }, () => {
    console.info(`Server run environment ${process.env.NODE_ENV || "dev"}`)
    logger.info(`???? Server ready at http://localhost:${envVariable.PORT}${server.graphqlPath}`);
  });
};

startServer();