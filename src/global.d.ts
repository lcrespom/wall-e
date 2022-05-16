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
    button?: string
    double?: boolean
}

type WindowPosition = {
    titleMatch?: string
    pathMatch?: string
    x?: number
    y?: number
    w?: number
    h?: number
}

type TextStep = { text: string }

type ClickStep = { click: MouseClick }

type WaitStep = { wait: number }

type WindowStep = { window: WindowPosition }

type MacroStep = TextStep | ClickStep | WaitStep | WindowStep

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
