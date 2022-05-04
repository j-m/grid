import { canvas, context } from "../window.mjs"
import { zoom } from "./world.mjs"
import { GRID_STEP } from "../settings/application.mjs"
import styleSettings from "../settings/style.mjs"

export let step = { w: GRID_STEP, h: GRID_STEP }

const ROOT_3 = Math.sqrt(3)
const baseHeightRatio = (2 / ROOT_3) / 2

function drawBackwardSlantedLines(base, spacing, offsetX = 0, offsetY = 0, lineDash = [], lineDashOffset = 0, strokeStyle = undefined) {
  context.beginPath()
  if (lineDash) {
    context.setLineDash(lineDash)
    context.lineDashOffset = lineDash[0] - lineDashOffset
  }
  if (strokeStyle) {
    context.strokeStyle = strokeStyle
  }
  for (let x = canvas.centre.x; x > -base; x -= spacing) {
    context.moveTo(x + offsetX, canvas.height / 2 + offsetY)
    context.lineTo(x - base + offsetX, offsetY)
  }
  for (let x = canvas.centre.x + spacing; x < canvas.width + base; x += spacing) {
    context.moveTo(x + offsetX, canvas.height / 2 + offsetY)
    context.lineTo(x - base + offsetX, offsetY)
  }
  context.stroke()

  context.beginPath()
  if (lineDash) {
    context.setLineDash(lineDash)
    context.lineDashOffset = lineDashOffset
  }
  if (strokeStyle) {
    context.strokeStyle = strokeStyle
  }
  for (let x = canvas.centre.x; x > -base; x -= spacing) {
    context.moveTo(x + offsetX, canvas.height / 2 + offsetY)
    context.lineTo(x + base + offsetX, canvas.height + offsetY)
  }
  for (let x = canvas.centre.x + spacing; x < canvas.width + base; x += spacing) {
    context.moveTo(x + offsetX, canvas.height / 2 + offsetY)
    context.lineTo(x + base + offsetX, canvas.height + offsetY)
  }
  context.stroke()
}

function drawForwardSlantedLines(base, spacing, offsetX = 0, offsetY = 0, lineDash = [], lineDashOffset = 0, strokeStyle = undefined) {
  context.beginPath()
  if (lineDash) {
    context.setLineDash(lineDash)
    context.lineDashOffset = lineDash[0] - lineDashOffset
  }
  if (strokeStyle) {
    context.strokeStyle = strokeStyle
  }
  for (let x = canvas.centre.x; x > -base; x -= spacing) {
    context.moveTo(x + offsetX, canvas.height / 2 + offsetY)
    context.lineTo(x + base + offsetX, offsetY)
  }
  for (let x = canvas.centre.x + spacing; x < canvas.width + base; x += spacing) {
    context.moveTo(x + offsetX, canvas.height / 2 + offsetY)
    context.lineTo(x + base + offsetX, offsetY)
  }
  context.stroke()

  context.beginPath()
  if (lineDash) {
    context.setLineDash(lineDash)
    context.lineDashOffset = lineDashOffset
  }
  if (strokeStyle) {
    context.strokeStyle = strokeStyle
  }
  for (let x = canvas.centre.x; x > -base; x -= spacing) {
    context.moveTo(x + offsetX, canvas.height / 2 + offsetY)
    context.lineTo(x - base + offsetX, canvas.height + offsetY)
  }

  for (let x = canvas.centre.x + spacing; x < canvas.width + base; x += spacing) {
    context.moveTo(x + offsetX, canvas.height / 2 + offsetY)
    context.lineTo(x - base + offsetX, canvas.height + offsetY)
  }
  context.stroke()
}

function drawVerticalLines(spacing) {
  context.beginPath()
  for (let x = canvas.centre.x; x > 0; x -= spacing) {
    context.moveTo(x, 0)
    context.lineTo(x, canvas.height)
  }
  for (let x = canvas.centre.x + spacing; x < canvas.width; x += spacing) {
    context.moveTo(x, 0)
    context.lineTo(x, canvas.height)
  }
  context.stroke()
}

function drawHorizontalLines(spacing, offsetY = 0) {
  context.beginPath()
  for (let y = canvas.centre.y + offsetY; y > 0; y -= spacing) {
    context.moveTo(0, y)
    context.lineTo(canvas.width, y)
  }
  for (let y = canvas.centre.y + spacing + offsetY; y < canvas.height; y += spacing) {
    context.moveTo(0, y)
    context.lineTo(canvas.width, y)
  }
  context.stroke()
}

function drawTriangularLines() {
  const equilateralTriangleBase = canvas.height / ROOT_3 / 2
  step.h = GRID_STEP * ROOT_3 / 2

  drawHorizontalLines(step.h * zoom)
  const spacing = step.w * zoom
  const offsetX = (canvas.centre.y - canvas.height / 2) * baseHeightRatio % spacing
  drawBackwardSlantedLines(equilateralTriangleBase, spacing, -offsetX)
  drawForwardSlantedLines(equilateralTriangleBase, spacing, offsetX)
}

function drawHexagonalLine() {
  const equilateralTriangleBase = canvas.height / ROOT_3 / 2
  const sideLength = (GRID_STEP / 2) * zoom
  step.w = sideLength * 2
  step.h = sideLength * ROOT_3

  const horizontalLineOffsetX = canvas.centre.x % (sideLength * 3)

  const offsetX = -sideLength / 2
  const offsetY = (canvas.centre.y - canvas.height / 2) % step.h
  const lineDash = [sideLength, sideLength * 2]

  context.beginPath()
  context.setLineDash(lineDash)
  context.lineDashOffset = sideLength / 2 - horizontalLineOffsetX
  drawHorizontalLines(step.h)
  context.stroke()

  context.beginPath()
  context.setLineDash(lineDash)
  context.lineDashOffset = sideLength * 2 - horizontalLineOffsetX
  drawHorizontalLines(step.h, step.h / 2)
  context.stroke()

  drawBackwardSlantedLines(equilateralTriangleBase, sideLength * 3, offsetX, offsetY, lineDash, sideLength)
  drawBackwardSlantedLines(equilateralTriangleBase, sideLength * 3, sideLength + offsetX, offsetY, lineDash, 0)
  drawBackwardSlantedLines(equilateralTriangleBase, sideLength * 3, sideLength * 2 + offsetX, offsetY, lineDash, sideLength * 2)

  drawForwardSlantedLines(equilateralTriangleBase, sideLength * 3, -offsetX, offsetY, lineDash, sideLength)
  drawForwardSlantedLines(equilateralTriangleBase, sideLength * 3, -(sideLength + offsetX), offsetY, lineDash, 0)
  drawForwardSlantedLines(equilateralTriangleBase, sideLength * 3, -(sideLength * 2 + offsetX), offsetY, lineDash, sideLength * 2)
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
