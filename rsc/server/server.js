const path = require('node:path');
const { readFileSync } = require('node:fs');
const Fastify = require('fastify');
const fastifyStaticPlugin = require('@fastify/static');
const React = require('react');
const { requireToPipeableStream } = require('react-server-dom-webpack/server');
const AppImport = require('../src/App');

// Represent the default export of an ES module when importing using CommonJS
const App = AppImport.default;

const MANIFEST = readFileSync(
  path.resolve(__dirname, '../dist/react-client-manifest.json'),
  'utf8'
);
const MODULE_MAP = JSON.parse(MANIFEST);
const PORT = process.env.PORT ?? 3000;

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
});

fastify.register(fastifyStaticPlugin, {
  root: path.join(__dirname, '../dist'),
  prefix: '/assets/',
});
fastify.register(fastifyStaticPlugin, {
  root: path.join(__dirname, '../public'),
  decorateReply: false,
});

fastify.get('/', async function rootHandler(request, reply) {
  return reply.sendFile('index.html');
});
fastify.get('/react-flight', function reactFlightHandler(request, reply) {});

module.exports = async function start() {
  try {
    await fastify.listen({ port: PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
