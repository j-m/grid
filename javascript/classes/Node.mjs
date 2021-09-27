import { SHAPE, FILL, GRID, SIZE, OUTLINE, THICKNESS } from "../settings/style.mjs"
import { canvas, context } from "../window.mjs"
import { zoom } from "../draw/world.mjs"
import { step } from "../draw/grid.mjs"

export function currentStyle() {
  return {
    shape: SHAPE,
    fill: FILL,
    size: SIZE / 100,
    outline: OUTLINE,
    thickness: THICKNESS / 100
  }
}

export default class Node {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.style = currentStyle()
  }

  get absolute() {
    const minStep = step.w < step.h ? step.w : step.h
    const borderWidth = this.style.thickness * minStep * zoom
    return {
      x: (this.x * step.w * (GRID === "square" ? 1 : 0.5) + step.w * 0.5 * this.style.size) * zoom + canvas.centre.x - borderWidth / 2,
      y: (this.y * step.h + step.h * 0.5 * this.style.size) * zoom + canvas.centre.y - borderWidth / 2,
      w: this.style.size * zoom * step.w * 0.5 - borderWidth / 2,
      h: this.style.size * zoom * step.h * 0.5 - borderWidth / 2
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
        if (Math.abs(this.y) % 2 === 0 && Math.abs(this.x) % 2 === 0
          || Math.abs(this.y) % 2 === 1 && Math.abs(this.x) % 2 === 1) {
          context.moveTo(x - w, y - h)
          context.lineTo(x + w, y - h)
          context.lineTo(x, y + h)
        } else {
          context.moveTo(x - w, y + h)
          context.lineTo(x + w, y + h)
          context.lineTo(x, y - h)
        }
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
      const minStep = step.w < step.h ? step.w : step.h
      const borderWidth = this.style.thickness * minStep * zoom
      context.lineWidth = borderWidth
      context.strokeStyle = this.style.outline
      context.stroke()
    }
  }

}
