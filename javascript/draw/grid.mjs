import { canvas, context } from "../window.mjs"
import { zoom } from "./world.mjs"
import { subscribe, EVENT, x as mouseX, y as mouseY } from "../events/mouse.mjs"
import { GRID_STEP } from "../settings/application.mjs"
import { SHOW_CENTRE } from "../settings/user.mjs"

function drawVerticalLines() {
  for (let x = canvas.centre.x; x > 0; x -= GRID_STEP * zoom) {
    context.moveTo(x, 0)
    context.lineTo(x, canvas.height)
  }
  for (let x = canvas.centre.x + GRID_STEP * zoom; x < canvas.width; x += GRID_STEP * zoom) {
    context.moveTo(x, 0)
    context.lineTo(x, canvas.height)
  }
}

function drawHorizontalLines() {
  for (let y = canvas.centre.y; y > 0; y -= GRID_STEP * zoom) {
    context.moveTo(0, y)
    context.lineTo(canvas.width, y)
  }
  for (let y = canvas.centre.y + GRID_STEP * zoom; y < canvas.height; y += GRID_STEP * zoom) {
    context.moveTo(0, y)
    context.lineTo(canvas.width, y)
  }
}

function drawLines() {
  context.strokeStyle = 'lightgrey'
  context.lineWidth = '1'

  context.beginPath()
  drawVerticalLines()
  drawHorizontalLines()
  context.stroke()
}

function markCentre() {
  context.beginPath()
  context.arc(canvas.centre.x, canvas.centre.y, 5 * zoom, 0, 2 * Math.PI, false)
  context.fillStyle = 'red'
  context.fill()
  context.lineWidth = 1
  context.strokeStyle = 'black'
  context.stroke()
}

export function draw() {
  drawLines()
  if (SHOW_CENTRE) {
    markCentre()
  }
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
    canvas.centre.x = previousCentre.x + (mouseX - dragFrom.x) * zoom
    canvas.centre.y = previousCentre.y + (mouseY - dragFrom.y) * zoom
  }
}

export function stopMoving() {
  dragging = false
}

subscribe(EVENT.MOUSE_DOWN_RIGHT, startMoving)
subscribe(EVENT.MOUSE_MOVE, move)
subscribe(EVENT.MOUSE_UP_RIGHT, stopMoving)
