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


Currently it supports two features:

1. Pasting the clipboard content in places where it's disabled, e.g. in some
password fields or remote desktops, by capturing Ctrl+Alt+V and typing the
content of the clipboard one key at a time.

2. Typing predefined text and keys based on a configuration file. See the file
   `config.json` for an example of configuration specifying several shortcuts
   and corresponding text to be typed.

The default configuration file is `config.json` but a different one can be
specified in the command line. The tool is run using the `npm start` command.