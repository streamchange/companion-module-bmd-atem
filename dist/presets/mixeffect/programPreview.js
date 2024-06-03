import { combineRgb } from '@companion-module/base';
import { ActionId } from '../../actions/ActionId.js';
import { FeedbackId } from '../../feedback/FeedbackId.js';
export function createProgramPreviewPresets(model, pstSize, pstText, meSources) {
    const result = [];
    for (let me = 0; me < model.MEs; ++me) {
        const previewCategory = {
            name: `Preview (M/E ${me + 1})`,
            presets: {},
        };
        const programCategory = {
            name: `Program (M/E ${me + 1})`,
            presets: {},
        };
        const comboCategory = {
            name: `Combo (M/E ${me + 1})`,
            presets: {},
        };
        result.push(programCategory, previewCategory, comboCategory);
        for (const src of meSources) {
            previewCategory.presets[`preview_me_${me}_${src.id}`] = {
                name: `Preview button for ${src.shortName}`,
                type: 'button',
                style: {
                    text: `$(atem:${pstText}${src.id})`,
                    size: pstSize,
                    color: combineRgb(255, 255, 255),
                    bgcolor: combineRgb(0, 0, 0),
                },
                feedbacks: [
                    {
                        feedbackId: FeedbackId.PreviewBG,
                        options: {
                            input: src.id,
                            mixeffect: me,
                        },
                        style: {
                            bgcolor: combineRgb(0, 255, 0),
                            color: combineRgb(255, 255, 255),
                        },
                    },
                ],
                steps: [
                    {
                        down: [
                            {
                                actionId: ActionId.Preview,
                                options: {
                                    mixeffect: me,
                                    input: src.id,
                                },
                            },
                        ],
                        up: [],
                    },
                ],
            };
            comboCategory.presets[`combo_me_${me}_${src.id}`] = {
                name: `Combo button for ${src.shortName}`,
                type: 'button',
                style: {
                    text: `$(atem:${pstText}${src.id})`,
                    size: pstSize,
                    color: combineRgb(255, 255, 255),
                    bgcolor: combineRgb(0, 0, 0),
                },
                feedbacks: [
                    {
                        feedbackId: FeedbackId.PreviewBG,
                        options: {
                            input: src.id,
                            mixeffect: me,
                        },
                        style: {
                            bgcolor: combineRgb(0, 255, 0),
                            color: combineRgb(255, 255, 255),
                        },
                    },
                    {
                        feedbackId: FeedbackId.ProgramBG,
                        style: {
                            bgcolor: combineRgb(255, 0, 0),
                            color: combineRgb(255, 255, 255),
                        },
                        options: {
                            input: src.id,
                            mixeffect: me,
                        },
                    },
                ],
                steps: [
                    {
                        down: [
                            {
                                actionId: ActionId.Preview,
                                options: {
                                    mixeffect: me,
                                    input: src.id,
                                },
                            },
                        ],
                        up: [],
                    },
                ],
            };
            programCategory.presets[`program_me_${me}_${src.id}`] = {
                name: `Program button for ${src.shortName}`,
                type: 'button',
                style: {
                    text: `$(atem:${pstText}${src.id})`,
                    size: pstSize,
                    color: combineRgb(255, 255, 255),
                    bgcolor: combineRgb(0, 0, 0),
                },
                feedbacks: [
                    {
                        feedbackId: FeedbackId.ProgramBG,
                        style: {
                            bgcolor: combineRgb(255, 0, 0),
                            color: combineRgb(255, 255, 255),
                        },
                        options: {
                            input: src.id,
                            mixeffect: me,
                        },
                    },
                ],
                steps: [
                    {
                        down: [
                            {
                                actionId: ActionId.Program,
                                options: {
                                    mixeffect: me,
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
    console.log(result);
    return result;
}
//# sourceMappingURL=programPreview.js.map