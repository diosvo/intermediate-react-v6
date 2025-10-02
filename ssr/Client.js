import { createElement as h } from 'react';
import { hydrateRoot } from 'react-dom/client';

import App from './App';

hydrateRoot(document.getElementById('root'), h(App));
