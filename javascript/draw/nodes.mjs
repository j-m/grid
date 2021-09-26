import Node from "../classes/Node.mjs"
import { GRID_STEP } from "../settings/application.mjs"
import { mouse } from "./world.mjs"
import { canvas } from "../window.mjs"
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

function createNode() {
  const [x, y] = snapNodePosition(mouse.x, mouse.y)
  if (!nodeArray.some(node => node.x === x && node.y === y)) {
    nodeArray.push(new Node(x, y))
  }
}

function whichNodeIsMouseHoveringOver() {
  nodeArray.forEach(node => {
    node.isMouseHovering = node.isMouseInside()
    if (node.isMouseHovering) {
      canvas.style.cursor = 'pointer'
    }
  })
}

function selectNode() {
  nodeArray.forEach(node => {
    node.isSelected = node.isMouseHovering
  })
}

function deselectNode() {
  nodeArray.forEach(node => {
    node.isSelected = false
  })
}

document.getElementById("CLEAR_ALL").onclick = () => { nodeArray = [] }

subscribe(EVENT.MOUSE_UP_LEFT, createNode)
subscribe(EVENT.MOUSE_UP_LEFT, deselectNode)
subscribe(EVENT.MOUSE_MOVE, whichNodeIsMouseHoveringOver)
subscribe(EVENT.MOUSE_UP_LEFT, selectNode)
