# Wall-e

Currently Wall-e solves the very specific problem of supporting clipboard paste in places where
it's disabled, e.g. in some password fields or remote desktops.

To do so, it globally listens to Ctrl+Alt+V and then types the content of the clipboard one key
at a time.

The idea is to extend it to do other desktop automation tasks, hence its name.

To fulfill its task, it uses the following node packages:
- [node-global-keyl-listener](https://github.com/LaunchMenu/node-global-key-listener):
    to capture global keyboard shortcuts, idependently on which window has the focus.
- [clipboardy](https://github.com/sindresorhus/clipboardy): to read the clipboard contents
- [robotjs](https://github.com/octalmage/robotjs): to simulate keypress events
