export let GRID = "square"
export let SHAPE = "square"
export let FILL = "#000000"
export let SIZE = "100"
export let OUTLINE = "#000000"
export let THICKNESS = "0"

document.getElementById("GRID").addEventListener('change', () => { GRID = document.getElementById("GRID").value }, { passive: true })
document.getElementById("SHAPE").addEventListener('change', () => { SHAPE = document.getElementById("SHAPE").value }, { passive: true })
document.getElementById("FILL").addEventListener('change', () => { FILL = document.getElementById("FILL").value }, { passive: true })
document.getElementById("SIZE").addEventListener('change', () => { SIZE = document.getElementById("SIZE").value }, { passive: true })
document.getElementById("OUTLINE").addEventListener('change', () => { OUTLINE = document.getElementById("OUTLINE").value }, { passive: true })
document.getElementById("THICKNESS").addEventListener('change', () => { THICKNESS = document.getElementById("THICKNESS").value }, { passive: true })
