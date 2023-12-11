module.exports = function (self) {
	const sendOscMessage = (path, args) => {
		self.log('debug', `Sending OSC ${self.config.host}:${self.config.port} ${path}`)
		self.log('debug', `Sending Args ${JSON.stringify(args)}`)
		self.oscSend(self.config.host, self.config.port, path, args)
	}

	self.setActionDefinitions({
		quick_keys: {
			name: 'Toggle Quick Keys',
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
				const argsStr = await self.parseVariablesInString("\"flash\" 1")

				const rawArgs = (argsStr + '').replace(/“/g, '"').replace(/”/g, '"').split(' ')

				if (rawArgs.length) {
					const args = []
					for (let i = 0; i < rawArgs.length; i++) {
						if (rawArgs[i].length == 0) continue
						if (isNaN(rawArgs[i])) {
							let str = rawArgs[i]
							if (str.startsWith('"')) {
								//a quoted string..
								while (!rawArgs[i].endsWith('"')) {
									i++
									str += ' ' + rawArgs[i]
								}
							} else if(str.startsWith('{')) {
								//Probably a JSON object
								try {
									args.push((JSON.parse(rawArgs[i])))
								} catch (error) {
									self.log('error', `not a JSON object ${rawArgs[i]}`)
								}
							}

							args.push({
								type: 's',
								value: str.replace(/"/g, '').replace(/'/g, ''),
							})
						} else if (rawArgs[i].indexOf('.') > -1) {
							args.push({
								type: 'f',
								value: parseFloat(rawArgs[i]),
							})
						} else {
							args.push({
								type: 'i',
								value: parseInt(rawArgs[i]),
							})
						}
					}

					sendOscMessage("/13.13.1.9." + quickKey, args)
				}
			},
		},
	})
}
