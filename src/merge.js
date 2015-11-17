import diff from './diff';
import patch from './patch';

export default function (opts) {
  var inst = diff(opts);
  patch(inst);
  return inst;
}
