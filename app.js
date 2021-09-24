import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import typeDefs from './schemaGraphql';
import resolvers from './modules';
import { envVariable } from './configs';
import { logger, jwtUtils } from './utils';
import AppContext from './configs/context';
import _ from 'lodash';
import cors from 'cors';
import redis from 'redis';
import path from 'path';
import models from './models';

import { authenticationRouter } from './routers';

const redisClient = redis.createClient();
const pathServer = '/api/v1/graphql';

export const startServer = async () => {
  const app = express();

  const db = await models();
  //config routes api
  app.use(cors());
  // app.use('/api/v1/images', imageRouter);
  app.use('/', authenticationRouter({ db }));
  // view engine setup
  app.set('views', path.join(process.cwd(), 'views'));
  app.set('view engine', 'ejs');

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

  global.appContext = new AppContext();
  global.redisClient = redisClient;
  global.logger = logger;
  // seed(); // initialize database

  app.listen({ port: envVariable.PORT }, () => logger.info(`🚀 Server ready ${server.graphqlPath} port ${envVariable.PORT}`));
};

startServer();