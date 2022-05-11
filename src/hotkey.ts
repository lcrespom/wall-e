import { GlobalKeyboardListener } from 'node-global-key-listener'
import { IGlobalKeyEvent, IGlobalKeyDownMap } from 'node-global-key-listener'

type HotkeyCallback = () => void

type Modifier =
    | 'LEFT META'
    | 'RIGHT META'
    | 'LEFT CTRL'
    | 'RIGHT CTRL'
    | 'LEFT ALT'
    | 'RIGHT ALT'
    | 'LEFT SHIFT'
    | 'RIGHT SHIFT'
    | 'CAPS LOCK'
    | 'NUM LOCK'
    | 'SCROLL LOCK'
    | 'FN'

type Hotkey = {
    key: string
    modifiers: Modifier[]
    callback: HotkeyCallback
    repeatOK?: boolean
    triggerOnKeyUp?: boolean
    alreadyPressed?: boolean
}

let hotkeys: Hotkey[] = []
let pendingCallbacks: HotkeyCallback[] = []

function isHotkey(hotkey: Hotkey, key: IGlobalKeyEvent, down: IGlobalKeyDownMap) {
    if (key.name != hotkey.key) return false
    for (let modifier of hotkey.modifiers) {
        if (!down[modifier]) return false
    }
    if (key.state == 'UP') {
        if (hotkey.triggerOnKeyUp) {
            pendingCallbacks.push(hotkey.callback)
            return false
        }
        hotkey.alreadyPressed = false
        return false
    }
    if (hotkey.triggerOnKeyUp) return false
    if (!hotkey.repeatOK && hotkey.alreadyPressed) return false
    hotkey.alreadyPressed = true
    return true
}

function checkHotkeys(key: IGlobalKeyEvent, down: IGlobalKeyDownMap) {
    //TODO check if all keys are up, run pending callbacks if so
    for (let hotkey of hotkeys) {
        if (isHotkey(hotkey, key, down)) hotkey.callback()
    }
}

export function registerHotkey(hotkey: Hotkey) {
    if (!Array.isArray(hotkey.modifiers)) hotkey.modifiers = [hotkey.modifiers]
    hotkeys.push(hotkey)
}

export function traceAllKeyEvents() {
    globalListener.addListener(function (e, down) {
        console.log(`${e.name} ${e.state == 'DOWN' ? 'DOWN' : 'UP  '} [${e.rawKey._nameRaw}]`)
    })
}

let globalListener = new GlobalKeyboardListener()
globalListener.addListener(checkHotkeys)

traceAllKeyEvents()
