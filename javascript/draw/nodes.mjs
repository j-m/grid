import Node, { currentStyle } from "../classes/Node.mjs"
import { OVERWRITE_NODES } from "../settings/user.mjs"
import { mouse, zoom } from "./world.mjs"
import { step } from "./grid.mjs"
import { subscribe, EVENT } from "../events/mouse.mjs"
import { canvas } from "../window.mjs"

let nodeArray = []

export function draw() {
  const offset = step.w / 2 * zoom
  nodeArray.forEach(node => {
    if (node.absolute.x > -offset
      && node.absolute.x < canvas.width + offset
      && node.absolute.y > -offset
      && node.absolute.y < canvas.height + offset) {
      node.draw()
    }
  })
}

function snapNodePosition(x, y) {
  x = Math.floor(x / step.w) * step.w
  y = Math.floor(y / step.h) * step.h
  return [x, y]
}

export let drawing = false

function createNode() {
  if (!drawing) {
    return
  }
  const [x, y] = snapNodePosition(mouse.x, mouse.y)
  const index = nodeArray.findIndex(node => node.x === x && node.y === y)
  if (OVERWRITE_NODES === true && index !== -1) {
    nodeArray.splice(index, 1)
  }
  if (OVERWRITE_NODES === true || OVERWRITE_NODES === false && index === -1) {
    nodeArray.push(new Node(x, y))
  }
}

document.getElementById("CONVERT_ALL").onclick = () => { nodeArray.forEach(node => { node.style = currentStyle() }) }
document.getElementById("CLEAR_ALL").onclick = () => { nodeArray = [] }

subscribe(EVENT.MOUSE_MOVE, createNode)
subscribe(EVENT.MOUSE_DOWN_LEFT, () => { drawing = true })
subscribe(EVENT.MOUSE_UP_LEFT, () => { drawing = false })
