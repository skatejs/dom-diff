import diff from './diff-main';

self.addEventListener('message', e => {
  const instructions = diff(e.data);
  self.postMessage(instructions);
});
