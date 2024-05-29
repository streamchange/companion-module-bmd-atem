import { Enums } from 'atem-connection';
import { FeedbackId } from './FeedbackId.js';
import { combineRgb } from '@companion-module/base';
export function createStreamingFeedbacks(model, state) {
    if (!model.streaming) {
        return {
            [FeedbackId.StreamStatus]: undefined,
        };
    }
    return {
        [FeedbackId.StreamStatus]: {
            type: 'boolean',
            name: 'Streaming: Active/Running',
            description: 'If the stream has the specified status, change style of the bank',
            options: {
                state: {
                    id: 'state',
                    label: 'State',
                    type: 'dropdown',
                    choices: Object.entries(Enums.StreamingStatus)
                        .filter(([_k, v]) => typeof v === 'number')
                        .map(([k, v]) => ({
                        id: v,
                        label: k,
                    })),
                    default: Enums.StreamingStatus.Streaming,
                },
            },
            defaultStyle: {
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(0, 255, 0),
            },
            callback: ({ options }) => {
                const streaming = state.state.streaming?.status?.state;
                return streaming === options.getPlainNumber('state');
            },
            learn: ({ options }) => {
                if (state.state.streaming?.status) {
                    return {
                        ...options.getJson(),
                        state: state.state.streaming.status.state,
                    };
                }
                else {
                    return undefined;
                }
            },
        },
    };
}
//# sourceMappingURL=streaming.js.map