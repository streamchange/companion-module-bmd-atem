import {} from '@companion-module/base';
import {} from '../state.js';
import { createTallyFeedbacks } from './mixeffect/tally.js';
import { convertMyFeedbackDefinitions } from './wrapper.js';
import { createPreviewFeedbacks } from './mixeffect/preview.js';
import { createProgramFeedbacks } from './mixeffect/program.js';
import { createFadeToBlackFeedbacks } from './mixeffect/fadeToBlack.js';
import { createMediaPlayerFeedbacks } from './mediaPlayer.js';
import { createMultiviewerFeedbacks } from './multiviewer.js';
import { createMacroFeedbacks } from './macro.js';
import { createAuxOutputFeedbacks } from './aux.js';
import { createRecordingFeedbacks } from './recording.js';
import { createStreamingFeedbacks } from './streaming.js';
import { createDownstreamKeyerFeedbacks } from './dsk.js';
import { createUpstreamKeyerFeedbacks } from './mixeffect/usk.js';
import { createTransitionFeedbacks } from './mixeffect/transition.js';
import { createSuperSourceFeedbacks } from './superSource.js';
import { createClassicAudioFeedbacks } from './classicAudio.js';
import { createFairlightAudioFeedbacks } from './fairlightAudio.js';
import { FeedbackId } from './FeedbackId.js';
import { createTimecodeFeedbacks } from './timecode.js';
export function GetFeedbacksList(config, model, state) {
    const feedbacks = {
        ...createTallyFeedbacks(model, state),
        ...createPreviewFeedbacks(model, state),
        ...createProgramFeedbacks(model, state),
        ...createUpstreamKeyerFeedbacks(model, state),
        ...createDownstreamKeyerFeedbacks(model, state),
        ...createSuperSourceFeedbacks(model, state),
        ...createFadeToBlackFeedbacks(model, state),
        ...createTransitionFeedbacks(model, state),
        ...createStreamingFeedbacks(model, state),
        ...createRecordingFeedbacks(model, state),
        ...createClassicAudioFeedbacks(model, state),
        ...createFairlightAudioFeedbacks(model, state),
        ...createAuxOutputFeedbacks(model, state),
        ...createMacroFeedbacks(model, state),
        ...createMultiviewerFeedbacks(model, state),
        ...createMediaPlayerFeedbacks(model, state),
        ...createTimecodeFeedbacks(config, model, state),
    };
    return convertMyFeedbackDefinitions(feedbacks);
}
//# sourceMappingURL=index.js.map