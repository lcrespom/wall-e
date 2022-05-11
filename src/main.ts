import fs from 'node:fs'

import { registerHotkey } from './hotkey'
import clipboard from 'clipboardy'
import robot from 'robotjs'

const TYPE_INITIAL_WAIT = 500

function handlePaste() {
    let clipboardTxt = clipboard.readSync()
    typeText(clipboardTxt)
}

function typeText(txt: string) {
    console.log('--- Pasting from clipboard ---')
    console.log(txt)
    console.log('---')
    setTimeout(() => {
        //TODO split \n into lines and type ENTER explicitly
        robot.typeString(txt)
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
