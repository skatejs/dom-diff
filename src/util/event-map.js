import WeakMap from 'es6-weak-map';

const map = new WeakMap();

export default function (elem) {
  let events = map.get(elem);
  events || map.set(elem, events = {});
  return events;
}
