import { SHAPE, FILL, SIZE, OUTLINE, THICKNESS } from "../settings/style.mjs"
import { canvas, context } from "../window.mjs"
import { zoom } from "../draw/world.mjs"
import { step } from "../draw/grid.mjs"

export function currentStyle() {
  return {
    shape: SHAPE,
    fill: FILL,
    size: SIZE / 100,
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
      x: (this.x + step.w * 0.5 * this.style.size) * zoom + canvas.centre.x,
      y: (this.y + step.h * 0.5 * this.style.size) * zoom + canvas.centre.y,
      w: this.style.size * zoom * step.w * 0.5,
      h: this.style.size * zoom * step.h * 0.5
    }
  }

  draw() {
    let { x, y, w, h } = this.absolute
    x += step.w / 2 * zoom - w
    y += step.h / 2 * zoom - h
    context.beginPath()
    switch (this.style.shape) {
      case "circle":
        context.ellipse(x, y, w, h, 0, 2 * Math.PI, false)
        break
      case "triangle":
        context.moveTo(x - w, y + h)
        context.lineTo(x + w, y + h)
        context.lineTo(x, y - h)
        break
      case "hexagon":
        context.moveTo(x - w, y)
        context.lineTo(x - w / 2, y - h)
        context.lineTo(x + w / 2, y - h)
        context.lineTo(x + w, y)
        context.lineTo(x + w / 2, y + h)
        context.lineTo(x - w / 2, y + h)
        break
      case "square":
      default:
        context.rect(x - w, y - h, w * 2, h * 2)
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
