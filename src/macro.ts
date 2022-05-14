import robot from 'robotjs'

import { registerHotkey } from './hotkey'
import mouseHooks from 'mouse-hooks'

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

function handleMacroClick(evt) {
    if (!recording) return
    let { x, y } = robot.getMousePos()
    let now = new Date().getTime()
    if (lastTime) {
        let t = (now - lastTime) / 1000
        console.log(`    { "wait": ${t} },`)
    }
    lastTime = now
    let button = evt.button == 'mouse2' ? `, "button": "right"` : ''
    console.log(`    { "click": { "x": ${x}, "y": ${y}${button} } },`)
}

export function registerMacroRecorder() {
    registerHotkey({
        key: 'M',
        modifiers: ['LEFT ALT', 'LEFT CTRL'],
        callback: handleMacro
    })
    //@ts-ignore (mouse-hooks is incorrectly typed)
    mouseHooks.default.on('mouse-up', handleMacroClick)
}
