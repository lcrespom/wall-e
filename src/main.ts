import { registerHotkey } from './hotkey'
import clipboard from 'clipboardy'
import robot from 'robotjs'

registerHotkey('V', ['LEFT ALT', 'LEFT CTRL'], () => {
    let clipboardTxt = clipboard.readSync()
    console.log('--- Pasting from clipboard ---')
    console.log(clipboardTxt)
    console.log('---')
    setTimeout(() => {
        robot.typeString(clipboardTxt)
    }, 250)
})
