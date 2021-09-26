export let INVERT_SCROLL = false
export let SHOW_CENTRE = false
export let OVERWRITE_NODES = false

document.getElementById("INVERT_SCROLL").addEventListener('change', () => { INVERT_SCROLL = document.getElementById("INVERT_SCROLL").checked }, { passive: true })
document.getElementById("SHOW_CENTRE").addEventListener('change', () => { SHOW_CENTRE = document.getElementById("SHOW_CENTRE").checked }, { passive: true })
document.getElementById("OVERWRITE_NODES").addEventListener('change', () => { OVERWRITE_NODES = document.getElementById("OVERWRITE_NODES").checked }, { passive: true })

