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
  context.clearRect(0, 0, canvas.width, canvas.height)
  world.draw()
}

function loop() {
  requestAnimationFrame(loop)
  if (!canvas || !context) { return }
  if (!isCanvasFocused) { return }
  draw()
}

function resizeCanvas() {
  if (!canvas) { return }
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  canvas.centre = { x: canvas.width / 2, y: canvas.height / 2 }
  draw()
}

export let isCanvasFocused = false
function lockChange() {
  isCanvasFocused = document.pointerLockElement === canvas
  mouse.lockChange()
  draw()
}

function lockPointer() {
  if (canvas && !isCanvasFocused) {
    canvas.requestPointerLock()
  }
}

function initialise() {
  canvas = document.querySelector('canvas')
  context = canvas.getContext('2d')
  canvas.onclick = lockPointer
  resizeCanvas()
  loop()
}

document.addEventListener('pointerlockchange', lockChange, { passive: true })
document.addEventListener("pointerlockerror", () => console.error("Could not lock pointer"), { passive: true })
document.getElementById("FULLSCREEN").addEventListener("click", () => { canvas.requestFullscreen() }, { passive: true })

window.addEventListener('resize', resizeCanvas, { passive: true })
window.addEventListener('load', initialise, { passive: false })
