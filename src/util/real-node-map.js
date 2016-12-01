// import WeakMap from './weak-map';
// export default new WeakMap();
const map = [];
export default {
  get (id) {
    return map[id];
  },
  set (id, node) {
    map[id] = node;
  }
};
