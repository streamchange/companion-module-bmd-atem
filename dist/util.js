import { Enums, listVisibleInputs } from 'atem-connection';
import { InstanceBase } from '@companion-module/base';
export const MEDIA_PLAYER_SOURCE_CLIP_OFFSET = 1000;
export function assertUnreachable(_never) {
    // throw new Error('Unreachable')
}
export function pad(str, prefix, len) {
    while (str.length < len) {
        str = prefix + str;
    }
    return str;
}
export function compact(arr) {
    return arr.filter((v) => v !== undefined);
}
export function iterateTimes(count, cb) {
    const res = [];
    for (let i = 0; i < count; i++) {
        res.push(cb(i));
    }
    return res;
}
export function clamp(min, max, val) {
    return Math.min(Math.max(val, min), max);
}
export function calculateTransitionSelection(keyCount, rawSelection) {
    if (!rawSelection || !Array.isArray(rawSelection))
        return [];
    const selection = [];
    if (rawSelection.includes('background')) {
        selection.push(Enums.TransitionSelection.Background);
    }
    for (let i = 0; i < keyCount; i++) {
        if (rawSelection.includes(`key${i}`)) {
            selection.push(1 << (i + 1));
        }
    }
    return selection;
}
export var NumberComparitor;
(function (NumberComparitor) {
    NumberComparitor["Equal"] = "eq";
    NumberComparitor["NotEqual"] = "ne";
    NumberComparitor["LessThan"] = "lt";
    NumberComparitor["LessThanEqual"] = "lte";
    NumberComparitor["GreaterThan"] = "gt";
    NumberComparitor["GreaterThanEqual"] = "gte";
})(NumberComparitor || (NumberComparitor = {}));
export function compareNumber(target, comparitor, currentValue) {
    const targetValue = Number(target);
    if (isNaN(targetValue)) {
        return false;
    }
    switch (comparitor) {
        case NumberComparitor.GreaterThan:
            return currentValue > targetValue;
        case NumberComparitor.GreaterThanEqual:
            return currentValue >= targetValue;
        case NumberComparitor.LessThan:
            return currentValue < targetValue;
        case NumberComparitor.LessThanEqual:
            return currentValue <= targetValue;
        case NumberComparitor.NotEqual:
            return currentValue != targetValue;
        default:
            return currentValue === targetValue;
    }
}
export function calculateTallyForInputId(state, inputId) {
    if (inputId < 10000 || inputId > 11000)
        return [];
    // Future: This is copied from atem-connection, and should be exposed as a helper function
    const nestedMeId = (inputId - (inputId % 10) - 10000) / 10 - 1;
    const nestedMeMode = (inputId - 10000) % 10 === 0 ? 'program' : 'preview';
    // Ensure the ME exists in the state
    if (!state.video.mixEffects[nestedMeId])
        return [];
    return listVisibleInputs(nestedMeMode, state, nestedMeId);
}
//# sourceMappingURL=util.js.map