import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import _ from 'lodash';
import cors from 'cors';
import path from 'path';

import typeDefs from './schemaGraphql';
import resolvers from './modules';
import { envVariable } from './configs';
import { logger, jwtUtils } from './utils';
import models from './models';
import { authenticationRouter } from './routers';

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


  app.use(express.json());
  app.use(express.urlencoded({ extended: false, limit: '20mb', parameterLimit: 100 }));
  app.use(express.static(path.join(process.cwd(), 'public')));

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
    logger.info(`🚀 Server ready at http://localhost:${envVariable.PORT}${server.graphqlPath}`);
  });
};

startServer();