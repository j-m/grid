import { canvas } from "../window.mjs"
import userSettings from "../settings/user.mjs"
import { trigger, EVENT } from "./manager.mjs"

export let x = 0
export let y = 0
export let hasMovedSinceDown = false

export function lockChange() {
  if (document.pointerLockElement === canvas) {
    x = canvas.width / 2
    y = canvas.height / 2
    document.addEventListener('mousedown', mouseDown, { passive: true })
    document.addEventListener('mousemove', mouseMove, { passive: true })
    document.addEventListener('mouseup', mouseUp, { passive: true })
    document.addEventListener('wheel', mouseScroll, { passive: true })
    document.addEventListener('contextmenu', mouseContextMenu, { passive: false })
  } else {
    document.removeEventListener('mousedown', mouseDown, { passive: true })
    document.removeEventListener('mousemove', mouseMove, { passive: true })
    document.removeEventListener('mouseup', mouseUp, { passive: true })
    document.removeEventListener('wheel', mouseScroll, { passive: true })
    document.removeEventListener('contextmenu', mouseContextMenu, { passive: false })

    trigger(EVENT.MOUSE_UP)
  }
}

function mouseContextMenu(event) {
  mouseMove(event)
  event.preventDefault()
  event.stopPropagation()
  return false
}

function mouseMove(event) {
  canvas.style.cursor = 'default'
  x += event.movementX
  x = x < 0
    ? 0
    : x > canvas.width
      ? canvas.width
      : x
  y += event.movementY
  y = y < 0
    ? 0
    : y > canvas.height
      ? canvas.height
      : y
  trigger(EVENT.MOUSE_MOVE)
}

function mouseDown(event) {
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
  hasMovedSinceDown = true
  if (event.deltaY < 0) {
    trigger(userSettings.invertScroll ? EVENT.MOUSE_SCROLL_OUT : EVENT.MOUSE_SCROLL_IN)
  }
  if (event.deltaY > 0) {
    trigger(userSettings.invertScroll ? EVENT.MOUSE_SCROLL_IN : EVENT.MOUSE_SCROLL_OUT)
  }
  trigger(EVENT.MOUSE_SCROLL)
  mouseMove(event)
}

export function isPointInCircle(pointX, pointY, circleX, circleY, circleRadius) {
  const distanceSquared = (pointX - circleX) * (pointX - circleX) + (pointY - circleY) * (pointY - circleY)
  return distanceSquared <= circleRadius * circleRadius
}

export function isPointInRect(pointX, pointY, rectX, rectY, rectSize) {
  return pointX >= rectX && pointX <= rectX + rectSize && pointY >= rectY && pointY <= rectY + rectSize
}

export function isMouseInCircle(circleX, circleY, circleRadius) {
  return isPointInCircle(x, y, circleX, circleY, circleRadius)
}

export function isMouseInSquare(rectX, rectY, reactSize) {
  return isPointInRect(x, y, rectX, rectY, reactSize)
}
