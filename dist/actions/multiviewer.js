import { Enums } from 'atem-connection';
import { ActionId } from './ActionId.js';
import { getMultiviewer, getMultiviewerWindow } from '../state.js';
import { AtemMultiviewerPicker, AtemMultiviewWindowPicker, AtemMultiviewSourcePicker } from '../input.js';
import { assertNever } from '@companion-module/base';
const ChoicesMultiviewerQuadrantState = [
    { id: 'ignore', label: 'Unchanged' },
    { id: 'toggle', label: 'Toggle' },
    { id: 'single', label: 'Single' },
    { id: 'quad', label: 'Quad' },
];
export function createMultiviewerActions(atem, model, state) {
    if (!model.MVs) {
        return {
            [ActionId.MultiviewerWindowSource]: undefined,
            [ActionId.MultiviewerWindowSourceVariables]: undefined,
            [ActionId.MultiviewerLayout]: undefined,
        };
    }
    return {
        [ActionId.MultiviewerWindowSource]: {
            name: 'Multiviewer: Change window source',
            options: {
                multiViewerId: AtemMultiviewerPicker(model),
                windowIndex: AtemMultiviewWindowPicker(model),
                source: AtemMultiviewSourcePicker(model, state.state),
            },
            callback: async ({ options }) => {
                await atem?.setMultiViewerWindowSource(options.getPlainNumber('source'), options.getPlainNumber('multiViewerId'), options.getPlainNumber('windowIndex'));
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
        [ActionId.MultiviewerWindowSourceVariables]: {
            name: 'Multiviewer: Change window source from variables',
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
            callback: async ({ options }) => {
                const multiViewerId = (await options.getParsedNumber('multiViewerId')) - 1;
                const windowIndex = (await options.getParsedNumber('windowIndex')) - 1;
                const source = await options.getParsedNumber('source');
                if (isNaN(multiViewerId) || isNaN(windowIndex) || isNaN(source))
                    return;
                await atem?.setMultiViewerWindowSource(source, multiViewerId, windowIndex);
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
        [ActionId.MultiviewerLayout]: {
            name: 'Multiviewer: Change layout',
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
            callback: async ({ options }) => {
                const multiViewerId = (await options.getParsedNumber('multiViewerId')) - 1;
                const mv = getMultiviewer(state.state, multiViewerId);
                let layout = mv?.properties?.layout ?? Enums.MultiViewerLayout.Default;
                const updateLayout = (selected, value) => {
                    if (selected === 'toggle')
                        selected = layout & value ? 'single' : 'quad';
                    switch (selected) {
                        case 'ignore':
                            break;
                        case 'single':
                            layout = ~(~layout | value);
                            break;
                        case 'quad':
                            layout = layout | value;
                            break;
                        default:
                            assertNever(selected);
                            break;
                    }
                };
                updateLayout(options.getPlainString('topLeft'), Enums.MultiViewerLayout.TopLeftSmall);
                updateLayout(options.getPlainString('topRight'), Enums.MultiViewerLayout.TopRightSmall);
                updateLayout(options.getPlainString('bottomLeft'), Enums.MultiViewerLayout.BottomLeftSmall);
                updateLayout(options.getPlainString('bottomRight'), Enums.MultiViewerLayout.BottomRightSmall);
                if (isNaN(multiViewerId) || isNaN(layout))
                    return;
                await atem?.setMultiViewerProperties({ layout }, multiViewerId);
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