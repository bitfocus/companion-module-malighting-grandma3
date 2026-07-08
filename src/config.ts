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
				'This module uses OSC in grandMA3. For more information please visit <a href="https://help.malighting.com/grandMA3/2.3/HTML/remote_inputs_osc.html" target="_blank">this link</a>.<br>' +
				'<br>Here is an short explanaiton for the configuration fields below:' +
				'<br>- gMA3 Input Port / Prefix = Companion -> gMA3' +
				'<br>- gMA3 Output Port / Prefix = gMA3 -> Companion<br>' +
				'<br><b>Important:</b> Prefixes are only being considered if they are set, if not, any message gets through.',
		},
		{
			type: 'textinput',
			id: 'host',
			label: 'grandMA3 Console IP',
			width: 6,
			regex: Regex.IP,
			default: '127.0.0.1',
		},
		{
			type: 'textinput',
			id: 'port',
			label: 'grandMA3 Input Port',
			width: 6,
			regex: Regex.PORT,
			default: '8081',
		},
		{
			type: 'textinput',
			id: 'inputPrefix',
			label: 'grandMA3 Input Prefix',
			width: 6,
			default: '',
		},
		{
			type: 'textinput',
			id: 'feedbackPort',
			label: 'grandMA3 Output Port',
			width: 6,
			default: '8082',
			regex: Regex.PORT,
		},
		{
			type: 'textinput',
			id: 'outputPrefix',
			label: 'grandMA3 Output Prefix',
			width: 6,
			default: '',
		},
	]
}
