import diff from './main';

// eslint-disable-next-line no-undef
self.addEventListener('message', e => {
  const instructions = diff.apply(null, e.data);
  // eslint-disable-next-line no-undef
  self.postMessage(instructions);
});
