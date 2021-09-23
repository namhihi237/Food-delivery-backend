import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import typeDefs from './schemaGraphql';
import resolvers from './modules';
const pathServer = '/api/v1/graphql';
import { envVariable } from './configs';
import { logger, jwt } from './utils';
import AppContext from './configs/context';
import _ from 'lodash';
import cors from 'cors';
import redis from 'redis';
import  path  from 'path';
import models from './models';

const redisClient = redis.createClient();

export const startServer = async () => {
  const app = express();

	const db = await models();
  //config routes api
  app.use(cors());
  // app.use('/api/v1/images', imageRouter);

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
        user = await jwt.verify(token);
      } catch (error) {}

      return { user: _.get(user, 'data') };
    }
  });

  await server.start();
  server.applyMiddleware({ app, path: pathServer });

  global.appContext = new AppContext();
  global.redisClient = redisClient;
  // seed(); // initialize database

  app.listen({ port: envVariable.PORT }, () => logger.info(`🚀 Server ready ${server.graphqlPath} port ${envVariable.PORT}`));
};

startServer();