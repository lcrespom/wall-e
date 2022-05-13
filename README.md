# Wall-e

A tool to capture global keyboard shortcuts and perform some predefined tasks.
It is a small desktop automation tool, hence its name.

To fulfill its task, it uses the following node packages:
- [node-global-keyl-listener](https://github.com/LaunchMenu/node-global-key-listener):
    to capture global keyboard shortcuts, idependently on which window has the
    focus.
- [clipboardy](https://github.com/sindresorhus/clipboardy): to read the
  clipboard contents
- [robotjs](https://github.com/octalmage/robotjs): to simulate keypress events


Supported features:

1. Pasting the clipboard content in places where it's disabled, e.g. in some
password fields or remote desktops, by capturing Ctrl+Alt+V and typing the
content of the clipboard one key at a time.

2. Typing predefined text and performing mouse clicks based on a configuration
   file. See the file `config.json` for an example of configuration specifying
   several shortcuts and corresponding actions.

3. Macro recording mode, to capture mouse position every time the right Ctrl key
   is pressed. The macro steps are displayed on the console and can be copied to
   the configuration file.

The default configuration file is `config.json` but a different one can be
specified in the command line. The tool is run using the `npm start` command.


## Next
- Better macro recording: capture keyboard interaction.
- Ability to support mouse coordinates relative to the active window When
  performing mouse clicks.
