export function getMixEffect(state, meIndex) {
    return state.video.mixEffects[Number(meIndex)];
}
export function getTransitionProperties(state, meIndex) {
    const me = getMixEffect(state, meIndex);
    return me ? me.transitionProperties : undefined;
}
export function getUSK(state, meIndex, keyIndex) {
    const me = getMixEffect(state, meIndex);
    return me ? me.upstreamKeyers[Number(keyIndex)] : undefined;
}
export function getDSK(state, keyIndex) {
    return state.video.downstreamKeyers[Number(keyIndex)];
}
export function getSuperSourceBox(state, boxIndex, ssrcId) {
    const ssrc = state.video.superSources[Number(ssrcId ?? 0)];
    return ssrc ? ssrc.boxes[Number(boxIndex)] : undefined;
}
export function getMultiviewer(state, index) {
    return state.settings.multiViewers[Number(index)];
}
export function getMultiviewerWindow(state, mvIndex, windowIndex) {
    const mv = getMultiviewer(state, mvIndex);
    return mv ? mv.windows[Number(windowIndex)] : undefined;
}
export function getMediaPlayer(state, index) {
    return state.media.players[index];
}
export function getFairlightAudioInput(state, index) {
    return state.fairlight?.inputs[index];
}
export function getClassicAudioInput(state, index) {
    return state.audio?.channels[index];
}
export function getFairlightAudioMasterChannel(state) {
    return state.fairlight?.master;
}
export function getFairlightAudioMonitorChannel(state) {
    return state.fairlight?.monitor;
}
//# sourceMappingURL=state.js.map