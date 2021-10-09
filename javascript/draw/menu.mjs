const menu = document.getElementById("sidebar")
import { canvas, context } from "../window.mjs"

function drawRoundedRect(x, y, width, height, radius) {
  context.moveTo(x + radius, y)
  context.lineTo(x + width - radius, y)
  context.quadraticCurveTo(x + width, y, x + width, y + radius)
  context.lineTo(x + width, y + height - radius)
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  context.lineTo(x + radius, y + height)
  context.quadraticCurveTo(x, y + height, x, y + height - radius)
  context.lineTo(x, y + radius)
  context.quadraticCurveTo(x, y, x + radius, y)
}

function drawHamburger() {
  context.fillStyle = "#efefef"
  context.strokeStyle = "#767676"
  context.lineWidth = "1"
  context.beginPath()
  drawRoundedRect(canvas.width - 50 - 5, 5, 50, 50, 3)
  drawRoundedRect(canvas.width - 50 - 5, 60, 50, 50, 3)
  drawRoundedRect(canvas.width - 50 - 5, 115, 50, 50, 3)
  drawRoundedRect(canvas.width - 50 - 5, 170, 50, 50, 3)
  context.fill()
  context.stroke()
}

export function draw() {
  drawHamburger()
}
