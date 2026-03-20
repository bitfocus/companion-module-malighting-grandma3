import { InstanceBase, runEntrypoint, InstanceStatus, SomeCompanionConfigField } from '@companion-module/base'
import { GetConfigFields, type ModuleConfig } from './config.js'
import { UpgradeScripts } from './upgrades.js'
import { UpdateActions } from './actions.js'
import { UpdateFeedbacks } from './feedbacks.js'
import { Server } from 'node-osc'

export class ModuleInstance extends InstanceBase<ModuleConfig> {
	config!: ModuleConfig // Setup in init()
	private oscServer: Server | null = null
	private deviceState: Record<string, any> = {}

	constructor(internal: unknown) {
		super(internal)
	}

	async init(config: ModuleConfig): Promise<void> {
		this.config = config

		this.updateStatus(InstanceStatus.Ok)
		await this.initOSC(config)
		this.updateActions()
		this.updateFeedbacks()
	}
	// When module gets deleted
	async destroy(): Promise<void> {
		this.log('debug', 'destroy')
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	async initOSC(config: ModuleConfig) {
		// Alten Server zuerst schließen
		if (this.oscServer) {
			await this.oscServer.close()
			this.oscServer = null
		}

		this.oscServer = new Server(Number(config.feedbackPort), '0.0.0.0', () => {
			this.log('info', `OSC Server lauscht auf Port ${config.feedbackPort}`)
		})

		this.oscServer.on('message', (msg: any[]) => {
			// node-osc liefert: [ '/adresse', arg1, arg2, ... ]
			const address = msg[0] as string
			const args = msg.slice(1)

			this.handleOSCMessage(address, args)
		})

		this.oscServer.on('error', (err: Error) => {
			this.log('error', `OSC Fehler: ${err.message}`)
			this.updateStatus(InstanceStatus.ConnectionFailure, err.message)
		})
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	handleOSCMessage(address: string, args: any[]) {
		const value = args[0] // Erster Argument-Wert

		// Zustand intern speichern
		this.deviceState[address] = value

		this.log('debug', `OSC empfangen: ${address} = ${value}`)

		// Companion: alle Feedbacks neu auswerten
		this.checkFeedbacks('osc_value_check')
	}

	async configUpdated(config: ModuleConfig): Promise<void> {
		this.config = config
	}

	// Return config fields for web config
	getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}

	updateActions(): void {
		UpdateActions(this)
	}

	updateFeedbacks(): void {
		UpdateFeedbacks(this)
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
