import { CreateConvertToBooleanFeedbackUpgradeScript, CreateUseBuiltinInvertForFeedbacksUpgradeScript, } from '@companion-module/base';
import { ActionId } from './actions/ActionId.js';
import { FeedbackId } from './feedback/FeedbackId.js';
function scaleValue(obj, key, scale) {
    if (obj[key] !== undefined) {
        obj[key] = parseFloat(obj[key]) * scale;
    }
}
function upgradeV2x2x0(_context, props) {
    const result = {
        updatedActions: [],
        updatedConfig: null,
        updatedFeedbacks: [],
    };
    for (const action of props.actions) {
        if (action.actionId === ActionId.SuperSourceBoxProperties) {
            scaleValue(action.options, 'size', 0.001);
            scaleValue(action.options, 'x', 0.01);
            scaleValue(action.options, 'y', 0.01);
            scaleValue(action.options, 'cropTop', 0.001);
            scaleValue(action.options, 'cropBottom', 0.001);
            scaleValue(action.options, 'cropLeft', 0.001);
            scaleValue(action.options, 'cropRight', 0.001);
            result.updatedActions.push(action);
        }
    }
    for (const feedback of props.feedbacks) {
        if (feedback.feedbackId === FeedbackId.SSrcBoxProperties) {
            scaleValue(feedback.options, 'size', 0.001);
            scaleValue(feedback.options, 'x', 0.01);
            scaleValue(feedback.options, 'y', 0.01);
            scaleValue(feedback.options, 'cropTop', 0.001);
            scaleValue(feedback.options, 'cropBottom', 0.001);
            scaleValue(feedback.options, 'cropLeft', 0.001);
            scaleValue(feedback.options, 'cropRight', 0.001);
            result.updatedFeedbacks.push(feedback);
        }
    }
    return result;
}
const BooleanFeedbackUpgradeMap = {
    [FeedbackId.PreviewBG]: true,
    [FeedbackId.PreviewBG2]: true,
    [FeedbackId.PreviewBG3]: true,
    [FeedbackId.PreviewBG4]: true,
    [FeedbackId.ProgramBG]: true,
    [FeedbackId.ProgramBG2]: true,
    [FeedbackId.ProgramBG3]: true,
    [FeedbackId.ProgramBG4]: true,
    [FeedbackId.AuxBG]: true,
    [FeedbackId.USKOnAir]: true,
    [FeedbackId.USKSource]: true,
    [FeedbackId.DSKOnAir]: true,
    [FeedbackId.DSKTie]: true,
    [FeedbackId.DSKSource]: true,
    [FeedbackId.Macro]: true,
    [FeedbackId.MVSource]: true,
    [FeedbackId.SSrcBoxOnAir]: true,
    [FeedbackId.SSrcBoxSource]: true,
    [FeedbackId.SSrcBoxProperties]: true,
    [FeedbackId.TransitionStyle]: true,
    [FeedbackId.TransitionSelection]: true,
    [FeedbackId.TransitionRate]: true,
    [FeedbackId.InTransition]: true,
    [FeedbackId.MediaPlayerSource]: true,
    [FeedbackId.FadeToBlackIsBlack]: true,
    [FeedbackId.FadeToBlackRate]: true,
    [FeedbackId.ProgramTally]: true,
    [FeedbackId.PreviewTally]: true,
    [FeedbackId.StreamStatus]: true,
    [FeedbackId.RecordStatus]: true,
    [FeedbackId.ClassicAudioGain]: true,
    [FeedbackId.ClassicAudioMixOption]: true,
    [FeedbackId.FairlightAudioFaderGain]: true,
    [FeedbackId.FairlightAudioInputGain]: true,
    [FeedbackId.FairlightAudioMixOption]: true,
};
function upgradeAddSSrcPropertiesPicker(_context, props) {
    const result = {
        updatedActions: [],
        updatedConfig: null,
        updatedFeedbacks: [],
    };
    for (const action of props.actions) {
        if (action.actionId === ActionId.SuperSourceBoxProperties && !action.options.properties) {
            action.options.properties = ['size', 'x', 'y', 'cropEnable', 'cropTop', 'cropLeft', 'cropRight', 'cropBottom'];
            result.updatedActions.push(action);
        }
        else if (action.actionId === ActionId.SuperSourceArt && !action.options.properties) {
            action.options.properties = ['fill', 'key', 'artOption'];
            result.updatedActions.push(action);
        }
    }
    for (const feedback of props.feedbacks) {
        if (feedback.feedbackId === FeedbackId.SSrcBoxProperties && !feedback.options.properties) {
            feedback.options.properties = ['size', 'x', 'y', 'cropEnable', 'cropTop', 'cropLeft', 'cropRight', 'cropBottom'];
            result.updatedFeedbacks.push(feedback);
        }
    }
    return result;
}
function fixUsingFairlightAudioFaderGainInsteadOfFairlightAudioMonitorFaderGain(_context, props) {
    const result = {
        updatedActions: [],
        updatedConfig: null,
        updatedFeedbacks: [],
    };
    for (const feedback of props.feedbacks) {
        if (feedback.feedbackId === FeedbackId.FairlightAudioFaderGain && feedback.options['input'] === undefined) {
            feedback.feedbackId = FeedbackId.FairlightAudioMonitorOutputFaderGain;
            result.updatedFeedbacks.push(feedback);
        }
    }
    return result;
}
const InvertableFeedbackUpgradeMap = {
    [FeedbackId.ProgramTally]: 'invert',
    [FeedbackId.PreviewTally]: 'invert',
    [FeedbackId.DSKOnAir]: 'invert',
    [FeedbackId.DSKTie]: 'invert',
    [FeedbackId.USKOnAir]: 'invert',
};
function combineTransitionSelectionToDropdown(_context, props) {
    const result = {
        updatedActions: [],
        updatedConfig: null,
        updatedFeedbacks: [],
    };
    const convertSelection = (options) => {
        options.selection = [];
        if (options.background)
            options.selection.push('background');
        delete options.background;
        for (const key of Object.keys(options)) {
            if (key.startsWith('key')) {
                if (options[key])
                    options.selection.push(key);
                delete options[key];
            }
        }
    };
    for (const action of props.actions) {
        if (action.actionId === ActionId.TransitionSelection && action.options['selection'] === undefined) {
            convertSelection(action.options);
            result.updatedActions.push(action);
        }
    }
    for (const feedback of props.feedbacks) {
        if (feedback.feedbackId === FeedbackId.TransitionSelection && feedback.options['selection'] === undefined) {
            convertSelection(feedback.options);
            result.updatedFeedbacks.push(feedback);
        }
    }
    return result;
}
export const UpgradeScripts = [
    upgradeV2x2x0,
    CreateConvertToBooleanFeedbackUpgradeScript(BooleanFeedbackUpgradeMap),
    upgradeAddSSrcPropertiesPicker,
    fixUsingFairlightAudioFaderGainInsteadOfFairlightAudioMonitorFaderGain,
    CreateUseBuiltinInvertForFeedbacksUpgradeScript(InvertableFeedbackUpgradeMap),
    combineTransitionSelectionToDropdown,
];
//# sourceMappingURL=upgrades.js.map