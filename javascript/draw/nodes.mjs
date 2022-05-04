import Node, { currentStyle, getNodePositionFromMouse } from "../classes/Node.mjs"
import userSettings from "../settings/user.mjs"
import { zoom } from "./world.mjs"
import { step } from "./grid.mjs"
import { subscribe, EVENT } from "../events/manager.mjs"
import { canvas } from "../window.mjs"

let nodes = {}
export let drawing = false

export function draw() {
  const offset = step.w / 2 * zoom
  Object.values(nodes).forEach(node => {
    if (node.absolute.x > -offset
      && node.absolute.x < canvas.width + offset
      && node.absolute.y > -offset
      && node.absolute.y < canvas.height + offset) {
      node.draw()
    }
  })
}

function createNode() {
  if (!drawing) {
    return
  }
  const [x, y] = getNodePositionFromMouse()
  if (userSettings.overwriteNodes === true
    || userSettings.overwriteNodes === false && !nodes[`${x}.${y}`]) {
    nodes[`${x}.${y}`] = new Node(x, y)
  }
}

document.getElementById("CONVERT_ALL").addEventListener("click", () => { Object.values(nodes).forEach(node => { node.style = currentStyle() }) }, { passive: true })
document.getElementById("CLEAR_ALL").addEventListener("click", () => { nodes = {} }, { passive: true })

subscribe(EVENT.MOUSE_MOVE, createNode)
subscribe(EVENT.MOUSE_DOWN_LEFT, () => { drawing = true })
subscribe(EVENT.MOUSE_UP_LEFT, () => { drawing = false })
