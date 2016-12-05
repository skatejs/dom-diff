import * as types from '../types';

export default function (src, dst) {
  const dstEvents = dst.events;
  const srcEvents = src.events;
  const instructions = [];

  // Remove any source events that aren't in the destination before seeing if
  // we need to add any from the destination.
  if (srcEvents) {
    for (let name in srcEvents) {
      const srcEvent = srcEvents[name];
      const dstEvent = dstEvents[name];
      if (!dstEvent || srcEvent !== dstEvent) {
        instructions.push({
          data: { name },
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
      const srcEvent = srcEvents[name];
      const dstEvent = dstEvents[name];
      if (srcEvent !== dstEvent) {
        instructions.push({
          data: { name, value: dstEvent },
          destination: dst,
          source: src,
          type: types.SET_EVENT
        });
      }
    }
  }

  return instructions;
}
