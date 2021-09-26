export let SHAPE = "square"
export let FILL = "black"
export let SIZE = "100"
export let OUTLINE = "black"
export let THICKNESS = "0"

document.getElementById("SHAPE").addEventListener('change', () => { SHAPE = document.getElementById("SHAPE").value })
document.getElementById("FILL").addEventListener('change', () => { FILL = document.getElementById("FILL").value })
document.getElementById("SIZE").addEventListener('change', () => { SIZE = document.getElementById("SIZE").value })
document.getElementById("OUTLINE").addEventListener('change', () => { OUTLINE = document.getElementById("OUTLINE").value })
document.getElementById("THICKNESS").addEventListener('change', () => { THICKNESS = document.getElementById("THICKNESS").value })
