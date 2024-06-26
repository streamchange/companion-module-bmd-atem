import { Enums } from 'atem-connection';
import { AtemMediaPlayerPicker, AtemMediaPlayerSourcePicker } from '../input.js';
import { FeedbackId } from './FeedbackId.js';
import { combineRgb } from '@companion-module/base';
import { MEDIA_PLAYER_SOURCE_CLIP_OFFSET } from '../util.js';
export function createMediaPlayerFeedbacks(model, state) {
    if (!model.media.players) {
        return {
            [FeedbackId.MediaPlayerSource]: undefined,
        };
    }
    return {
        [FeedbackId.MediaPlayerSource]: {
            type: 'boolean',
            name: 'Media player: Source',
            description: 'If the specified media player has the specified source, change style of the bank',
            options: {
                mediaplayer: AtemMediaPlayerPicker(model),
                source: AtemMediaPlayerSourcePicker(model, state.state),
            },
            defaultStyle: {
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0),
            },
            callback: ({ options }) => {
                const player = state.state.media.players[options.getPlainNumber('mediaplayer')];
                if (player?.sourceType === Enums.MediaSourceType.Still &&
                    player?.stillIndex === options.getPlainNumber('source')) {
                    return true;
                }
                else if (player?.sourceType === Enums.MediaSourceType.Clip &&
                    player?.clipIndex === options.getPlainNumber('source') - MEDIA_PLAYER_SOURCE_CLIP_OFFSET) {
                    return true;
                }
                else {
                    return false;
                }
            },
            learn: ({ options }) => {
                const player = state.state.media.players[options.getPlainNumber('mediaplayer')];
                if (player) {
                    return {
                        ...options.getJson(),
                        source: player.sourceType ? player.stillIndex : player.clipIndex + MEDIA_PLAYER_SOURCE_CLIP_OFFSET,
                    };
                }
                else {
                    return undefined;
                }
            },
        },
    };
}
//# sourceMappingURL=mediaPlayer.js.map