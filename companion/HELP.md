# GrandMA3 Connection

Connection to control your grandMA3 Software via OSC.

# Installation

1. In configuration tab specify the "Console IP", "Console OSC Port" and "Prefix" you want to send on.
2. Configure OSC (Settings -> In&Out) with the same settings as set in the configuration tab. (Same IP, Port & Prefix). Make sure to check "Receive Command" and "Receive", if not checked, the plugin will not work. [Tutorial](https://help2.malighting.com/Page/grandMA3/remote_inputs_osc/en/1.9)
3. Create a button, select action and start!

# Example configuration

I do provide a custom-made Companion Layout for a StreamDeck XL, that is fully compatible with this plugin. You can download it from [here](https://github.com/bitfocus/companion-module-malighting-grandma3/tree/main/configuration-examples).
It comes with a LUA plugin, that you can import into your grandMA3 onPC Software, that automatically creates an OSC entry, and the corresponding Quickeys needed for my custom Companion Layout.

It also comes with a page named "Numpad" that allows you to use it with the Software VICREO-Listener which can be downloaded on the plugin page after importing the Layout.
This page is a virtual numpad that allows you to use the grandMA3 Software without a physical keyboard.

# Functions

- Select Sequences
- Select MAtricks
- Call Macros
- Call Plugins
- Select Groups
- Run Quick Keys
- At Menu
- Run Commands
- Toggle Executor Buttons (100/200/300/400)
