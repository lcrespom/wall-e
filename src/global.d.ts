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

type MouseClick = {
    x?: number
    y?: number
    wx?: number
    wy?: number
    button?: string
    double?: boolean
}
type MacroStep = {
    text?: string
    click?: MouseClick
    wait?: number
}
type Macro = [MacroStep]

type Hotkey = {
    key: string
    modifiers: Modifier[]
    callback?: HotkeyCallback // Not used in config
    message?: string
    macro?: Macro
    repeatOK?: boolean
    triggerOnKeyUp?: boolean
    ifTitleMatches?: string
    alreadyPressed?: boolean // Used in runtime
}
