import type { ModuleInstance } from './main.js'
import { SequenceActiveState } from './cache.js'

export function UpdateFeedbacks(self: ModuleInstance): void {
	self.setFeedbackDefinitions({
		sequence_active: {
			type: 'boolean' as const,
			name: 'Check if a sequence is active',
			defaultStyle: {
				bgcolor: 0x00ff00,
				color: 0x000000,
			},
			options: [
				{
					type: 'number',
					label: 'Sequence Number',
					id: 'sequence_number',
					min: 1,
					max: 9999,
					default: 1,
				},
			],
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			callback: (feedback) => {
				const currentValue = self.seqCache.get('sequence_state') as SequenceActiveState
				const sequence_number = feedback.options.sequence_number as string

				self.log('debug', `Feedback sequence_active: state=${currentValue.state}, number=${sequence_number}`)

				// Vergleich als String (funktioniert für Zahlen & Text)
				return Number(sequence_number) === currentValue.seqNumber && currentValue.state === 1
			},
		},
	})
}
