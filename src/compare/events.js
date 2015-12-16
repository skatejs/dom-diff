import * as types from '../types';
import eventMap from '../util/event-map';

export default function (src, dst) {
  const eventHandlers = eventMap(src);
  let dstEvents = dst.events;
  let instructions = [];

  if (!dstEvents) {
    return instructions;
  }

  for (let name in dstEvents) {
    let dstEvent = dstEvents[name];

    // Hack, as stated elsewhere, but we need to refer to the old event
    // handler. We only want to apply a patch if it's changed.
    if (eventHandlers[name] !== dstEvent) {
      instructions.push({
        data: { name: name, value: dstEvent },
        destination: dst,
        source: src,
        type: types.SET_EVENT
      });
    }
  }

  return instructions;
}
