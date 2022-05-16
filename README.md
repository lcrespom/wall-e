# Wall-e

A tool to capture global keyboard shortcuts and perform some predefined tasks.
It is a small desktop automation tool, hence its name.

To fulfill its task, it uses the following node packages:
- [node-global-key-listener](https://github.com/LaunchMenu/node-global-key-listener):
    to capture global keyboard shortcuts, idependently on which window has the
    focus.
- [clipboardy](https://github.com/sindresorhus/clipboardy): to read the
  clipboard contents
- [robotjs](https://github.com/octalmage/robotjs): to simulate keypress events
- [node-window-manager](https://github.com/sentialx/node-window-manager): to
  read the title of the active window


## Supported features

1. Pasting the clipboard content in places where it's disabled, e.g. in some
   password fields or remote desktops, by capturing Ctrl+Alt+V and typing the
   content of the clipboard one key at a time.

2. Typing predefined text and performing mouse clicks based on a configuration
   file. See the file `config.json` for an example of configuration specifying
   several shortcuts and corresponding actions.

3. Macro recording mode, capturing mouse clicks. The macro steps are displayed
   on the console and can be copied to the configuration file. Type Ctrl+Alt+M
   to start recording, and type it again to stop.

4. Window positioning. Type Ctrl+Alt+W to get a list of all windows, then select
   and adapt the windows to place in the configuration file as macro steps.

The default configuration file is `config.json` but a different one can be
specified in the command line. The tool is run using the `npm start` command.


## Next
- Relative % for window position and size
- Better macro recording: capture keyboard interaction.
- Ability to support mouse coordinates relative to the active window When
  performing mouse clicks.
    - Notice: `node-window-manager` applies scale factor... twice
