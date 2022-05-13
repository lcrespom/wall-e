import robot from 'robotjs'

import { addBareListener, registerHotkey } from './hotkey'

let recording = false
let lastTime = 0

function handleMacro() {
    recording = !recording
    if (recording) {
        console.log('"macro": [')
    } else {
        console.log(']')
    }
}

function handleMacroClick(e) {
    if (!recording) return
    if (e.name != 'RIGHT CTRL' || e.state != 'UP') return
    let { x, y } = robot.getMousePos()
    let now = new Date().getTime()
    if (lastTime) {
        let t = (now - lastTime) / 1000
        console.log(`    { "wait": ${t} },`)
    }
    lastTime = now
    console.log(`    { "click": { "x": ${x}, "y": ${y}} },`)
}

export function registerMacroRecorder() {
    registerHotkey({
        key: 'M',
        modifiers: ['LEFT ALT', 'LEFT CTRL'],
        callback: handleMacro
    })
    addBareListener(handleMacroClick)
}
