import { Enums } from 'atem-connection';
import { ActionId } from './ActionId.js';
import { formatDurationSeconds } from '../variables/util.js';
export function createTimecodeActions(instance, atem, state) {
    if (!instance.config.pollTimecode) {
        return {
            [ActionId.Timecode]: undefined,
            [ActionId.TimecodeMode]: undefined,
        };
    }
    return {
        [ActionId.Timecode]: {
            name: 'Timecode: Set time',
            options: {
                time: {
                    id: 'time',
                    type: 'textinput',
                    label: 'Timecode',
                    default: '00:00:00',
                    tooltip: 'HH:MM:SS',
                    useVariables: true,
                },
            },
            callback: async ({ options }) => {
                const timecodeStr = await options.getParsedString('time');
                const [hour, minute, seconds, frames] = timecodeStr.split(/:|;/).map((v) => parseInt(v, 10));
                if (isNaN(hour) || isNaN(minute) || isNaN(seconds))
                    throw new Error('Invalid timecode');
                await atem?.setTime(hour, minute, seconds, isNaN(frames) ? 0 : frames);
            },
            learn: ({ options }) => {
                const timecode = formatDurationSeconds(instance.timecodeSeconds).hms;
                return {
                    ...options.getJson(),
                    time: timecode,
                };
            },
        },
        [ActionId.TimecodeMode]: {
            name: 'Timecode: Set mode',
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
            callback: async ({ options }) => {
                const mode = options.getPlainNumber('mode');
                await atem?.setTimeMode(mode);
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