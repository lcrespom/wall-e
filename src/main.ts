import { registerHotkey } from './hotkey'
import clipboard from 'clipboardy'

registerHotkey('V', ['LEFT ALT', 'LEFT CTRL'], () => {
    console.log('--- Pasting from clipboard ---')
    console.log(clipboard.readSync())
    console.log('---')
})
