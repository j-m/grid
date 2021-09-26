import Node from "../classes/Node.mjs"
import { GRID_STEP } from "../settings/application.mjs"
import { mouse } from "./world.mjs"
import { subscribe, EVENT } from "../events/mouse.mjs"

let nodeArray = []

export function draw() {
  nodeArray.forEach(node => {
    node.draw()
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

document.getElementById("CLEAR_ALL").onclick = () => { nodeArray = [] }

subscribe(EVENT.MOUSE_MOVE, createNode)
subscribe(EVENT.MOUSE_DOWN_LEFT, () => { drawing = true })
subscribe(EVENT.MOUSE_UP_LEFT, () => { drawing = false })
