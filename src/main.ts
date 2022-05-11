import fs from 'node:fs'

import { registerHotkey } from './hotkey'
import clipboard from 'clipboardy'
import robot from 'robotjs'

function handlePaste() {
    let clipboardTxt = clipboard.readSync()
    console.log('--- Pasting from clipboard ---')
    console.log(clipboardTxt)
    console.log('---')
    typeText(clipboardTxt)
}

function typeText(txt: string) {
    setTimeout(() => {
        //TODO split \n into lines and type ENTER explicitly
        robot.typeString(txt)
    }, 250)
}

function readConfig() {
    try {
        let config = JSON.parse(fs.readFileSync('config.json', 'utf8'))
        for (let preset of config.presets) {
            registerHotkey(preset.key, preset.modifiers, () => typeText(preset.message))
        }
    } catch (e) {
        console.warn('Warning: config.json not found or invalid')
    }
}

function main() {
    robot.setKeyboardDelay(10)
    registerHotkey('V', ['LEFT ALT', 'LEFT CTRL'], handlePaste)
    readConfig()
}

main()
