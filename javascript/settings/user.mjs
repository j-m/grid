const defaultUserSettings = {
  invertScroll: false,
  showCentre: true,
  overwriteNodes: false
}
let userSettings = defaultUserSettings
export default userSettings

const data = localStorage.getItem('user')
function updateStoredValue() {
  localStorage.setItem("user", JSON.stringify(userSettings))
}
if (data === null) {
  updateStoredValue()
} else {
  userSettings = JSON.parse(data)
}
function change(key, value) {
  userSettings[key] = value
  updateStoredValue()
}

const invertScroll = document.getElementById("INVERT_SCROLL")
const showCentre = document.getElementById("SHOW_CENTRE")
const overwriteNodes = document.getElementById("OVERWRITE_NODES")

invertScroll.checked = userSettings.invertScroll
showCentre.checked = userSettings.showCentre
overwriteNodes.checked = userSettings.overwriteNodes

invertScroll.addEventListener('change', () => change("invertScroll", invertScroll.checked), { passive: true })
showCentre.addEventListener('change', () => change("showCentre", showCentre.checked), { passive: true })
overwriteNodes.addEventListener('change', () => change("overwriteNodes", overwriteNodes.checked), { passive: true })

