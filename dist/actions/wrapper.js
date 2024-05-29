import { MyOptionsHelperImpl } from '../common.js';
function rewrapActionInfo(action, context, fields) {
    return {
        id: action.id,
        controlId: action.controlId,
        actionId: action.actionId,
        options: new MyOptionsHelperImpl(action.options, context, fields),
    };
}
function convertMyActionToCompanionAction(actionDef) {
    const { subscribe, unsubscribe, learn } = actionDef;
    return {
        name: actionDef.name,
        description: actionDef.description,
        options: Object.entries(actionDef.options)
            .filter((o) => !!o[1])
            .map(([id, option]) => ({
            ...option,
            id,
        })),
        callback: async (action, context) => {
            return actionDef.callback({
                ...rewrapActionInfo(action, context, actionDef.options),
                surfaceId: action.surfaceId,
            }, context);
        },
        subscribe: subscribe
            ? async (action, context) => {
                return subscribe(rewrapActionInfo(action, context, actionDef.options), context);
            }
            : undefined,
        unsubscribe: unsubscribe
            ? async (action, context) => {
                return unsubscribe(rewrapActionInfo(action, context, actionDef.options), context);
            }
            : undefined,
        learn: learn
            ? async (action, context) => {
                return learn({
                    ...rewrapActionInfo(action, context, actionDef.options),
                    surfaceId: action.surfaceId,
                }, context);
            }
            : undefined,
        learnTimeout: undefined,
    };
}
export function convertMyActionDefinitions(actionDefs) {
    const res = {};
    for (const [id, def] of Object.entries(actionDefs)) {
        ;
        res[id] = def ? convertMyActionToCompanionAction(def) : undefined;
    }
    return res;
}
//# sourceMappingURL=wrapper.js.map