import * as types from '../types';
import eventMap from '../util/event-map';

export default function (src, dst) {
  const eventHandlers = eventMap(src);
  const dstEvents = dst.events;
  const instructions = [];

  // Remove all handlers not being set.
  for (let name in eventHandlers) {
    if (!dstEvents || !(name in dstEvents)) {
      const value = null;
      instructions.push({
        data: { name, value },
        destination: dst,
        source: src,
        type: types.SET_EVENT
      });
    }
  }

  // Add new handlers, not changing existing ones.
  if (dstEvents) {
    for (let name in dstEvents) {
      const value = dstEvents[name];
      if (eventHandlers[name] !== value) {
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
