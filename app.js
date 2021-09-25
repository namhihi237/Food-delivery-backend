import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import _ from 'lodash';
import cors from 'cors';
import path from 'path';
import https from "https";
import http from "http";

import typeDefs from './schemaGraphql';
import resolvers from './modules';
import { envVariable } from './configs';
import { logger, jwtUtils } from './utils';
import models from './models';
import { authenticationRouter } from './routers';
import fs from "fs";

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

  const configurations = {
    // Note: You may need sudo to run on port 443
    production: { ssl: true, port: 443, hostname: 'localhost' },
    development: { ssl: false, port: 4000, hostname: 'localhost' },
  };

  const environment = process.env.NODE_ENV || 'production';
  const config = configurations[environment];



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


  // Create the HTTPS or HTTP server, per configuration
  let httpServer;
  if (config.ssl) {
    // Assumes certificates are in a .ssl folder off of the package root.
    // Make sure these files are secured.
    httpServer = https.createServer(
      {
        key: fs.readFileSync('./ssl/private.key'),
        cert: fs.readFileSync('./ssl/certificate.crt'),
        ca: [fs.readFileSync('./ssl/ca_bundle.crt')],
      },
      app,
    );
  } else {
    httpServer = http.createServer(app);
  }
  await new Promise(resolve => httpServer.listen({ port: envVariable.PORT }, resolve));

  console.log(
    '🚀 Server ready at',
    `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${server.graphqlPath}`
  );
};

startServer();
///https://localhost:8000/api/v1/graphql