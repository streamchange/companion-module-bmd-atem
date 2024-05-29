import {} from 'atem-connection';
import {} from '../util.js';
import { AtemCommandBatching } from '../batching.js';
import { AtemTransitions } from '../transitions.js';
import { createProgramPreviewActions } from './mixeffect/programPreview.js';
import { convertMyActionDefinitions } from './wrapper.js';
import { createTransitionActions } from './mixeffect/transition.js';
import { createDisplayClockActions } from './displayClock.js';
import { createMacroActions } from './macro.js';
import { createStreamingActions } from './streaming.js';
import { createRecordingActions } from './recording.js';
import { createDownstreamKeyerActions } from './dsk.js';
import { createAuxOutputActions } from './aux.js';
import { createMultiviewerActions } from './multiviewer.js';
import { createMediaPlayerActions } from './mediaPlayer.js';
import { createSettingsActions } from './settings.js';
import { createSuperSourceActions } from './superSource.js';
import { createUpstreamKeyerCommonActions, } from './mixeffect/upstreamKeyerCommon.js';
import { createFadeToBlackActions } from './mixeffect/fadeToBlack.js';
import { createUpstreamKeyerDVEActions } from './mixeffect/upstreamKeyerDVE.js';
import { createClassicAudioActions } from './classicAudio.js';
import { createFairlightAudioActions } from './fairlightAudio.js';
import { ActionId } from './ActionId.js';
import { createCameraControlLensActions } from './cameraControl/lens.js';
import { createCameraControlDisplayActions } from './cameraControl/display.js';
import { createCameraControlVideoActions } from './cameraControl/video.js';
import { createCameraControlColorActions } from './cameraControl/color.js';
import { createTimecodeActions } from './timecode.js';
export function GetActionsList(instance, atem, model, commandBatching, transitions, state) {
    const actions = {
        ...createProgramPreviewActions(atem, model, transitions, state),
        ...createTransitionActions(instance, atem, model, commandBatching, state),
        ...createUpstreamKeyerCommonActions(atem, model, state),
        ...createUpstreamKeyerDVEActions(atem, model, state),
        ...createFadeToBlackActions(atem, model, state),
        ...createDownstreamKeyerActions(atem, model, state),
        ...createMacroActions(atem, model, state),
        ...createSuperSourceActions(atem, model, state),
        ...createStreamingActions(atem, model, state),
        ...createRecordingActions(atem, model, state),
        ...createClassicAudioActions(atem, model, transitions, state),
        ...createFairlightAudioActions(atem, model, transitions, state),
        ...createAuxOutputActions(atem, model, state),
        ...createMultiviewerActions(atem, model, state),
        ...createMediaPlayerActions(atem, model, state),
        ...createSettingsActions(atem, model, state),
        ...createDisplayClockActions(atem, model, state),
        ...createCameraControlLensActions(instance.config, atem, state),
        ...createCameraControlDisplayActions(instance.config, atem, state),
        ...createCameraControlVideoActions(instance.config, atem, state),
        ...createCameraControlColorActions(instance.config, atem, state),
        ...createTimecodeActions(instance, atem, state),
    };
    return convertMyActionDefinitions(actions);
}
//# sourceMappingURL=index.js.map