import diff from './main';

self.addEventListener('message', e => {
  const instructions = diff(e.data);
  self.postMessage(instructions);
});
