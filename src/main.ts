import { InstanceBase, runEntrypoint, InstanceStatus, SomeCompanionConfigField } from '@companion-module/base'
import { GetConfigFields, type ModuleConfig } from './config.js'
import { UpgradeScripts } from './upgrades.js'
import { UpdateActions } from './actions.js'
import { UpdateFeedbacks } from './feedbacks.js'
import { Server } from 'node-osc'
import { SequenceActiveState, SimpleCache } from './cache.js'

export class ModuleInstance extends InstanceBase<ModuleConfig> {
	config!: ModuleConfig // Setup in init()
	private oscServer: Server | null = null
	seqCache = new SimpleCache()

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
		const gma3Address = address.slice(1, address.length - 2)
		const gma3ObjectNumber = address.slice(address.lastIndexOf('.') + 1)

		this.log('debug', `OSC empfangen: ${gma3Address} + ${gma3ObjectNumber}}`)

		switch (gma3Address) {
			case '14.14.1.6': {
				const buttonName = args[0]
				const infos = args[2]

				let state
				if (buttonName.includes('Fader')) {
					state = Number(infos) > 0 ? 1 : 0 // fader bugfix as long as ma has not fixed it, tbr in future
				} else {
					state = args[1]
				}

				const seqNumber = Number(gma3ObjectNumber)

				const cacheObject: SequenceActiveState = {
					seqNumber,
					state,
				}

				const prev = this.seqCache.get('sequence_state') as SequenceActiveState
				const hasChanged = !prev || prev.seqNumber !== cacheObject.seqNumber || prev.state !== cacheObject.state

				if (!hasChanged) {
					break
				}

				this.seqCache.set('sequence_state', cacheObject)

				this.log('debug', `State von ${gma3Address} (SEQ) ist jetzt ${state} (Seq: ${seqNumber}})`)

				this.checkFeedbacks('sequence_active')
				break
			}
			default:
				break
		}
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
