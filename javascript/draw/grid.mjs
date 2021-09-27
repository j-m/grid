import { canvas, context } from "../window.mjs"
import { zoom } from "./world.mjs"
import { subscribe, EVENT, x as mouseX, y as mouseY } from "../events/mouse.mjs"
import { GRID_STEP } from "../settings/application.mjs"
import { SHOW_CENTRE } from "../settings/user.mjs"
import { GRID } from "../settings/style.mjs"

export let step = { w: GRID_STEP, h: GRID_STEP }

const ROOT_3 = Math.sqrt(3)
const baseHeightRatio = 2 / ROOT_3 / 2

function drawBackwardSlantedLines() {
  const equilateralTriangleBase = canvas.height / ROOT_3 / 2
  const offset = (canvas.centre.y - canvas.height / 2) * baseHeightRatio % (step.w * zoom)
  for (let x = canvas.centre.x; x > -equilateralTriangleBase; x -= step.w * zoom) {
    context.moveTo(x - equilateralTriangleBase - offset, 0)
    context.lineTo(x + equilateralTriangleBase - offset, canvas.height)
  }

  for (let x = canvas.centre.x + step.w * zoom; x < canvas.width + equilateralTriangleBase; x += step.w * zoom) {
    context.moveTo(x - equilateralTriangleBase - offset, 0)
    context.lineTo(x + equilateralTriangleBase - offset, canvas.height)
  }
}

function drawForwardSlantedLines() {
  const equilateralTriangleBase = canvas.height / ROOT_3 / 2
  const offset = (canvas.centre.y - canvas.height / 2) * baseHeightRatio % (step.w * zoom)
  for (let x = canvas.centre.x; x > -equilateralTriangleBase; x -= step.w * zoom) {
    context.moveTo(x + equilateralTriangleBase + offset, 0)
    context.lineTo(x - equilateralTriangleBase + offset, canvas.height)
  }

  for (let x = canvas.centre.x + step.w * zoom; x < canvas.width + equilateralTriangleBase; x += step.w * zoom) {
    context.moveTo(x + equilateralTriangleBase + offset, 0)
    context.lineTo(x - equilateralTriangleBase + offset, canvas.height)
  }
}

function drawVerticalLines() {
  for (let x = canvas.centre.x; x > 0; x -= step.w * zoom) {
    context.moveTo(x, 0)
    context.lineTo(x, canvas.height)
  }
  for (let x = canvas.centre.x + step.w * zoom; x < canvas.width; x += step.w * zoom) {
    context.moveTo(x, 0)
    context.lineTo(x, canvas.height)
  }
}

function drawHorizontalLines(offset = 0) {
  for (let y = canvas.centre.y; y > 0; y -= step.h * zoom) {
    context.moveTo(0, y + offset)
    context.lineTo(canvas.width, y + offset)
  }
  for (let y = canvas.centre.y + step.h * zoom; y < canvas.height; y += step.h * zoom) {
    context.moveTo(0, y + offset)
    context.lineTo(canvas.width, y + offset)
  }
}


function drawTriangularLines() {
  step.h = GRID_STEP * ROOT_3 / 2

  context.beginPath()
  drawHorizontalLines()
  drawBackwardSlantedLines()
  drawForwardSlantedLines()
  context.stroke()
}

function drawHexagonalLine() {
  step.h = GRID_STEP * ROOT_3 / 2

  context.beginPath()
  context.setLineDash([GRID_STEP * zoom, GRID_STEP * zoom])
  drawHorizontalLines()
  // context.setLineDash([GRID_STEP * 2 * zoom, GRID_STEP * zoom])
  drawBackwardSlantedLines()
  context.lineDashOffset = GRID_STEP * zoom / 2
  drawForwardSlantedLines()
  context.stroke()
}

function drawSquareLines() {
  step.h = GRID_STEP

  context.beginPath()
  drawVerticalLines()
  drawHorizontalLines()
  context.stroke()
}

function drawLines() {
  context.strokeStyle = 'lightgrey'
  context.lineWidth = '1'
  context.setLineDash([])
  context.lineDashOffset = 0
  switch (GRID) {
    case "triangle":
      drawTriangularLines()
      break
    case "hexagon":
      drawHexagonalLine()
      break
    case "square":
    default:
      drawSquareLines()
      break
  }
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
