const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.config = config

		this.updateStatus(InstanceStatus.Ok)

		this.updateActions() // export actions
	}
	// When module gets deleted
	async destroy() {
		this.log('debug', 'destroy')
	}

	async configUpdated(config) {
		this.config = config
	}

	// Return config fields for web config
	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'Console IP',
				width: 8,
				regex: Regex.IP,
				value: '127.0.0.1',
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Console OSC Port',
				width: 4,
				regex: Regex.PORT,
				value: 8000,
			},
			{
				type: 'textinput',
				id: 'prefix',
				label: 'Console OSC Prefix',
				value: 'gma3',
			},
		]
	}

	updateActions() {
		UpdateActions(this)
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
