import styleSettings from "../settings/style.mjs"
import { canvas, context } from "../window.mjs"
import { mouse, zoom } from "../draw/world.mjs"
import { step } from "../draw/grid.mjs"

const MULTIPLIERS = {
  X: {
    "triangle": 0.5,
    "hexagon": 0.75,
  },
  Y: {
    "triangle": 1,
    "hexagon": 1,
  },
  W: {
    "triangle": 0.5,
    "square": 0.5,
    "hexagon": 0.5,
  },
  H: {
    "hexagon": 0.5,
    "square": 0.5,
    "triangle": 0.5,
  },
}

export function getNodePositionFromMouse() {
  return [Math.floor(mouse.x * zoom / (MULTIPLIERS.X[styleSettings.grid] || 1) / step.w), Math.floor(mouse.y * zoom / step.h)]
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
    const borderWidth = this.style.thickness * minStep
    return {
      x: (this.x * step.w * (MULTIPLIERS.X[styleSettings.grid] || 1) + step.w * this.style.size * (MULTIPLIERS.W[styleSettings.grid] || 1)) + canvas.centre.x - borderWidth / 2,
      y: (this.y * step.h * (MULTIPLIERS.Y[styleSettings.grid] || 1) + step.h * this.style.size * (MULTIPLIERS.H[styleSettings.grid] || 1)) + canvas.centre.y - borderWidth / 2,
      w: this.style.size * (MULTIPLIERS.W[styleSettings.grid] || 1) * step.w - borderWidth / 2,
      h: this.style.size * (MULTIPLIERS.H[styleSettings.grid] || 1) * step.h - borderWidth / 2,
      borderWidth
    }
  }

  draw() {
    let { x, y, w, h, borderWidth } = this.absolute
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
        y -= Math.abs(this.x) % 2 ? h * 1 : 0
        x -= w
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
      context.lineWidth = borderWidth
      context.strokeStyle = this.style.outline
      context.stroke()
    }

    if (zoom > 1) {
      context.fillStyle = "black"
      context.textBaseline = "middle";
      context.textAlign = "center";
      context.fillText(this.x + "." + this.y, x, y)
    }
  }

}
