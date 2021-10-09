import { canvas, context } from "../window.mjs"
import userSettings from "../settings/user.mjs"

function markCentre() {
    context.beginPath()
    context.arc(
        canvas.centre.x < 0
            ? 0
            : canvas.centre.x > canvas.width
                ? canvas.width
                : canvas.centre.x,
        canvas.centre.y < 0
            ? 0
            : canvas.centre.y > canvas.height
                ? canvas.height
                : canvas.centre.y,
        5,
        0,
        2 * Math.PI,
        false
    )
    context.fillStyle = 'red'
    context.fill()
    context.lineWidth = 1
    context.strokeStyle = 'black'
    context.stroke()
}


export function draw() {
    if (userSettings.showCentre) {
        markCentre()
    }
}