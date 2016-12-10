import diff from './main';

// eslint-disable-next-line no-undef
self.addEventListener('message', e => {
  const instructions = diff(...e.data);
  // eslint-disable-next-line no-undef
  self.postMessage(instructions);
});
