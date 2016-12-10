import diff from './diff';
import patch from './patch';

export default function (src, tar, { done } = {}) {
  if (done) {
    return diff(src, tar, {
      done (instructions) {
        patch(instructions);
        done(instructions);
      }
    });
  }
  const instructions = diff(src, tar);
  patch(instructions);
  return instructions;
}
