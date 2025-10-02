import fastifyStatic from '@fastify/static';
import fastify from 'fastify';
import { readFileSync } from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';

import App from './App.js';

// Create __dirname equivalent for ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const shell = readFileSync(path.join(__dirname, 'dist', 'index.html'), 'utf-8');

const app = fastify();

app.register(fastifyStatic, {
  root: path.join(__dirname, 'dist'),
  prefix: '/',
});

const parts = shell.split('<!-- ROOT -->');
app.get('/', (req, reply) => {
  reply.raw.write(parts[0]);
  const reactApp = renderToString(h(App));
  reply.raw.write(reactApp);
  reply.raw.write(parts[1]);
  reply.raw.end();
});

app.listen({
  port: 3000,
});
