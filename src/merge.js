import diff from './diff';
import patch from './patch';

export default function (opts = {}) {
  const { source, destination, done } = opts;
  if (done) {
    return diff({
      source,
      destination,
      done (instructions) {
        patch(instructions);
        done(instructions);
      }
    });
  }
  const instructions = diff(opts);
  patch(instructions);
  return instructions;
}
