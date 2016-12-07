import diffMain from './diff/main';
import DiffWorker from 'worker-loader?name=./dist/[hash].[ext]!./diff/worker';
import root from './util/root';

const { Node } = root;

function diffWorker (src, tar, { done }) {
  const worker = new DiffWorker();
  worker.addEventListener('message', e => done(e.data));
  worker.postMessage([ src, tar ]);
}

export default function diff (src, tar, { done } = {}) {
  const canDiffInWorker = done && !(src instanceof Node && tar instanceof Node);
  return canDiffInWorker ? diffWorker(src, tar, { done }) : diffMain(src, tar, { done });
}
