import { Regex, type SomeCompanionConfigField } from '@companion-module/base'

export interface ModuleConfig {
	host: string
	port: number
	inputPrefix: string
	outputPrefix: string
	feedbackPort: string
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'static-text',
			id: 'info',
			width: 12,
			label: 'Information',
			value:
				'This module uses OSC in grandMA3. For more information please visit <a href="https://help.malighting.com/grandMA3/2.3/HTML/remote_inputs_osc.html" target="_blank">this link</a>.<br>The input port is the port that gMA3 will receive the data from companion and the output port is where it will send the data to companion.<br><b>Important:</b>Prefixes are only being considered if they are set, if not, any message gets through.',
		},
		{
			type: 'textinput',
			id: 'host',
			label: 'Console IP',
			width: 6,
			regex: Regex.IP,
			default: '127.0.0.1',
		},
		{
			type: 'textinput',
			id: 'port',
			label: 'gMA3 Input Port',
			width: 6,
			regex: Regex.PORT,
			default: '8081',
		},
		{
			type: 'textinput',
			id: 'inputPrefix',
			label: 'gMA3 Input Prefix',
			width: 6,
			default: '',
		},
		{
			type: 'textinput',
			id: 'feedbackPort',
			label: 'gMA3 Output Port',
			width: 6,
			default: '8091',
			regex: Regex.PORT,
		},
		{
			type: 'textinput',
			id: 'outputPrefix',
			label: 'gMA3 Output Prefix',
			width: 6,
			default: '',
		},
	]
}
