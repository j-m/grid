import Node, { currentStyle } from "../classes/Node.mjs"
import { GRID_STEP } from "../settings/application.mjs"
import { mouse, zoom } from "./world.mjs"
import { subscribe, EVENT } from "../events/mouse.mjs"
import { canvas } from "../window.mjs"

let nodeArray = []

export function draw() {
  const offset = GRID_STEP / 2 * zoom
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
  x = Math.floor(x / GRID_STEP) * GRID_STEP
  y = Math.floor(y / GRID_STEP) * GRID_STEP
  return [x, y]
}

export let drawing = false

function createNode() {
  if (!drawing) {
    return
  }
  const [x, y] = snapNodePosition(mouse.x, mouse.y)
  if (!nodeArray.some(node => node.x === x && node.y === y)) {
    nodeArray.push(new Node(x, y))
  }
}

document.getElementById("CONVERT_ALL").onclick = () => { nodeArray.forEach(node => { node.style = currentStyle() }) }
document.getElementById("CLEAR_ALL").onclick = () => { nodeArray = [] }

subscribe(EVENT.MOUSE_MOVE, createNode)
subscribe(EVENT.MOUSE_DOWN_LEFT, () => { drawing = true })
subscribe(EVENT.MOUSE_UP_LEFT, () => { drawing = false })
