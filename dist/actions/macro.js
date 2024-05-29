import {} from 'atem-connection';
import { ActionId } from './ActionId.js';
import { GetMacroChoices, CHOICES_ON_OFF_TOGGLE } from '../choices.js';
export function createMacroActions(atem, model, state) {
    if (!model.macros) {
        return {
            [ActionId.MacroRun]: undefined,
            [ActionId.MacroContinue]: undefined,
            [ActionId.MacroStop]: undefined,
            [ActionId.MacroLoop]: undefined,
        };
    }
    return {
        [ActionId.MacroRun]: {
            name: 'Macro: Run',
            options: {
                macro: {
                    type: 'dropdown',
                    id: 'macro',
                    label: 'Macro',
                    default: 1,
                    choices: GetMacroChoices(model, state.state),
                },
                action: {
                    type: 'dropdown',
                    id: 'action',
                    label: 'Action',
                    default: 'run',
                    choices: [
                        { id: 'run', label: 'Run' },
                        { id: 'runContinue', label: 'Run/Continue' },
                    ],
                },
            },
            callback: async ({ options }) => {
                const macroIndex = options.getPlainNumber('macro') - 1;
                const { macroPlayer, macroRecorder } = state.state.macro;
                if (options.getPlainString('action') === 'runContinue' &&
                    macroPlayer.isWaiting &&
                    macroPlayer.macroIndex === macroIndex) {
                    await atem?.macroContinue();
                }
                else if (macroRecorder.isRecording && macroRecorder.macroIndex === macroIndex) {
                    await atem?.macroStopRecord();
                }
                else {
                    await atem?.macroRun(macroIndex);
                }
            },
        },
        [ActionId.MacroContinue]: {
            name: 'Macro: Continue',
            options: {},
            callback: async () => {
                await atem?.macroContinue();
            },
        },
        [ActionId.MacroStop]: {
            name: 'Macro: Stop',
            options: {},
            callback: async () => {
                await atem?.macroStop();
            },
        },
        [ActionId.MacroLoop]: {
            name: 'Macro: Loop',
            options: {
                loop: {
                    id: 'loop',
                    type: 'dropdown',
                    label: 'Loop',
                    default: 'toggle',
                    choices: CHOICES_ON_OFF_TOGGLE,
                },
            },
            callback: async ({ options }) => {
                let newState = options.getPlainString('loop') === 'true';
                if (options.getPlainString('loop') === 'toggle') {
                    newState = !state.state.macro.macroPlayer.loop;
                }
                await atem?.macroSetLoop(newState);
            },
        },
    };
}
//# sourceMappingURL=macro.js.map