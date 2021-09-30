import { retrieve, update } from "./storage.mjs"

const defaultStyleSettings = {
  grid: "triangle",
  shape: "triangle",
  fill: "#000000",
  size: "100",
  outline: "#000000",
  thickness: "0"
}

const styleSettings = retrieve("style", defaultStyleSettings)
export default styleSettings
function change(key, value) {
  styleSettings[key] = value
  update("style", styleSettings)
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
