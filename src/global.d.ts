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
    callback?: HotkeyCallback // Not used in config
    message?: string
    repeatOK?: boolean
    triggerOnKeyUp?: boolean
    ifTitleMatches?: string
    alreadyPressed?: boolean // Used in runtime
}
