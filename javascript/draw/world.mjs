import { subscribe, EVENT, x as mouseX, y as mouseY } from "../events/mouse.mjs"
import { ZOOM_STEP } from "../settings/application.mjs"
import { draw as gridDraw } from "./grid.mjs"
import { draw as nodesDraw } from "./nodes.mjs"

export let canvas
export let context
export let zoom = 1
export let CANVAS_WIDTH = 1200
export let CANVAS_HEIGHT = 800
export let centre = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 }

export function draw() {
  requestAnimationFrame(draw)
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  gridDraw()
  nodesDraw()
}

export function zoomIn() {
  if (zoom < 2 - ZOOM_STEP) {
    const zoomDifference = (zoom + ZOOM_STEP) / zoom
    centre.x = mouseX - (mouseX - centre.x) * zoomDifference
    centre.y = mouseY - (mouseY - centre.y) * zoomDifference
    zoom += ZOOM_STEP
  }
}

export function zoomOut() {
  if (zoom > ZOOM_STEP + 0.1) {
    const zoomDifference = (zoom - ZOOM_STEP) / zoom
    centre.x = mouseX - (mouseX - centre.x) * zoomDifference
    centre.y = mouseY - (mouseY - centre.y) * zoomDifference
    zoom -= ZOOM_STEP
  }
}

export const mouse = { x: 0, y: 0 }
export function onMouseMove() {
  mouse.x = Math.round((mouseX - centre.x) / zoom)
  mouse.y = Math.round((mouseY - centre.y) / zoom)
}

function resizeCanvas() {
  if (!canvas) { return }
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  CANVAS_WIDTH = canvas.width
  CANVAS_HEIGHT = canvas.height
  centre = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 }
  draw()
}
resizeCanvas()

export function initialise() {
  canvas = document.querySelector('canvas')
  context = canvas.getContext('2d')
  resizeCanvas()
  draw()
}

window.addEventListener('resize', resizeCanvas, false)

subscribe(EVENT.MOUSE_SCROLL_IN, zoomIn)
subscribe(EVENT.MOUSE_SCROLL_OUT, zoomOut)
subscribe(EVENT.MOUSE_MOVE, onMouseMove)
