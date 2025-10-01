// 🌈 Purpose: Generate static HTML file by rendering a React component into HTML template without any client-side React runtime.

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import App from './App.js';

// Create __dirname equivalent for ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distPath = path.join(__dirname, 'dist');

const shell = readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const app = renderToStaticMarkup(h(App));
const html = shell.replace('<!-- ROOT -->', app);

if (!existsSync(distPath)) {
  mkdirSync(distPath);
} else {
  const files = readdirSync(distPath);
  for (const file of files) {
    unlinkSync(path.join(distPath, file));
  }
}

writeFileSync(path.join(distPath, 'index.html'), html);
