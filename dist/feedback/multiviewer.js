import { AtemMultiviewSourcePicker, AtemMultiviewWindowPicker, AtemMultiviewerPicker } from '../input.js';
import { FeedbackId } from './FeedbackId.js';
import { assertNever, combineRgb } from '@companion-module/base';
import { getMultiviewer, getMultiviewerWindow } from '../state.js';
import { Enums } from 'atem-connection';
const ChoicesMultiviewerQuadrantState = [
    { id: 'ignore', label: 'Ignored' },
    { id: 'single', label: 'Single' },
    { id: 'quad', label: 'Quad' },
];
export function createMultiviewerFeedbacks(model, state) {
    if (!model.MVs) {
        return {
            [FeedbackId.MVSource]: undefined,
            [FeedbackId.MVSourceVariables]: undefined,
            [FeedbackId.MultiviewerLayout]: undefined,
        };
    }
    return {
        [FeedbackId.MVSource]: {
            type: 'boolean',
            name: 'Multiviewer: Window source',
            description: 'If the specified MV window is set to the specified source, change style of the bank',
            options: {
                multiViewerId: AtemMultiviewerPicker(model),
                windowIndex: AtemMultiviewWindowPicker(model),
                source: AtemMultiviewSourcePicker(model, state.state),
            },
            defaultStyle: {
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0),
            },
            callback: ({ options }) => {
                const window = getMultiviewerWindow(state.state, options.getPlainNumber('multiViewerId'), options.getPlainNumber('windowIndex'));
                return window?.source === options.getPlainNumber('source');
            },
            learn: ({ options }) => {
                const window = getMultiviewerWindow(state.state, options.getPlainNumber('multiViewerId'), options.getPlainNumber('windowIndex'));
                if (window) {
                    return {
                        ...options.getJson(),
                        source: window.source,
                    };
                }
                else {
                    return undefined;
                }
            },
        },
        [FeedbackId.MVSourceVariables]: {
            type: 'boolean',
            name: 'Multiviewer: Window source from variables',
            description: 'If the specified MV window is set to the specified source, change style of the bank',
            options: {
                multiViewerId: {
                    type: 'textinput',
                    id: 'multiViewerId',
                    label: 'MV',
                    default: '1',
                    useVariables: true,
                },
                windowIndex: {
                    type: 'textinput',
                    id: 'windowIndex',
                    label: 'Window #',
                    default: '1',
                    useVariables: true,
                },
                source: {
                    type: 'textinput',
                    id: 'source',
                    label: 'Source',
                    default: '1',
                    useVariables: true,
                },
            },
            defaultStyle: {
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0),
            },
            callback: async ({ options }) => {
                const multiViewerId = (await options.getParsedNumber('multiViewerId')) - 1;
                const windowIndex = (await options.getParsedNumber('windowIndex')) - 1;
                const source = await options.getParsedNumber('source');
                const window = getMultiviewerWindow(state.state, multiViewerId, windowIndex);
                return window?.source === source;
            },
            learn: async ({ options }) => {
                const multiViewerId = (await options.getParsedNumber('multiViewerId')) - 1;
                const windowIndex = (await options.getParsedNumber('windowIndex')) - 1;
                const window = getMultiviewerWindow(state.state, multiViewerId, windowIndex);
                if (window) {
                    return {
                        ...options.getJson(),
                        source: window.source + '',
                    };
                }
                else {
                    return undefined;
                }
            },
        },
        [FeedbackId.MultiviewerLayout]: {
            type: 'boolean',
            name: 'Multiviewer: Layout',
            options: {
                multiViewerId: {
                    type: 'textinput',
                    id: 'multiViewerId',
                    label: 'MV',
                    default: '1',
                    useVariables: true,
                },
                topLeft: {
                    id: 'topLeft',
                    type: 'dropdown',
                    label: 'Top left',
                    choices: ChoicesMultiviewerQuadrantState,
                    default: 'ignore',
                },
                topRight: {
                    id: 'topRight',
                    type: 'dropdown',
                    label: 'Top right',
                    choices: ChoicesMultiviewerQuadrantState,
                    default: 'ignore',
                },
                bottomLeft: {
                    id: 'bottomLeft',
                    type: 'dropdown',
                    label: 'Bottom left',
                    choices: ChoicesMultiviewerQuadrantState,
                    default: 'ignore',
                },
                bottomRight: {
                    id: 'bottomRight',
                    type: 'dropdown',
                    label: 'Bottom right',
                    choices: ChoicesMultiviewerQuadrantState,
                    default: 'ignore',
                },
            },
            defaultStyle: {
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0),
            },
            callback: async ({ options }) => {
                const multiViewerId = (await options.getParsedNumber('multiViewerId')) - 1;
                const mv = getMultiviewer(state.state, multiViewerId);
                const layout = mv?.properties?.layout ?? Enums.MultiViewerLayout.Default;
                const checkMatches = (selected, value) => {
                    switch (selected) {
                        case 'ignore':
                            return true;
                        case 'single':
                            return (layout & value) == 0;
                        case 'quad':
                            return (layout & value) > 0;
                        default:
                            assertNever(selected);
                            return false;
                    }
                };
                return (checkMatches(options.getPlainString('topLeft'), Enums.MultiViewerLayout.TopLeftSmall) &&
                    checkMatches(options.getPlainString('topRight'), Enums.MultiViewerLayout.TopRightSmall) &&
                    checkMatches(options.getPlainString('bottomLeft'), Enums.MultiViewerLayout.BottomLeftSmall) &&
                    checkMatches(options.getPlainString('bottomRight'), Enums.MultiViewerLayout.BottomRightSmall));
            },
            learn: async ({ options }) => {
                const multiViewerId = (await options.getParsedNumber('multiViewerId')) - 1;
                const mv = getMultiviewer(state.state, multiViewerId);
                if (mv?.properties) {
                    const layout = mv.properties.layout;
                    const getState = (value) => (layout & value ? 'quad' : 'single');
                    return {
                        ...options.getJson(),
                        topLeft: getState(Enums.MultiViewerLayout.TopLeftSmall),
                        topRight: getState(Enums.MultiViewerLayout.TopRightSmall),
                        bottomLeft: getState(Enums.MultiViewerLayout.BottomLeftSmall),
                        bottomRight: getState(Enums.MultiViewerLayout.BottomRightSmall),
                    };
                }
                else {
                    return undefined;
                }
            },
        },
    };
}
//# sourceMappingURL=multiviewer.js.map