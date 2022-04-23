import { retrieve, update } from "./storage.mjs"

const defaultUserSettings = {
  invertScroll: false,
  showCentre: true,
  overwriteNodes: false,
  edgePan: false
}

const userSettings = { ...defaultUserSettings, ...retrieve("user") }
export default userSettings
function change(key, value) {
  userSettings[key] = value
  update("user", userSettings)
}

const invertScroll = document.getElementById("INVERT_SCROLL")
const showCentre = document.getElementById("SHOW_CENTRE")
const overwriteNodes = document.getElementById("OVERWRITE_NODES")
const edgePan = document.getElementById("EDGE_PAN")

invertScroll.checked = userSettings.invertScroll
showCentre.checked = userSettings.showCentre
overwriteNodes.checked = userSettings.overwriteNodes
edgePan.checked = userSettings.edgePan

invertScroll.addEventListener('change', () => change("invertScroll", invertScroll.checked), { passive: true })
showCentre.addEventListener('change', () => change("showCentre", showCentre.checked), { passive: true })
overwriteNodes.addEventListener('change', () => change("overwriteNodes", overwriteNodes.checked), { passive: true })
edgePan.addEventListener('change', () => change("edgePan", edgePan.checked), { passive: true })

