import { GlobalKeyboardListener } from 'node-global-key-listener'

let altFpressed = false
function checkHotkeys(e, down) {
    if (!(e.name == 'F' && (down['LEFT ALT'] || down['RIGHT ALT']))) return
    if (e.state == 'UP') altFpressed = false
    else if (e.state == 'DOWN') {
        if (altFpressed) return
        altFpressed = true
        console.log('Alt+F')
        return true
    }
}

export function registerHotkey(key: string, modifiers: string[], cb: () => void) {}

new GlobalKeyboardListener().addListener(checkHotkeys)
