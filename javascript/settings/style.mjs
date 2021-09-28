const defaultStyleSettings = {
  grid: "triangle",
  shape: "triangle",
  fill: "#000000",
  size: "100",
  outline: "#000000",
  thickness: "0"
}
let styleSettings = defaultStyleSettings
export default styleSettings

const data = localStorage.getItem('style')
function updateStoredValue() {
  localStorage.setItem("style", JSON.stringify(styleSettings))
}
if (data === null) {
  updateStoredValue()
} else {
  styleSettings = JSON.parse(data)
}
function change(key, value) {
  styleSettings[key] = value
  updateStoredValue()
}

const grid = document.getElementById("GRID")
const shape = document.getElementById("SHAPE")
const fill = document.getElementById("FILL")
const size = document.getElementById("SIZE")
const outline = document.getElementById("OUTLINE")
const thickness = document.getElementById("THICKNESS")

grid.value = styleSettings.grid
shape.value = styleSettings.shape
fill.value = styleSettings.fill
size.value = styleSettings.size
outline.value = styleSettings.outline
thickness.value = styleSettings.thickness

grid.addEventListener('change', () => change("grid", grid.value), { passive: true })
shape.addEventListener('change', () => change("shape", shape.value), { passive: true })
fill.addEventListener('change', () => change("fill", fill.value), { passive: true })
size.addEventListener('change', () => change("size", size.value), { passive: true })
outline.addEventListener('change', () => change("outline", outline.value), { passive: true })
thickness.addEventListener('change', () => change("thickness", thickness.value), { passive: true })
