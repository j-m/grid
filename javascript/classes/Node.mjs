import { GRID_STEP } from "../settings/application.mjs"
import { SHAPE } from "../settings/user.mjs"
import { context, zoom, centre, mouse } from "../draw/world.mjs"

const NODE_OUTLINE_WIDTH = 5
const NODE_RADIUS = GRID_STEP * 0.5

let id = 0

export function isPointInCircle(pointX, pointY, circleX, circleY, circleRadius) {
  const distanceSquared = (pointX - circleX) * (pointX - circleX) + (pointY - circleY) * (pointY - circleY)
  return distanceSquared <= circleRadius * circleRadius
}

export function isPointInRect(pointX, pointY, rectX, rectY, rectSize) {
  return pointX >= rectX && pointX <= rectX + rectSize && pointY >= rectY && pointY <= rectY + rectSize
}

export function isMouseInCircle(circleX, circleY, circleRadius) {
  return isPointInCircle(mouse.x, mouse.y, circleX, circleY, circleRadius)
}

export function isMouseInSquare(rectX, rectY, reactSize) {
  return isPointInRect(mouse.x, mouse.y, rectX, rectY, reactSize)
}

export default class Node {
  constructor(x, y) {
    this.id = id++
    this.x = x
    this.y = y
    this.fill = "black"
    this.outline = "black"
    this.highlighted = false
  }

  isMouseInside() {
    switch (SHAPE) {
      case "circle":
        return isMouseInCircle((this.x + NODE_RADIUS) * zoom, (this.y + NODE_RADIUS) * zoom, NODE_RADIUS * zoom)
      case "square":
      default:
        return isMouseInSquare(this.x * zoom, this.y * zoom, NODE_RADIUS * 2 * zoom)
    }
  }

  draw() {
    context.beginPath()
    switch (SHAPE) {
      case "circle":
        context.arc((this.x + NODE_RADIUS) * zoom + centre.x, (this.y + NODE_RADIUS) * zoom + centre.y, NODE_RADIUS * zoom, 0, 2 * Math.PI, false)
        break
      case "square":
      default:
        context.rect(this.x * zoom + centre.x, this.y * zoom + centre.y, NODE_RADIUS * 2 * zoom, NODE_RADIUS * 2 * zoom)
        break
    }
    context.fillStyle = this.highlighted ? 'white' : this.fill
    context.fill()
    context.lineWidth = NODE_OUTLINE_WIDTH * zoom
    context.strokeStyle = this.highlighted ? 'black' : this.outline
    context.stroke()
  }

}
