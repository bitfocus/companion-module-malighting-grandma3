import type {
	CompanionStaticUpgradeProps,
	CompanionStaticUpgradeResult,
	CompanionStaticUpgradeScript,
	CompanionUpgradeContext,
} from '@companion-module/base'
import type { ModuleConfig } from './config.js'

function updateExecButtonPageFromDropdownToInteger(
	_context: CompanionUpgradeContext<ModuleConfig>,
	props: CompanionStaticUpgradeProps<ModuleConfig>,
): CompanionStaticUpgradeResult<ModuleConfig> {
	const result: CompanionStaticUpgradeResult<ModuleConfig> = {
		updatedActions: [],
		updatedConfig: null,
		updatedFeedbacks: [],
	}

	for (const action of props.actions) {
		if (
			action.actionId === 'exec_button' &&
			typeof action.options.page === 'string' &&
			!isNaN(parseInt(action.options.page))
		) {
			action.options.page = parseInt(action.options.page)
			result.updatedActions.push(action)
		}
	}

	return result
}

export const UpgradeScripts: CompanionStaticUpgradeScript<ModuleConfig>[] = [
	updateExecButtonPageFromDropdownToInteger,
	/*
	 * Place your upgrade scripts here
	 * Remember that once it has been added it cannot be removed!
	 */
	// function (context, props) {
	// 	return {
	// 		updatedConfig: null,
	// 		updatedActions: [],
	// 		updatedFeedbacks: [],
	// 	}
	// },
]
