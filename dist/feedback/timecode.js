import { FeedbackId } from './FeedbackId.js';
import { combineRgb } from '@companion-module/base';
import { Enums } from 'atem-connection';
export function createTimecodeFeedbacks(config, _model, state) {
    if (!config.pollTimecode) {
        return {
            [FeedbackId.TimecodeMode]: undefined,
        };
    }
    return {
        [FeedbackId.TimecodeMode]: {
            type: 'boolean',
            name: 'Timecode: Mode',
            description: 'If the timecode mode is as specified',
            options: {
                mode: {
                    id: 'mode',
                    type: 'dropdown',
                    label: 'Mode',
                    choices: [
                        { id: Enums.TimeMode.FreeRun, label: 'Free run' },
                        { id: Enums.TimeMode.TimeOfDay, label: 'Time of Day' },
                    ],
                    default: Enums.TimeMode.FreeRun,
                },
            },
            defaultStyle: {
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0),
            },
            callback: ({ options }) => {
                return state.state.settings.timeMode === options.getPlainNumber('mode');
            },
            learn: ({ options }) => {
                return {
                    ...options.getJson(),
                    mode: state.state.settings.timeMode ?? Enums.TimeMode.FreeRun,
                };
            },
        },
    };
}
//# sourceMappingURL=timecode.js.map