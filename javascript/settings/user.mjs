export let INVERT_SCROLL = false
export let SHOW_CENTRE = false
export let SHAPE = "square"

document.getElementById("INVERT_SCROLL").addEventListener('change', () => { INVERT_SCROLL = document.getElementById("INVERT_SCROLL").checked })
document.getElementById("SHOW_CENTRE").addEventListener('change', () => { SHOW_CENTRE = document.getElementById("SHOW_CENTRE").checked })
document.getElementById("SHAPE").addEventListener('change', () => { SHAPE = document.getElementById("SHAPE").value })

