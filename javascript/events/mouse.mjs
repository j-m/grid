import { canvas } from "../draw/world.mjs"
import { INVERT_SCROLL } from "../settings/user.mjs"

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

export let x = 0
export let y = 0
export let hasMovedSinceDown = false

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

export function initialise() {
  canvas.onmousedown = mouseDown
  canvas.onmousemove = mouseMove
  canvas.onmouseup = mouseUp
  canvas.onwheel = mouseScroll
  canvas.oncontextmenu = mouseContextMenu
}

function trigger(type) {
  if (subscriptions[type]) {
    for (const subscription of subscriptions[type]) {
      subscription()
    }
  } else {
    throw "BAD_CODE: Use the mouse.EVENT_TYPE enum"
  }
}

function mouseContextMenu(event) {
  mouseMove(event)
  event.preventDefault()
  event.stopPropagation()
  return false
}

function mouseMove(event) {
  event.preventDefault()
  event.stopPropagation()
  canvas.style.cursor = 'default'
  const canvasRect = canvas.getBoundingClientRect()
  if (x !== event.x - canvasRect.x
    && y !== event.y - canvasRect.y) {
    hasMovedSinceDown = true
  }
  x = event.x - canvasRect.x
  y = event.y - canvasRect.y
  trigger(EVENT.MOUSE_MOVE)
}

function mouseDown(event) {
  event.preventDefault()
  event.stopPropagation()
  hasMovedSinceDown = false
  switch (event.which) {
    case 1:
      trigger(EVENT.MOUSE_DOWN_LEFT)
      break
    case 2:
      trigger(EVENT.MOUSE_DOWN_MIDDLE)
      break
    case 3:
      trigger(EVENT.MOUSE_DOWN_RIGHT)
      break
    default:
      trigger(EVENT.MOUSE_DOWN_OTHER)
  }
  trigger(EVENT.MOUSE_DOWN)
  mouseMove(event)
}

function mouseUp(event) {
  event.preventDefault()
  event.stopPropagation()
  switch (event.which) {
    case 1:
      trigger(EVENT.MOUSE_UP_LEFT)
      break
    case 2:
      trigger(EVENT.MOUSE_UP_MIDDLE)
      break
    case 3:
      trigger(EVENT.MOUSE_UP_RIGHT)
      break
    default:
      trigger(EVENT.MOUSE_UP_OTHER)
  }
  trigger(EVENT.MOUSE_UP)
  mouseMove(event)
}

function mouseScroll(event) {
  event.preventDefault()
  event.stopPropagation()
  hasMovedSinceDown = true
  if (event.deltaY < 0) {
    trigger(INVERT_SCROLL ? EVENT.MOUSE_SCROLL_OUT : EVENT.MOUSE_SCROLL_IN)
  }
  if (event.deltaY > 0) {
    trigger(INVERT_SCROLL ? EVENT.MOUSE_SCROLL_IN : EVENT.MOUSE_SCROLL_OUT)
  }
  trigger(EVENT.MOUSE_SCROLL)
  mouseMove(event)
}
