import { GlobalKeyboardListener } from 'node-global-key-listener'
import { IGlobalKeyEvent, IGlobalKeyDownMap } from 'node-global-key-listener'

type HotkeyCallback = () => void

type Hotkey = {
    key: string
    modifiers: string[]
    callback: HotkeyCallback
    alreadyPressed?: boolean
}

let hotkeys: Hotkey[] = []

function isHotkey(hotkey: Hotkey, key: IGlobalKeyEvent, down: IGlobalKeyDownMap) {
    if (key.name != hotkey.key) return false
    for (let modifier of hotkey.modifiers) {
        if (!down[modifier]) return false
    }
    if (key.state == 'UP') {
        hotkey.alreadyPressed = false
        return false
    }
    if (hotkey.alreadyPressed) return false
    hotkey.alreadyPressed = true
    return true
}

function checkHotkeys(key: IGlobalKeyEvent, down: IGlobalKeyDownMap) {
    for (let hotkey of hotkeys) {
        if (isHotkey(hotkey, key, down)) hotkey.callback()
    }
}

export function registerHotkey(key: string, modifiers: string[], callback: HotkeyCallback) {
    hotkeys.push({ key, modifiers, callback })
}

export function traceAllKeyEvents() {
    globalListener.addListener(function (e, down) {
        console.log(`${e.name} ${e.state == 'DOWN' ? 'DOWN' : 'UP  '} [${e.rawKey._nameRaw}]`)
    })
}

let globalListener = new GlobalKeyboardListener()
globalListener.addListener(checkHotkeys)
