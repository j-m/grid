export let INVERT_SCROLL = false
export let SHOW_CENTRE = false

document.getElementById("INVERT_SCROLL").addEventListener('change', () => { INVERT_SCROLL = document.getElementById("INVERT_SCROLL").checked })
document.getElementById("SHOW_CENTRE").addEventListener('change', () => { SHOW_CENTRE = document.getElementById("SHOW_CENTRE").checked })

