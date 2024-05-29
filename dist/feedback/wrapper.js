import { assertNever } from '@companion-module/base/dist/util.js';
import { MyOptionsHelperImpl } from '../common.js';
function rewrapFeedbackInfo(feedback, context, fields) {
    return {
        type: feedback.type,
        id: feedback.id,
        controlId: feedback.controlId,
        feedbackId: feedback.feedbackId,
        options: new MyOptionsHelperImpl(feedback.options, context, fields),
    };
}
function convertMyFeedbackBaseToCompanionFeedback(feedbackDef) {
    const { subscribe, unsubscribe, learn } = feedbackDef;
    return {
        name: feedbackDef.name,
        description: feedbackDef.description,
        options: Object.entries(feedbackDef.options)
            .filter((o) => !!o[1])
            .map(([id, option]) => ({
            ...option,
            id,
        })),
        // callback: async (action, context) => {
        // 	return feedbackDef.callback(
        // 		{
        // 			...rewrapActionInfo(action, context, feedbackDef.options),
        // 			surfaceId: action.surfaceId,
        // 		} satisfies Complete<MyFeedbackEvent<TOptions>>,
        // 		context
        // 	)
        // },
        subscribe: subscribe
            ? async (action, context) => {
                return subscribe(rewrapFeedbackInfo(action, context, feedbackDef.options), context);
            }
            : undefined,
        unsubscribe: unsubscribe
            ? async (action, context) => {
                return unsubscribe(rewrapFeedbackInfo(action, context, feedbackDef.options), context);
            }
            : undefined,
        learn: learn
            ? async (action, context) => {
                return learn(rewrapFeedbackInfo(action, context, feedbackDef.options), context);
            }
            : undefined,
        learnTimeout: undefined,
    };
}
export function convertMyFeedbackDefinitions(feedbackDefs) {
    const res = {};
    for (const [id, def] of Object.entries(feedbackDefs)) {
        let newDef;
        switch (def?.type) {
            case undefined:
                newDef = undefined;
                break;
            case 'boolean':
                newDef = {
                    ...convertMyFeedbackBaseToCompanionFeedback(def),
                    type: 'boolean',
                    defaultStyle: def.defaultStyle,
                    showInvert: def.showInvert,
                    callback: async (feedback, context) => {
                        return def.callback({
                            ...rewrapFeedbackInfo(feedback, context, def.options),
                        }, context);
                    },
                };
                break;
            case 'advanced':
                newDef = {
                    ...convertMyFeedbackBaseToCompanionFeedback(def),
                    type: 'advanced',
                    callback: async (feedback, context) => {
                        return def.callback({
                            ...rewrapFeedbackInfo(feedback, context, def.options),
                            image: feedback.image,
                        }, context);
                    },
                };
                break;
            default:
                assertNever(def);
                break;
        }
        ;
        res[id] = newDef; //def ? convertMyFeedbackToCompanionFeedback(def) : undefined
    }
    return res;
}
//# sourceMappingURL=wrapper.js.map