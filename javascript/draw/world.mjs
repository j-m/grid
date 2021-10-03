import { x as mouseX, y as mouseY } from "../events/mouse.mjs"
import { subscribe, EVENT } from "../events/manager.mjs"
import { ZOOM_STEP } from "../settings/application.mjs"
import { draw as gridDraw } from "./grid.mjs"
import { draw as nodesDraw } from "./nodes.mjs"
import { draw as mouseDraw } from "./mouse.mjs"
import { canvas, isCanvasFocused, context } from "../window.mjs"

export let zoom = 1
export const ZOOM_MIN = 0.1
export const ZOOM_MAX = 4

export function draw() {
  if (isCanvasFocused) {
    context.filter = "none"
  } else {
    context.filter = 'blur(5px)'
  }
  gridDraw()
  nodesDraw()
  mouseDraw()
}

export function zoomIn() {
  if (zoom < ZOOM_MAX - ZOOM_STEP) {
    const zoomDifference = (zoom + ZOOM_STEP) / zoom
    canvas.centre.x = mouseX - (mouseX - canvas.centre.x) * zoomDifference
    canvas.centre.y = mouseY - (mouseY - canvas.centre.y) * zoomDifference
    zoom += ZOOM_STEP
  }
}

export function zoomOut() {
  if (zoom > ZOOM_STEP + ZOOM_MIN) {
    const zoomDifference = (zoom - ZOOM_STEP) / zoom
    canvas.centre.x = mouseX - (mouseX - canvas.centre.x) * zoomDifference
    canvas.centre.y = mouseY - (mouseY - canvas.centre.y) * zoomDifference
    zoom -= ZOOM_STEP
  }
}

export const mouse = { x: 0, y: 0 }
export function onMouseMove() {
  mouse.x = Math.round((mouseX - canvas.centre.x) / zoom)
  mouse.y = Math.round((mouseY - canvas.centre.y) / zoom)
}


let dragging = false
let previousCentre = {}
let dragFrom = {}

function shouldMove() {
  return true
}

export function startMoving() {
  if (shouldMove()) {
    dragging = true
    dragFrom = { x: mouseX, y: mouseY }
    previousCentre = { x: canvas.centre.x, y: canvas.centre.y }
  }
}

export function move() {
  if (shouldMove() && dragging) {
    canvas.centre.x = previousCentre.x + (mouseX - dragFrom.x)
    canvas.centre.y = previousCentre.y + (mouseY - dragFrom.y)
  }
}

export function stopMoving() {
  dragging = false
}

subscribe(EVENT.MOUSE_DOWN_RIGHT, startMoving)
subscribe(EVENT.MOUSE_MOVE, move)
subscribe(EVENT.MOUSE_UP_RIGHT, stopMoving)

subscribe(EVENT.MOUSE_SCROLL_IN, zoomIn)
subscribe(EVENT.MOUSE_SCROLL_OUT, zoomOut)
subscribe(EVENT.MOUSE_MOVE, onMouseMove)
