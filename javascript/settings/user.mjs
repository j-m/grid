import { retrieve, update } from "./storage.mjs"

const defaultUserSettings = {
  invertScroll: false,
  showCentre: true,
  overwriteNodes: false,
  edgePan: false,
  blur: true,
  renderOnBlur: false,
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
const blur = document.getElementById("BLUR")
const renderOnBlur = document.getElementById("RENDER_ON_BLUR")

if (userSettings.blur === false) {
  document.getElementById("blur").classList.add('hidden')
}

invertScroll.checked = userSettings.invertScroll
showCentre.checked = userSettings.showCentre
overwriteNodes.checked = userSettings.overwriteNodes
edgePan.checked = userSettings.edgePan
blur.checked = userSettings.blur
renderOnBlur.checked = userSettings.renderOnBlur

invertScroll.addEventListener('change', () => change("invertScroll", invertScroll.checked), { passive: true })
showCentre.addEventListener('change', () => change("showCentre", showCentre.checked), { passive: true })
overwriteNodes.addEventListener('change', () => change("overwriteNodes", overwriteNodes.checked), { passive: true })
edgePan.addEventListener('change', () => change("edgePan", edgePan.checked), { passive: true })
blur.addEventListener('change', () => change("blur", blur.checked), { passive: true })
renderOnBlur.addEventListener('change', () => change("renderOnBlur", renderOnBlur.checked), { passive: true })

