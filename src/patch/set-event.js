import eventMap from '../util/event-map';
import realNode from '../util/real-node';

export default function (src, dst, data) {
  const realSrc = realNode(src);
  const eventHandlers = eventMap(realSrc);
  const name = data.name;
  const prevHandler = eventHandlers[name];
  const nextHandler = data.value;

  if (typeof prevHandler === 'function') {
    realSrc.removeEventListener(name, prevHandler);
  }

  if (typeof nextHandler === 'function') {
    eventHandlers[name] = nextHandler;
    realSrc.addEventListener(name, nextHandler);
  }
}
