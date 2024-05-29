function wrapAction(action) {
    return {
        actionId: String(action.actionId),
        options: action.options,
        delay: action.delay,
    };
}
function wrapStep(step) {
    const res = {
        up: step.up.map(wrapAction),
        down: step.down.map(wrapAction),
        rotate_left: step.rotate_left?.map(wrapAction),
        rotate_right: step.rotate_right?.map(wrapAction),
    };
    const keys = Object.keys(step)
        .map((k) => Number(k))
        .filter((k) => !isNaN(k));
    for (const delay of keys) {
        const src = step[delay];
        if (!src)
            continue;
        res[delay] = Array.isArray(src)
            ? src.map(wrapAction)
            : ({
                options: src.options,
                actions: src.actions.map(wrapAction),
            });
    }
    return res;
}
function convertMyPresetToCompanionPreset(rawPreset, category) {
    return {
        type: rawPreset.type,
        name: rawPreset.name,
        category: category.name,
        style: rawPreset.style,
        previewStyle: rawPreset.previewStyle,
        options: rawPreset.options,
        feedbacks: rawPreset.feedbacks.map((feedback) => ({
            feedbackId: String(feedback.feedbackId),
            options: feedback.options,
            style: feedback.style,
            isInverted: feedback.isInverted,
        })),
        steps: rawPreset.steps.map(wrapStep),
    };
}
export function convertMyPresetDefinitions(presets) {
    const res = {};
    for (const category of presets) {
        if (!category)
            continue;
        for (const [id, preset] of Object.entries(category.presets)) {
            if (!preset)
                continue;
            res[id] = convertMyPresetToCompanionPreset(preset, category);
        }
    }
    return res;
}
//# sourceMappingURL=wrapper.js.map