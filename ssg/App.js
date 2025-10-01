import { createElement as h } from 'react';

export default function App() {
  return h(
    'div',
    null,
    h('h1', null, 'Hello Frontend Master'),
    h('p', null, 'This is SSG')
  );
}
