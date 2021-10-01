import * as world from "./draw/world.mjs"
import * as mouse from "./events/mouse.mjs"

const INITIAL_CANVAS_WIDTH = 1200
const INITIAL_CANVAS_HEIGHT = 1200

export let canvas = {
  width: INITIAL_CANVAS_WIDTH,
  height: INITIAL_CANVAS_HEIGHT,
  centre: {
    x: INITIAL_CANVAS_WIDTH / 2,
    y: INITIAL_CANVAS_HEIGHT / 2
  }
}
export let context

function draw() {
  requestAnimationFrame(draw)
  if (!canvas || !context) { return }
  context.clearRect(0, 0, canvas.width, canvas.height)
  world.draw()
}

function resizeCanvas() {
  if (!canvas) { return }
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  canvas.centre = { x: canvas.width / 2, y: canvas.height / 2 }
  draw()
}

export let canvasHasFocus = false
function lockChange() {
  mouse.lockChange()
  canvasHasFocus = document.pointerLockElement === canvas
}

function lockPointer() {
  if (canvas && !canvasHasFocus) {
    canvas.requestPointerLock()
  }
}

function initialise() {
  canvas = document.querySelector('canvas')
  context = canvas.getContext('2d')
  document.addEventListener('pointerlockchange', lockChange, { passive: true })
  document.addEventListener("pointerlockerror", () => console.error("Could not lock pointer"), { passive: true })
  canvas.onclick = lockPointer
  resizeCanvas()
  draw()
}

window.addEventListener('resize', resizeCanvas, { passive: true })
window.addEventListener('load', initialise, { passive: false })
