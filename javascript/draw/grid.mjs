import { canvas, context } from "../window.mjs"
import { zoom } from "./world.mjs"
import { GRID_STEP } from "../settings/application.mjs"
import styleSettings from "../settings/style.mjs"

export let step = { w: GRID_STEP, h: GRID_STEP }

const ROOT_3 = Math.sqrt(3)
const baseHeightRatio = (2 / ROOT_3) / 2

function drawBackwardSlantedLines(spacing, offsetX = 0) {
  const equilateralTriangleBase = canvas.height / ROOT_3 / 2
  const offset = (canvas.centre.y - canvas.height / 2) * baseHeightRatio % spacing
  for (let x = canvas.centre.x; x > -equilateralTriangleBase; x -= spacing) {
    context.moveTo(x - equilateralTriangleBase - offset + offsetX, 0)
    context.lineTo(x + equilateralTriangleBase - offset + offsetX, canvas.height)
  }

  for (let x = canvas.centre.x + spacing; x < canvas.width + equilateralTriangleBase; x += spacing) {
    context.moveTo(x - equilateralTriangleBase - offset + offsetX, 0)
    context.lineTo(x + equilateralTriangleBase - offset + offsetX, canvas.height)
  }
}

function drawForwardSlantedLines(spacing, offsetX = 0) {
  const equilateralTriangleBase = canvas.height / ROOT_3 / 2
  const offset = (canvas.centre.y - canvas.height / 2) * baseHeightRatio % spacing
  for (let x = canvas.centre.x; x > -equilateralTriangleBase; x -= spacing) {
    context.moveTo(x + equilateralTriangleBase + offset + offsetX, 0)
    context.lineTo(x - equilateralTriangleBase + offset + offsetX, canvas.height)
  }

  for (let x = canvas.centre.x + spacing; x < canvas.width + equilateralTriangleBase; x += spacing) {
    context.moveTo(x + equilateralTriangleBase + offset + offsetX, 0)
    context.lineTo(x - equilateralTriangleBase + offset + offsetX, canvas.height)
  }
}

function drawVerticalLines(spacing) {
  for (let x = canvas.centre.x; x > 0; x -= spacing) {
    context.moveTo(x, 0)
    context.lineTo(x, canvas.height)
  }
  for (let x = canvas.centre.x + spacing; x < canvas.width; x += spacing) {
    context.moveTo(x, 0)
    context.lineTo(x, canvas.height)
  }
}

function drawHorizontalLines(spacing, offsetY = 0) {
  for (let y = canvas.centre.y; y > 0; y -= spacing) {
    context.moveTo(0, y + offsetY)
    context.lineTo(canvas.width, y + offsetY)
  }
  for (let y = canvas.centre.y + spacing; y < canvas.height; y += spacing) {
    context.moveTo(0, y + offsetY)
    context.lineTo(canvas.width, y + offsetY)
  }
}


function drawTriangularLines() {
  step.h = GRID_STEP * ROOT_3 / 2

  context.beginPath()
  drawHorizontalLines(step.h * zoom)
  drawBackwardSlantedLines(step.w * zoom)
  drawForwardSlantedLines(step.w * zoom)
  context.stroke()
}

function drawHexagonalLine() {
  const sideLength = GRID_STEP / 2 * zoom
  step.w = sideLength * 2
  step.h = sideLength * ROOT_3

  context.strokeStyle = 'blue'
  context.beginPath()
  context.setLineDash([sideLength, sideLength * 2])
  context.lineDashOffset = sideLength / 2
  drawHorizontalLines(step.h)
  context.stroke()

  context.strokeStyle = 'orange'
  context.beginPath()
  context.setLineDash([sideLength, sideLength * 2])
  context.lineDashOffset = sideLength * 2
  drawHorizontalLines(step.h, step.h / 2)
  context.stroke()

  context.strokeStyle = 'red'
  context.beginPath()
  context.setLineDash([sideLength, sideLength * 2])
  context.lineDashOffset = 0
  drawBackwardSlantedLines(sideLength * 3, 0)
  context.stroke()

  context.strokeStyle = 'purple'
  context.beginPath()
  context.setLineDash([sideLength, sideLength * 2])
  context.lineDashOffset = sideLength
  drawBackwardSlantedLines(sideLength * 3, sideLength * 2)
  context.stroke()


  context.strokeStyle = 'green'
  context.beginPath()
  context.setLineDash([sideLength, sideLength * 2])
  context.lineDashOffset = sideLength * 2
  drawBackwardSlantedLines(sideLength * 3, sideLength * 4)
  context.stroke()
}

function drawSquareLines() {
  context.beginPath()
  drawVerticalLines(step.h * zoom)
  drawHorizontalLines(step.w * zoom)
  context.stroke()
}

function resetStyle() {
  step.w = GRID_STEP
  step.h = GRID_STEP
  context.strokeStyle = 'lightgrey'
  context.lineWidth = '1'
  context.setLineDash([])
  context.lineDashOffset = 0
}

function drawLines() {
  resetStyle()
  switch (styleSettings.grid) {
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
  resetStyle()
}

export function draw() {
  drawLines()
}
