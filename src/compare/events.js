import * as types from '../types';

export default function (src, dst) {
  let dstEvents = dst.events;
  let instructions = [];

  if (!dstEvents) {
    return instructions;
  }

  for (let a in dstEvents) {
    let dstEvent = dstEvents[a];

    // Hack, as stated elsewhere, but we need to refer to the old event
    // handler. We only want to apply a patch if it's changed.
    if (src[`__events_${a}`] !== dstEvent) {
      instructions.push({
        data: { name: a, value: dstEvent },
        destination: dst,
        source: src,
        type: types.SET_EVENT
      });
    }
  }

  return instructions;
}
