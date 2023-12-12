module.exports = function (self) {
	const sendOscMessage = (path, args) => {
		self.log('debug', `Sending OSC ${self.config.host}:${self.config.port} ${path}`)
		self.log('debug', `Sending Args ${JSON.stringify(args)}`)
		self.oscSend(self.config.host, self.config.port, path, args)
	}

	self.setActionDefinitions({
		quick_keys: {
			name: 'Run Quick Keys',
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
	})
}
