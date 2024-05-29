import {} from '@companion-module/base';
import {} from 'atem-connection';
import { GetSourcesListForType } from '../choices.js';
import { PresetStyleName } from '../config.js';
import {} from '../util.js';
import { createStreamingPresets } from './streaming.js';
import { createRecordingPresets } from './recording.js';
import { convertMyPresetDefinitions } from './wrapper.js';
import { createFadeToBlackPresets } from './fadeToBlack.js';
import { createMediaPlayerPresets } from './mediaPlayer.js';
import { createSuperSourcePresets } from './superSource.js';
import { createMultiviewerPresets } from './multiviewer.js';
import { createMacroPresets } from './macro.js';
import { createProgramPreviewPresets } from './mixeffect/programPreview.js';
import { createTransitionPresets } from './mixeffect/transition.js';
import { createAuxOutputPresets } from './aux.js';
import { createUpstreamKeyerPresets } from './mixeffect/upstreamKeyer.js';
import { createDownstreamKeyerPresets } from './downstreamKeyer.js';
const rateOptions = [12, 15, 25, 30, 37, 45, 50, 60];
export function GetPresetsList(instance, model, state) {
    const pstText = Number(instance.config.presets) === PresetStyleName.Long ? 'long_' : 'short_';
    const pstSize = Number(instance.config.presets) === PresetStyleName.Long ? 'auto' : '18';
    const meSources = GetSourcesListForType(model, state, 'me');
    return convertMyPresetDefinitions([
        ...createProgramPreviewPresets(model, pstSize, pstText, meSources),
        ...createTransitionPresets(model, pstSize, rateOptions),
        ...createAuxOutputPresets(model, state, pstSize, pstText),
        ...createUpstreamKeyerPresets(model, pstSize, pstText, meSources),
        ...createDownstreamKeyerPresets(model, pstSize, pstText, meSources),
        ...createMacroPresets(model),
        ...createMultiviewerPresets(model, state, pstSize, pstText),
        ...createSuperSourcePresets(model, pstSize, pstText, meSources),
        ...createMediaPlayerPresets(model, pstSize),
        ...createFadeToBlackPresets(model, pstSize, rateOptions),
        ...createStreamingPresets(model),
        ...createRecordingPresets(model),
    ]);
}
//# sourceMappingURL=index.js.map