import { Enums } from 'atem-connection';
import { ActionId } from './ActionId.js';
import { CHOICES_ON_OFF_TOGGLE } from '../choices.js';
export function createRecordingActions(atem, model, state) {
    if (!model.recording) {
        return {
            [ActionId.RecordStartStop]: undefined,
            [ActionId.RecordSwitchDisk]: undefined,
            [ActionId.RecordFilename]: undefined,
            [ActionId.RecordISO]: undefined,
        };
    }
    return {
        [ActionId.RecordStartStop]: {
            name: 'Recording: Start or Stop',
            options: {
                record: {
                    id: 'record',
                    type: 'dropdown',
                    label: 'Record',
                    default: 'toggle',
                    choices: CHOICES_ON_OFF_TOGGLE,
                },
            },
            callback: async ({ options }) => {
                let newState = options.getPlainString('record') === 'true';
                if (options.getPlainString('record') === 'toggle') {
                    newState = state.state.recording?.status?.state === Enums.RecordingStatus.Idle;
                }
                if (newState) {
                    await atem?.startRecording();
                }
                else {
                    await atem?.stopRecording();
                }
            },
            learn: ({ options }) => {
                if (state.state.recording?.status) {
                    return {
                        ...options.getJson(),
                        state: state.state.recording.status.state,
                    };
                }
                else {
                    return undefined;
                }
            },
        },
        [ActionId.RecordSwitchDisk]: {
            name: 'Recording: Switch disk',
            options: {},
            callback: async () => {
                await atem?.switchRecordingDisk();
            },
        },
        [ActionId.RecordFilename]: {
            name: 'Recording: Set filename',
            options: {
                filename: {
                    id: 'filename',
                    label: 'Filename',
                    type: 'textinput',
                    default: '',
                    useVariables: true,
                },
            },
            callback: async ({ options }) => {
                const filename = await options.getParsedString('filename');
                await atem?.setRecordingSettings({ filename });
            },
            learn: ({ options }) => {
                if (state.state.recording?.properties) {
                    return {
                        ...options.getJson(),
                        filename: state.state.recording?.properties.filename,
                    };
                }
                else {
                    return undefined;
                }
            },
        },
        [ActionId.RecordISO]: {
            name: 'Recording: Enable/Disable ISO',
            options: {
                recordISO: {
                    id: 'recordISO',
                    type: 'dropdown',
                    label: 'Record ISO',
                    default: 'toggle',
                    choices: CHOICES_ON_OFF_TOGGLE,
                },
            },
            callback: async ({ options }) => {
                let newState = options.getPlainString('recordISO') === 'true';
                if (options.getPlainString('recordISO') === 'toggle') {
                    newState = !state.state.recording?.recordAllInputs;
                }
                await atem?.setEnableISORecording(newState);
            },
            learn: ({ options }) => {
                if (state.state.recording?.recordAllInputs != undefined) {
                    return {
                        ...options.getJson(),
                        state: state.state.recording.recordAllInputs,
                    };
                }
                else {
                    return undefined;
                }
            },
        },
    };
}
//# sourceMappingURL=recording.js.map