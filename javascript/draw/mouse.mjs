import { context } from "../window.mjs"
import { x, y } from "../events/mouse.mjs"

export function draw() {
  context.beginPath()
  context.arc(x, y, 5, 0, 2 * Math.PI, false)
  context.fillStyle = 'blue'
  context.fill()
  context.lineWidth = 1
  context.strokeStyle = 'black'
  context.stroke()
}
