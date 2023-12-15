module.exports = function (self) {
	const sendOscMessage = (path, args) => {
		self.log('debug', `Sending OSC ${self.config.host}:${self.config.port} ${path}`)
		self.log('debug', `Sending Args ${JSON.stringify(args)}`)
		self.oscSend(self.config.host, self.config.port, path, args)
	}

	self.setActionDefinitions({
		quick_keys: {
			name: 'Call QuickKey',
			options: [
				{
					type: 'textinput',
					label: 'Quick Key Number',
					id: 'quickKey',
					default: '1',
					useVariables: true,
				}
			],
			callback: async (event) => {
				const quickKey = await self.parseVariablesInString(event.options.quickKey)

				sendOscMessage("/13.13.1.9." + quickKey, [
					{
						type: 's',
						value: 'flash',
					},
					{
						type: 'i',
						value: 1,
					}
				])
			},
		},
		group: {
			name: 'Select Group',
			options: [
				{
					type: 'textinput',
					label: 'Group Number',
					id: 'group',
					default: '1',
					useVariables: true,
				}
			],
			callback: async (event) => {
				const group = await self.parseVariablesInString(event.options.group)

				sendOscMessage("/cmd", [
					{
						type: 's',
						value: 'SelectFixtures Group ' + group,
					}
				])
			},
		},
		plugin: {
			name: 'Call Plugins',
			options: [
				{
					type: 'textinput',
					label: 'Plugin Number',
					id: 'plugin',
					default: '1',
					useVariables: true,
				}
			],
			callback: async (event) => {
				const plugin = await self.parseVariablesInString(event.options.plugin)

				sendOscMessage("/cmd", [
					{
						type: 's',
						value: 'Call Plugin ' + plugin,
					}
				])
			},
		},
		macro: {
			name: 'Call Macro',
			options: [
				{
					type: 'textinput',
					label: 'Macro Number',
					id: 'macro',
					default: '1',
					useVariables: true,
				}
			],
			callback: async (event) => {
				const macro = await self.parseVariablesInString(event.options.macro)

				sendOscMessage("/cmd", [
					{
						type: 's',
						value: 'Go+ Macro ' + macro,
					}
				])
			},
		},
		matricks: {
			name: 'Select MAtricks',
			options: [
				{
					type: 'textinput',
					label: 'MAtrick Number',
					id: 'matrick',
					default: '1',
					useVariables: true,
				}
			],
			callback: async (event) => {
				const matrick = await self.parseVariablesInString(event.options.matrick)

				sendOscMessage("/cmd", [
					{
						type: 's',
						value: 'SelectFixtures MAtricks ' + matrick,
					}
				])
			},
		},
		sequence: {
			name: 'Select Sequence',
			options: [
				{
					type: 'textinput',
					label: 'Sequence Number',
					id: 'sequence',
					default: '1',
					useVariables: true,
				}
			],
			callback: async (event) => {
				const sequence = await self.parseVariablesInString(event.options.sequence)

				sendOscMessage("/cmd", [
					{
						type: 's',
						value: 'Select Sequence ' + sequence,
					}
				])
			},
		},
		atMenu: {
			name: 'At Menu',
			options: [
				{
					id: 'atmenu',
					type: 'dropdown',
					label: 'At Menu Item',
					choices: [
						{
							id: 'At Full',
							label: 'Full'
						},
						{
							id: 'At Zero',
							label: 'Zero'
						},
						{
							id: 'At Default',
							label: 'Default'
						},
						{
							id: 'Cut Programmer',
							label: 'Cut Programmer'
						},
						{
							id: 'At Normal',
							label: 'Normal'
						},
						{
							id: 'Copy Programmer',
							label: 'Copy Programmer'
						},
						{
							id: 'On Selection',
							label: 'On'
						},
						{
							id: 'Paste Programmer',
							label: 'Paste Programmer'
						},
						{
							id: 'Off Selection',
							label: 'Off'
						},
						{
							id: 'At Release',
							label: 'Release'
						},
						{
							id: 'Delete Programmer',
							label: 'Delete Steps'
						},
						{
							id: 'At Remove',
							label: 'Remove'
						},
					],
				}
			],
			callback: async (event) => {
				const command = await self.parseVariablesInString(event.options.atmenu)

				self.log('debug', `List ${command}`)

				sendOscMessage("/cmd", [
					{
						type: 's',
						value: command
					}
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
					useVariables: true,
				}
			],
			callback: async (event) => {
				const command = await self.parseVariablesInString(event.options.command)

				sendOscMessage("/cmd", [
					{
						type: 's',
						value: command,
					}
				])
			},
		},
	})
}
