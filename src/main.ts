import fs from 'node:fs'

import { registerHotkey } from './hotkey'
import clipboard from 'clipboardy'
import robot from 'robotjs'

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
    console.dir(parts)
    setTimeout(() => {
        for (let part of parts) {
            if (part.charCodeAt(0) < 32) typeKey(part)
            else robot.typeString(txt)
        }
    }, TYPE_INITIAL_WAIT)
}

function readConfig() {
    try {
        let config = JSON.parse(fs.readFileSync('config.json', 'utf8'))
        for (let preset of config.presets) {
            preset.callback = () => typeText(preset.message)
            registerHotkey(preset)
        }
    } catch (e) {
        console.warn('Warning: config.json not found or invalid')
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
}

main()
