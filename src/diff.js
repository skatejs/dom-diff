import diffMain from './diff-main';
import DiffWorker from 'worker-loader?name=./dist/[hash].[ext]!./diff-worker';

const { Node } = window;

function diffWorker (opts) {
  const worker = new DiffWorker();
  const { done } = opts;
  worker.addEventListener('message', e => done(e.data));
  delete opts.done;
  worker.postMessage(opts);
}

export default function diff (opts = {}) {
  const { source, destination, done } = opts;
  const canDiffInWorker = done && !(source instanceof Node && destination instanceof Node);
  return canDiffInWorker ? diffWorker(opts) : diffMain(opts);
}
