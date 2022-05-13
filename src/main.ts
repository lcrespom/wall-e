import fs from 'node:fs'

import clipboard from 'clipboardy'
import robot from 'robotjs'
import { windowManager } from 'node-window-manager'

import { registerHotkey } from './hotkey'
import { registerMacroRecorder } from './macro'

const TYPE_INITIAL_WAIT = 500

function handlePaste() {
    let clipboardTxt = clipboard.readSync()
    typeText(clipboardTxt)
}

function splitAndFilter(str: string, ...separators: string[]): string[] {
    let parts = [str]
    for (let sep of separators) {
        let result = []
        for (let part of parts) {
            let splitStr = part.split(new RegExp(`(${sep})`)).filter(s => s.length > 0)
            result = result.concat(splitStr)
        }
        parts = result
    }
    return parts
}

function typeKey(k: string) {
    let chmap = {
        '\t': 'tab',
        '\n': 'enter',
        '\b': 'backspace'
    }
    let key = chmap[k]
    if (!key) return
    robot.keyTap(key)
}

function typeText(txt: string) {
    console.log('--- Pasting from clipboard ---')
    console.log(txt)
    console.log('---')
    let parts = splitAndFilter(txt, '\t', '\n', '\r')
    setTimeout(() => {
        for (let part of parts) {
            if (part.charCodeAt(0) < 32) typeKey(part)
            else robot.typeString(part)
        }
    }, TYPE_INITIAL_WAIT)
}

function mouseClick(click: MouseClick) {
    robot.moveMouse(click.x, click.y)
    robot.mouseClick(click.button || 'left', click.double)
}

async function runMacro(macro: Macro) {
    const sleep = t => new Promise(resolve => setTimeout(resolve, t))
    for (let step of macro) {
        if (step.text) typeText(step.text)
        if (step.click) mouseClick(step.click)
        if (step.wait) await sleep(step.wait * 1000)
    }
}

function matchWindowTitle(pattern: string): boolean {
    if (!pattern) return true
    let winTitle = windowManager.getActiveWindow().getTitle()
    return RegExp(pattern).test(winTitle)
}

function handleHotkey(hotkey: Hotkey) {
    if (!matchWindowTitle(hotkey.ifTitleMatches)) return
    if (hotkey.message) typeText(hotkey.message)
    else runMacro(hotkey.macro)
}

function readConfig() {
    try {
        let cfgPath = process.argv[2] || 'config.json'
        let config = JSON.parse(fs.readFileSync(cfgPath, 'utf8'))
        for (let preset of config.presets) {
            preset.callback = () => handleHotkey(preset)
            registerHotkey(preset)
        }
    } catch (e) {
        console.warn('Warning: config file not found or invalid')
    }
}

function main() {
    robot.setKeyboardDelay(10)
    registerHotkey({
        key: 'V',
        modifiers: ['LEFT ALT', 'LEFT CTRL'],
        callback: handlePaste
    })
    readConfig()
    registerMacroRecorder()
}

main()
