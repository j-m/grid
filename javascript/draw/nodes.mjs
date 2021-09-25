import Node, { isMouseInCircle } from "../classes/Node.mjs"
import { GRID_STEP } from "../settings/application.mjs"
import { canvas, context, zoom, mouse } from "./world.mjs"
import { subscribe, EVENT } from "../events/mouse.mjs"
import moveArrow from "./shapes/moveArrow.mjs"

let nodeArray = []

// eslint-disable-next-line no-unused-vars
function drawMove(x, y) {
  context.strokeStyle = "none"
  context.fillStyle = "rgba(0, 0, 0, 0.5)"
  context.lineWidth = 2 * zoom;
  context.beginPath();
  context.arc(x, y, 20 * zoom, 0, 2 * Math.PI);
  context.fill();

  x = x + 5 * zoom
  y = y + 7 * zoom
  const arrowClone = new Path2D(moveArrow)
  if (isMouseInCircle(x, y, 20 * zoom)) {
    canvas.style.cursor = 'pointer'
    context.fillStyle = "white"
  } else {
    context.strokeStyle = "none"
    context.fillStyle = "rgba(0, 0, 0, 0.5)"
  }
  context.setTransform(zoom, 0, 0, zoom, x, y)
  context.fill(arrowClone)
  context.setTransform(1, 0, 0, 1, 0, 0)
}

function isHoveringOverAction() {

}

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
subscribe(EVENT.MOUSE_MOVE, isHoveringOverAction)
subscribe(EVENT.MOUSE_UP_LEFT, selectNode)
