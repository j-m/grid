import Node from "../classes/Node.mjs"
import { canvas, context, zoom, centre, mouse } from "./world.mjs"
import { subscribe, hasMovedSinceDown, EVENT_TYPE } from "../events/mouse.mjs"
import { GRID_STEP } from "../settings/application.mjs"
import moveArrow from "./shapes/moveArrow.mjs"

export let hoveringOverNode = null
export let selectedNode = null

const NODE_RADIUS = GRID_STEP * 0.5
const NODE_OUTLINE_WIDTH = 5

let nodeArray = []

function isPointInCircle(pointX, pointY, circleX, circleY, circleRadius) {
  const distanceSquared = (pointX - circleX) * (pointX - circleX) + (pointY - circleY) * (pointY - circleY)
  return distanceSquared <= circleRadius * circleRadius
}

function isMouseInCircle(circleX, circleY, circleRadius) {
  return isPointInCircle(mouse.x, mouse.y, circleX, circleY, circleRadius)
}

function isPointInRect(pointX, pointY, rectX, rectY, rectSize) {
  return pointX >= rectX && pointX <= rectX + rectSize && pointY >= rectY && pointY <= rectY + rectSize
}

function isMouseInSquare(rectX, rectY, reactSize) {
  return isPointInRect(mouse.x, mouse.y, rectX, rectY, reactSize)
}

function isMouseInNode(node) {
  switch (node.shape) {
    case "circle":
      return isMouseInCircle((node.x + NODE_RADIUS) * zoom, (node.y + NODE_RADIUS) * zoom, NODE_RADIUS * zoom)
    case "square":
    default:
      return isMouseInSquare(node.x * zoom, node.y * zoom, NODE_RADIUS * 2 * zoom)
  }
}

function drawNode(node) {
  context.beginPath()
  switch (node.shape) {
    case "circle":
      context.arc((node.x + NODE_RADIUS) * zoom + centre.x, (node.y + NODE_RADIUS) * zoom + centre.y, NODE_RADIUS * zoom, 0, 2 * Math.PI, false)
      break
    case "square":
    default:
      context.rect(node.x * zoom + centre.x, node.y * zoom + centre.y, NODE_RADIUS * 2 * zoom, NODE_RADIUS * 2 * zoom)
      break
  }
  context.fillStyle = nodeIsHighlighted(node) ? 'white' : node.fill
  context.fill()
  context.lineWidth = NODE_OUTLINE_WIDTH * zoom
  context.strokeStyle = nodeIsHighlighted(node) ? 'black' : node.outline
  context.stroke()
}

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
  context.font = `${NODE_RADIUS * zoom}px Arial`
  context.textAlign = "center"
  nodeArray.forEach(node => {
    drawNode(node)
  })
}

function nodeIsHighlighted(node) {
  return node === hoveringOverNode
    || node === selectedNode
}

function snapNodePosition(x, y) {
  x = Math.floor(x / GRID_STEP) * GRID_STEP
  y = Math.floor(y / GRID_STEP) * GRID_STEP
  return [x, y]
}

function createNode() {
  if (!selectedNode && !hoveringOverNode && !hasMovedSinceDown) {
    const [x, y] = snapNodePosition(mouse.x, mouse.y)
    nodeArray.push(new Node(x, y))
  }
}

let hasMouseLeftNode = false
function whichNodeIsMouseHoveringOver() {
  hoveringOverNode = null
  nodeArray.forEach(node => {
    if (isMouseInNode(node) && !selectedNode) {
      canvas.style.cursor = 'pointer'
      hoveringOverNode = node
    }
  })
  if (!hasMouseLeftNode && !hoveringOverNode) {
    hasMouseLeftNode = true
  }
}

function selectNode() {
  if (hoveringOverNode && !hasMouseLeftNode && !selectedNode) {
    selectedNode = hoveringOverNode
  }
}

function deselectNode() {
  if (!hoveringOverNode) {
    selectedNode = null
  }
}

subscribe(EVENT_TYPE.UP_LEFT, createNode)
subscribe(EVENT_TYPE.UP_LEFT, deselectNode)
subscribe(EVENT_TYPE.MOVE, whichNodeIsMouseHoveringOver)
subscribe(EVENT_TYPE.MOVE, isHoveringOverAction)
subscribe(EVENT_TYPE.UP_LEFT, selectNode)
