import { context } from "../window.mjs"
import { x as mouseX, y as mouseY } from "../events/mouse.mjs"
import Node, { currentStyle, getNodePositionFromMouse } from "../classes/Node.mjs"

const previewNode = new Node(0, 0)

export function draw() {
  context.beginPath()
  context.arc(mouseX, mouseY, 5, 0, 2 * Math.PI, false)
  context.fillStyle = 'blue'
  context.fill()
  context.lineWidth = 1
  context.strokeStyle = 'black'
  context.stroke()
  const [x, y] = getNodePositionFromMouse()
  previewNode.x = x
  previewNode.y = y
  previewNode.style = currentStyle()
  previewNode.draw()
}
