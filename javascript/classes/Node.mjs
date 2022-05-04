import styleSettings from "../settings/style.mjs"
import { canvas, context } from "../window.mjs"
import { mouse, zoom } from "../draw/world.mjs"
import { step } from "../draw/grid.mjs"

export function getNodePositionFromMouse() {
  let x = Math.floor(mouse.x / step.w)
  let y = Math.floor(mouse.y / step.h)

  switch (styleSettings.grid) {
    case "triangle":
      x = Math.floor(mouse.x * 2 / step.w)
  }

  return [x, y]
}

export function currentStyle() {
  return {
    shape: styleSettings.shape,
    fill: styleSettings.fill,
    size: styleSettings.size / 100,
    outline: styleSettings.outline,
    thickness: styleSettings.thickness / 100
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
      x: (this.x * step.w * (styleSettings.grid === "triangle" ? 0.5 : 1) + step.w * 0.5 * this.style.size) * zoom + canvas.centre.x - borderWidth / 2,
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
