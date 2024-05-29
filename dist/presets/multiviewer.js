import { combineRgb } from '@companion-module/base';
import { ActionId } from '../actions/ActionId.js';
import { FeedbackId } from '../feedback/FeedbackId.js';
import { GetSourcesListForType } from '../choices.js';
export function createMultiviewerPresets(model, state, pstSize, pstText) {
    const result = [];
    for (let mv = 0; mv < model.MVs; mv++) {
        const firstWindow = model.multiviewerFullGrid ? 0 : 2;
        const windowCount = model.multiviewerFullGrid ? 16 : 10;
        for (let window = firstWindow; window < windowCount; window++) {
            const category = {
                name: `MV ${mv + 1} Window ${window + 1}`,
                presets: {},
            };
            result.push(category);
            for (const src of GetSourcesListForType(model, state, 'mv')) {
                category.presets[`mv_win_src_${mv}_${window}_${src.id}`] = {
                    name: `Set MV ${mv + 1} Window ${window + 1} to source ${src.shortName}`,
                    type: 'button',
                    style: {
                        text: `$(atem:${pstText}${src.id})`,
                        size: pstSize,
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 0, 0),
                    },
                    feedbacks: [
                        {
                            feedbackId: FeedbackId.MVSource,
                            options: {
                                multiViewerId: mv,
                                source: src.id,
                                windowIndex: window,
                            },
                            style: {
                                bgcolor: combineRgb(255, 255, 0),
                                color: combineRgb(0, 0, 0),
                            },
                        },
                    ],
                    steps: [
                        {
                            down: [
                                {
                                    actionId: ActionId.MultiviewerWindowSource,
                                    options: {
                                        multiViewerId: mv,
                                        source: src.id,
                                        windowIndex: window,
                                    },
                                },
                            ],
                            up: [],
                        },
                    ],
                };
            }
        }
    }
    return result;
}
//# sourceMappingURL=multiviewer.js.map