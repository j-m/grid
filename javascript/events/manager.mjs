
export let EVENT = {
  MOUSE_MOVE: "mouseMove",
  MOUSE_DOWN: "mouseDown",
  MOUSE_DOWN_LEFT: "mouseDownLeft",
  MOUSE_DOWN_MIDDLE: "mouseDownMiddle",
  MOUSE_DOWN_RIGHT: "mouseDownRight",
  MOUSE_DOWN_OTHER: "mouseDownOther",
  MOUSE_UP: "mouseUp",
  MOUSE_UP_LEFT: "mouseUpLeft",
  MOUSE_UP_MIDDLE: "mouseUpMiddle",
  MOUSE_UP_RIGHT: "mouseUpRight",
  MOUSE_UP_OTHER: "mouseUpOther",
  MOUSE_SCROLL: "mouseScroll",
  MOUSE_SCROLL_IN: "mouseScrollIn",
  MOUSE_SCROLL_OUT: "mouseScrollOut"
}

export let subscriptions = {
  mouseMove: [],
  mouseDown: [],
  mouseDownLeft: [],
  mouseDownMiddle: [],
  mouseDownRight: [],
  mouseDownOther: [],
  mouseUp: [],
  mouseUpLeft: [],
  mouseUpMiddle: [],
  mouseUpRight: [],
  mouseUpOther: [],
  mouseScroll: [],
  mouseScrollIn: [],
  mouseScrollOut: []
}

export function subscribe(type, func) {
  if (subscriptions[type]) {
    subscriptions[type].push(func)
  } else {
    throw "BAD_CODE: Use the mouse.EVENT_TYPE enum"
  }
}

export function trigger(type) {
  if (subscriptions[type]) {
    for (const subscription of subscriptions[type]) {
      subscription()
    }
  } else {
    throw "BAD_CODE: Use the mouse.EVENT_TYPE enum"
  }
}
