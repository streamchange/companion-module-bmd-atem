import { combineRgb } from '@companion-module/base';
import { ActionId } from '../actions/ActionId.js';
import { FeedbackId } from '../feedback/FeedbackId.js';
import { GetSourcesListForType } from '../choices.js';
export function createAuxOutputPresets(model, state, pstSize, pstText) {
    const result = [];
    for (let aux = 0; aux < model.auxes; ++aux) {
        const category = {
            name: `AUX ${aux + 1}`,
            presets: {},
        };
        result.push(category);
        for (const src of GetSourcesListForType(model, state, 'aux')) {
            category.presets[`aux_${aux}_${src.id}`] = {
                name: `AUX ${aux + 1} button for ${src.shortName}`,
                type: 'button',
                style: {
                    text: `$(atem:${pstText}${src.id})`,
                    size: pstSize,
                    color: combineRgb(255, 255, 255),
                    bgcolor: combineRgb(0, 0, 0),
                },
                feedbacks: [
                    {
                        feedbackId: FeedbackId.AuxBG,
                        options: {
                            input: src.id,
                            aux,
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
                                actionId: ActionId.Aux,
                                options: {
                                    aux,
                                    input: src.id,
                                },
                            },
                        ],
                        up: [],
                    },
                ],
            };
        }
    }
    return result;
}
//# sourceMappingURL=aux.js.map