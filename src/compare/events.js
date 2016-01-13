import * as types from '../types';
import eventMap from '../util/event-map';

export default function (src, dst) {
  const dstEvents = dst.events;
  const srcEvents = eventMap(src);
  const instructions = [];

  // Remove any source events that aren't in the source before seeing if we
  // need to add any from the destination.
  if (srcEvents) {
    for (let name in srcEvents) {
      if (dstEvents[name] !== srcEvents[name]) {
        instructions.push({
          data: { name, value: undefined },
          destination: dst,
          source: src,
          type: types.SET_EVENT
        });
      }
    }
  }

  // After instructing to remove any old events, we then can instruct to add
  // new events. This prevents the new events from being removed from earlier
  // instructions.
  if (dstEvents) {
    for (let name in dstEvents) {
      const value = dstEvents[name];
      if (srcEvents[name] !== value) {
        instructions.push({
          data: { name, value },
          destination: dst,
          source: src,
          type: types.SET_EVENT
        });
      }
    }
  }

  return instructions;
}
