import * as world from "./draw/world.mjs"
import * as mouse from "./events/mouse.mjs"
import userSettings from "./settings/user.mjs"

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

let blurDiv

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  world.draw()
}

function loop() {
  requestAnimationFrame(loop)
  if (!canvas || !context) { return }
  if (!userSettings.renderOnBlur && !isCanvasFocused) { return }
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
function onLockChange() {
  isCanvasFocused = document.pointerLockElement === canvas
  if (isCanvasFocused) {
    blurDiv.classList.add('hidden')
  } else {
    if (userSettings.blur) {
      blurDiv.classList.remove('hidden')
    }
  }
  mouse.lockChange()
  draw()
}

function lockPointer(event) {
  if (canvas && !isCanvasFocused) {
    canvas.requestPointerLock()
    mouse.setPosition(event.clientX, event.clientY)
  }
}

function fullscreen() {
  canvas.requestFullscreen()
}

function initialise() {
  document.addEventListener('pointerlockchange', onLockChange, { passive: true })
  document.addEventListener("pointerlockerror", () => console.error("Could not lock pointer"), { passive: true })
  document.getElementById("FULLSCREEN").addEventListener("click", fullscreen, { passive: true })

  canvas = document.querySelector('canvas')
  context = canvas.getContext('2d')
  blurDiv = document.getElementById("blur")
  canvas.onclick = lockPointer
  resizeCanvas()
  loop()
}


window.addEventListener('resize', resizeCanvas, { passive: true })
window.addEventListener('load', initialise, { passive: false })
