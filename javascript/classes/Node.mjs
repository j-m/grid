import { GRID_STEP } from "../settings/application.mjs"
import { SHAPE } from "../settings/user.mjs"
import { canvas, context } from "../window.mjs"
import { zoom } from "../draw/world.mjs"
import { x as mouseX, y as mouseY } from "../events/mouse.mjs"

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
  return isPointInCircle(mouseX, mouseY, circleX, circleY, circleRadius)
}

export function isMouseInSquare(rectX, rectY, reactSize) {
  return isPointInRect(mouseX, mouseY, rectX, rectY, reactSize)
}

export default class Node {
  constructor(x, y) {
    this.id = id++
    this.x = x
    this.y = y
    this.fill = "black"
    this.outline = "black"
    this.isMouseHovering = false
    this.isSelected = false
  }

  get absolute() {
    switch (SHAPE) {
      case "circle":
        return { x: (this.x + NODE_RADIUS) * zoom + canvas.centre.x, y: (this.y + NODE_RADIUS) * zoom + canvas.centre.y, size: NODE_RADIUS * zoom }
      case "square":
      default:
        return { x: this.x * zoom + canvas.centre.x, y: this.y * zoom + canvas.centre.y, size: NODE_RADIUS * zoom * 2 }
    }
  }

  isMouseInside() {
    const bounds = this.absolute
    switch (SHAPE) {
      case "circle":
        return isMouseInCircle(bounds.x, bounds.y, bounds.size)
      case "square":
      default:
        return isMouseInSquare(bounds.x, bounds.y, bounds.size)
    }
  }

  draw() {
    context.beginPath()
    const bounds = this.absolute
    switch (SHAPE) {
      case "circle":
        context.arc(bounds.x, bounds.y, bounds.size, 0, 2 * Math.PI, false)
        break
      case "square":
      default:
        context.rect(bounds.x, bounds.y, bounds.size, bounds.size)
        break
    }
    context.fillStyle = this.isMouseHovering || this.isSelected ? 'white' : this.fill
    context.fill()
    context.lineWidth = NODE_OUTLINE_WIDTH * zoom
    context.strokeStyle = this.isMouseHovering || this.isSelected ? 'black' : this.outline
    context.stroke()
  }

}
