import { GRID_STEP } from "../settings/application.mjs"
import { SHAPE, FILL, SIZE, OUTLINE, THICKNESS } from "../settings/style.mjs"
import { canvas, context } from "../window.mjs"
import { zoom } from "../draw/world.mjs"

export function currentStyle() {
  return {
    shape: SHAPE,
    fill: FILL,
    size: GRID_STEP * 0.5 * SIZE / 100,
    outline: OUTLINE,
    thickness: THICKNESS
  }
}

export default class Node {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.style = currentStyle()
  }

  get absolute() {
    return {
      x: (this.x + this.style.size) * zoom + canvas.centre.x,
      y: (this.y + this.style.size) * zoom + canvas.centre.y,
      size: this.style.size * zoom
    }
  }

  draw() {
    let { x, y, size } = this.absolute
    const offset = GRID_STEP / 2 * zoom - size
    x += offset
    y += offset
    context.beginPath()
    switch (this.style.shape) {
      case "circle":
        context.arc(x, y, size, 0, 2 * Math.PI, false)
        break
      case "triangle":
        context.moveTo(x - size, y + size)
        context.lineTo(x + size, y + size)
        context.lineTo(x, y - size)
        break
      case "square":
      default:
        context.rect(x - size, y - size, size * 2, size * 2)
        break
    }
    context.closePath()
    context.fillStyle = this.style.fill
    context.fill()
    if (this.style.thickness > 0) {
      context.lineWidth = this.style.thickness * zoom
      context.strokeStyle = this.style.outline
      context.stroke()
    }
  }

}
