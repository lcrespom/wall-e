import robot from 'robotjs'

import mouseHooks from 'mouse-hooks'
import { windowManager } from 'node-window-manager'

import { registerHotkey } from './hotkey'

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

function handleListWindows() {
    console.log('"macro": [')
    let windows = windowManager.getWindows()
    for (let w of windows) {
        let b = w.getBounds()
        let title = `"titleMatch": "${w.getTitle()}"`
        let bounds = `"x": ${b.x}, "y": ${b.y}, "w": ${b.width}, "h": ${b.height}`
        console.log(`    { "window": { ${title}, ${bounds} } }`)
    }
    console.log(']')
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
    registerHotkey({
        key: 'W',
        modifiers: ['LEFT ALT', 'LEFT CTRL'],
        callback: handleListWindows
    })
    //@ts-ignore (mouse-hooks is incorrectly typed)
    mouseHooks.default.on('mouse-up', handleMacroClick)
}
