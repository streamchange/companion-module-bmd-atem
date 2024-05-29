import { formatDurationSeconds } from './util.js';
export function updateTimecodeVariables(instance, _state, values) {
    values['timecode'] = formatDurationSeconds(instance.timecodeSeconds).hms;
    // values['timecode_ms'] = formatDurationSeconds(instance.timecodeSeconds).hms
}
//# sourceMappingURL=timecode.js.map