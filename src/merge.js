import diff from './diff';
import patch from './patch';

export default function (opts) {
  patch(diff(opts));
  return opts.source;
}
