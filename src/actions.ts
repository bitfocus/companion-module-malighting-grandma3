import type { ModuleInstance } from './main.js'

export function UpdateActions(self: ModuleInstance): void {
	const sendOscMessage = (path: any, args: any) => {
		self.log('debug', `Sending OSC ${self.config.host}:${self.config.port} ${path}`)
		self.log('debug', `Sending Args ${JSON.stringify(args)}`)

		let customPath = path
		if (self.config.prefix) {
			customPath = '/' + self.config.prefix + path
			self.log('debug', `Sending Custom Path ${customPath}`)
		}
		self.oscSend(self.config.host, self.config.port, customPath, args)
	}

	self.setActionDefinitions({
		quickey: {
			name: 'Select Quickey via number',
			options: [
				{
					type: 'number',
					label: 'Quickey Number',
					id: 'quickey',
					step: 1,
					min: 1,
					max: 9999,
					default: 1,
				},
			],
			callback: async (event) => {
				if ((event.options.quickey! as number) % 1 !== 0) {
					self.log('error', `Quickey Number is not a valid number!`)
					return
				}
				const quickey = event.options.quickey

				self.log('debug', `Quickey via Number ${quickey}`)

				sendOscMessage('/cmd', [
					{
						type: 's',
						value: 'Quickey ' + quickey,
					},
				])
			},
		},
		quickey_name: {
			name: 'Select Quickey via name',
			options: [
				{
					type: 'textinput',
					label: 'Quickey Name',
					id: 'quickey',
					default: 'OOPS',
				},
			],
			callback: async (event) => {
				const quickey = event.options.quickey

				self.log('debug', `Quickey via Name ${quickey}`)

				sendOscMessage('/cmd', [
					{
						type: 's',
						value: 'Quickey "' + quickey + '"',
					},
				])
			},
		},
		group: {
			name: 'Select Group via number',
			options: [
				{
					type: 'number',
					label: 'Group Number',
					id: 'group',
					min: 1,
					max: 9999,
					default: 1,
				},
			],
			callback: async (event) => {
				if ((event.options.group! as number) % 1 !== 0) {
					self.log('error', `Group Number is not a valid number!`)
					return
				}
				const group = event.options.group

				self.log('debug', `Group via number ${group}`)

				sendOscMessage('/cmd', [
					{
						type: 's',
						value: 'SelectFixtures Group ' + group,
					},
				])
			},
		},
		group_name: {
			name: 'Select Group via name',
			options: [
				{
					type: 'textinput',
					label: 'Group Name',
					id: 'group',
					default: 'Front Lights',
				},
			],
			callback: async (event) => {
				const group = event.options.group

				self.log('debug', `Group via name ${group}`)

				sendOscMessage('/cmd', [
					{
						type: 's',
						value: 'SelectFixtures Group "' + group + '"',
					},
				])
			},
		},
		matrick: {
			name: 'Select MAtrick via number',
			options: [
				{
					type: 'number',
					label: 'MAtrick Number',
					id: 'matrick',
					min: 1,
					max: 9999,
					default: 1,
				},
			],
			callback: async (event) => {
				if ((event.options.matrick! as number) % 1 !== 0) {
					self.log('error', `MAtrick Number is not a valid number!`)
					return
				}
				const matrick = event.options.matrick

				self.log('debug', `MAtrick via number ${matrick}`)

				sendOscMessage('/cmd', [
					{
						type: 's',
						value: 'SelectFixtures MAtricks ' + matrick,
					},
				])
			},
		},
		matrick_name: {
			name: 'Select MAtrick via name',
			options: [
				{
					type: 'textinput',
					label: 'MAtrick Name',
					id: 'matrick',
					default: 'Odd',
				},
			],
			callback: async (event) => {
				const matrick = event.options.matrick

				self.log('debug', `MAtrick via name ${matrick}`)

				sendOscMessage('/cmd', [
					{
						type: 's',
						value: 'SelectFixtures MAtricks "' + matrick + '"',
					},
				])
			},
		},
		sequence: {
			name: 'Select Sequence via number',
			options: [
				{
					type: 'number',
					label: 'Sequence Number via number',
					id: 'sequence',
					min: 1,
					max: 9999,
					default: 1,
				},
			],
			callback: async (event) => {
				if ((event.options.sequence! as number) % 1 !== 0) {
					self.log('error', `Sequence Number is not a valid number!`)
					return
				}
				const sequence = event.options.sequence

				self.log('debug', `Sequence ${sequence}`)

				sendOscMessage('/cmd', [
					{
						type: 's',
						value: 'Select Sequence ' + sequence,
					},
				])
			},
		},
		sequence_name: {
			name: 'Select Sequence via name',
			options: [
				{
					type: 'textinput',
					label: 'Sequence Name',
					id: 'sequence',
					default: 'Random Strobe',
				},
			],
			callback: async (event) => {
				const sequence = event.options.sequence

				self.log('debug', `Sequence via name ${sequence}`)

				sendOscMessage('/cmd', [
					{
						type: 's',
						value: 'Select Sequence "' + sequence + '"',
					},
				])
			},
		},
		plugin: {
			name: 'Call Plugin via number',
			options: [
				{
					type: 'number',
					label: 'Plugin Number',
					id: 'plugin',
					min: 1,
					max: 9999,
					default: 1,
				},
			],
			callback: async (event) => {
				if ((event.options.plugin! as number) % 1 !== 0) {
					self.log('error', `Plugin Number is not a valid number!`)
					return
				}
				const plugin = event.options.plugin

				self.log('debug', `Plugin via number ${plugin}`)

				sendOscMessage('/cmd', [
					{
						type: 's',
						value: 'Call Plugin ' + plugin,
					},
				])
			},
		},
		plugin_name: {
			name: 'Call Plugin via name',
			options: [
				{
					type: 'textinput',
					label: 'Plugin Name',
					id: 'plugin',
					default: 'Cool Plugin 123',
				},
			],
			callback: async (event) => {
				const plugin = event.options.plugin

				self.log('debug', `Plugin via name ${plugin}`)

				sendOscMessage('/cmd', [
					{
						type: 's',
						value: 'Call Plugin "' + plugin + '"',
					},
				])
			},
		},
		macro: {
			name: 'Call Macro via number',
			options: [
				{
					type: 'number',
					label: 'Macro Number',
					id: 'macro',
					min: 1,
					max: 9999,
					default: 1,
				},
			],
			callback: async (event) => {
				if ((event.options.macro! as number) % 1 !== 0) {
					self.log('error', `Macro Number is not a valid number!`)
					return
				}
				const macro = event.options.macro

				self.log('debug', `Macro via number ${macro}`)

				sendOscMessage('/cmd', [
					{
						type: 's',
						value: 'Go+ Macro ' + macro,
					},
				])
			},
		},
		macro_name: {
			name: 'Call Macro via name',
			options: [
				{
					type: 'textinput',
					label: 'Macro Name',
					id: 'macro',
					default: 'Cool Macro 456',
				},
			],
			callback: async (event) => {
				const macro = event.options.macro

				self.log('debug', `Macro via name ${macro}`)

				sendOscMessage('/cmd', [
					{
						type: 's',
						value: 'Go+ Macro "' + macro + '"',
					},
				])
			},
		},
		atmenu: {
			name: 'At Menu',
			options: [
				{
					id: 'atmenu',
					type: 'dropdown',
					label: 'At Menu Item',
					default: 'At Full',
					choices: [
						{
							id: 'At Full',
							label: 'Full',
						},
						{
							id: 'At Zero',
							label: 'Zero',
						},
						{
							id: 'At Default',
							label: 'Default',
						},
						{
							id: 'Cut Programmer',
							label: 'Cut Programmer',
						},
						{
							id: 'At Normal',
							label: 'Normal',
						},
						{
							id: 'Copy Programmer',
							label: 'Copy Programmer',
						},
						{
							id: 'On Selection',
							label: 'On',
						},
						{
							id: 'Paste Programmer',
							label: 'Paste Programmer',
						},
						{
							id: 'Off Selection',
							label: 'Off',
						},
						{
							id: 'At Release',
							label: 'Release',
						},
						{
							id: 'Delete Programmer',
							label: 'Delete Steps',
						},
						{
							id: 'At Remove',
							label: 'Remove',
						},
					],
				},
			],
			callback: async (event) => {
				const command = event.options.atmenu

				self.log('debug', `At Menu ${command}`)

				sendOscMessage('/cmd', [
					{
						type: 's',
						value: command,
					},
				])
			},
		},
		command: {
			name: 'Run Command',
			options: [
				{
					type: 'textinput',
					label: 'Command',
					id: 'command',
					default: 'SelectFixtures Group 1',
				},
			],
			callback: async (event) => {
				const command = event.options.command

				self.log('debug', `Command ${command}`)

				sendOscMessage('/cmd', [
					{
						type: 's',
						value: command,
					},
				])
			},
		},
		exec_button: {
			name: 'Executor Button',
			options: [
				{
					id: 'page',
					type: 'number',
					label: 'Page',
					min: 1,
					max: 9999,
					default: 1,
				},
				{
					id: 'button_number',
					type: 'number',
					label: 'Button',
					min: 1,
					max: 490,
					default: 201,
				},
				{
					id: 'button_state',
					type: 'dropdown',
					label: 'Button State',
					default: 'push',
					choices: [
						{
							id: 'push',
							label: 'Push',
						},
						{
							id: 'release',
							label: 'Release',
						},
					],
				},
			],
			callback: async (event) => {
				const button_number = event.options.button_number
				const button_state = event.options.button_state
				const page = event.options.page

				self.log('debug', `Executor Button ${button_number}: ${button_state} on page ${page}`)

				if (button_state === 'push') {
					sendOscMessage('/Page' + page + '/Key' + button_number, [
						{
							type: 'T',
						},
					])
				} else {
					sendOscMessage('/Page' + page + '/Key' + button_number, [
						{
							type: 'i',
							value: 0,
						},
					])
				}
			},
		},
	})
}
