import { AtemKeyFillSourcePicker, AtemMEPicker, AtemUSKPicker, AtemUpstreamKeyerTypePicker } from '../../input.js';
import { FeedbackId } from '../FeedbackId.js';
import { combineRgb } from '@companion-module/base';
import { getUSK } from '../../state.js';
import { CHOICES_CURRENTKEYFRAMES } from '../../choices.js';
export function createUpstreamKeyerFeedbacks(model, state) {
    if (!model.USKs) {
        return {
            [FeedbackId.USKOnAir]: undefined,
            [FeedbackId.USKType]: undefined,
            [FeedbackId.USKSource]: undefined,
            [FeedbackId.USKSourceVariables]: undefined,
            [FeedbackId.USKKeyFrame]: undefined,
        };
    }
    return {
        [FeedbackId.USKOnAir]: {
            type: 'boolean',
            name: 'Upstream key: OnAir state',
            description: 'If the specified upstream keyer is active, change style of the bank',
            options: {
                mixeffect: AtemMEPicker(model, 0),
                key: AtemUSKPicker(model),
            },
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(255, 0, 0),
            },
            callback: ({ options }) => {
                const usk = getUSK(state.state, options.getPlainNumber('mixeffect'), options.getPlainNumber('key'));
                return !!usk?.onAir;
            },
        },
        [FeedbackId.USKType]: {
            type: 'boolean',
            name: 'Upstream key: Key type',
            description: 'If the specified upstream keyer has the specified type, change style of the bank',
            options: {
                mixeffect: AtemMEPicker(model, 0),
                key: AtemUSKPicker(model),
                type: AtemUpstreamKeyerTypePicker(),
            },
            defaultStyle: {
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(255, 0, 0),
            },
            callback: ({ options }) => {
                const usk = getUSK(state.state, options.getPlainNumber('mixeffect'), options.getPlainNumber('key'));
                return usk?.mixEffectKeyType === options.getPlainNumber('type');
            },
        },
        [FeedbackId.USKSource]: {
            type: 'boolean',
            name: 'Upstream key: Fill source',
            description: 'If the input specified is selected in the USK specified, change style of the bank',
            options: {
                mixeffect: AtemMEPicker(model, 0),
                key: AtemUSKPicker(model),
                fill: AtemKeyFillSourcePicker(model, state.state),
            },
            defaultStyle: {
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(238, 238, 0),
            },
            callback: ({ options }) => {
                const usk = getUSK(state.state, options.getPlainNumber('mixeffect'), options.getPlainNumber('key'));
                return usk?.fillSource === options.getPlainNumber('fill');
            },
            learn: ({ options }) => {
                const usk = getUSK(state.state, options.getPlainNumber('mixeffect'), options.getPlainNumber('key'));
                if (usk) {
                    return {
                        ...options.getJson(),
                        fill: usk.fillSource,
                    };
                }
                else {
                    return undefined;
                }
            },
        },
        [FeedbackId.USKSourceVariables]: {
            type: 'boolean',
            name: 'Upstream key: Fill source from variables',
            description: 'If the input specified is selected in the USK specified, change style of the bank',
            options: {
                mixeffect: {
                    type: 'textinput',
                    id: 'mixeffect',
                    label: 'M/E',
                    default: '1',
                    useVariables: true,
                },
                key: {
                    type: 'textinput',
                    label: 'Key',
                    id: 'key',
                    default: '1',
                    useVariables: true,
                },
                fill: {
                    type: 'textinput',
                    id: 'fill',
                    label: 'Fill Source',
                    default: '0',
                    useVariables: true,
                },
            },
            defaultStyle: {
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(238, 238, 0),
            },
            callback: async ({ options }) => {
                const mixeffect = (await options.getParsedNumber('mixeffect')) - 1;
                const key = (await options.getParsedNumber('key')) - 1;
                const fill = await options.getParsedNumber('fill');
                const usk = getUSK(state.state, mixeffect, key);
                return usk?.fillSource === fill;
            },
            learn: async ({ options }) => {
                const mixeffect = (await options.getParsedNumber('mixeffect')) - 1;
                const key = (await options.getParsedNumber('key')) - 1;
                const usk = getUSK(state.state, mixeffect, key);
                if (usk) {
                    return {
                        ...options.getJson(),
                        fill: usk.fillSource + '',
                    };
                }
                else {
                    return undefined;
                }
            },
        },
        [FeedbackId.USKKeyFrame]: model.DVEs
            ? {
                type: 'boolean',
                name: 'Upstream key: Key frame',
                description: 'If the USK specified is at the Key Frame specified, change style of the bank',
                options: {
                    mixeffect: AtemMEPicker(model, 0),
                    key: AtemUSKPicker(model),
                    keyframe: {
                        type: 'dropdown',
                        id: 'keyframe',
                        label: 'Key Frame',
                        choices: CHOICES_CURRENTKEYFRAMES,
                        default: CHOICES_CURRENTKEYFRAMES[0].id,
                    },
                },
                defaultStyle: {
                    color: combineRgb(0, 0, 0),
                    bgcolor: combineRgb(238, 238, 0),
                },
                callback: ({ options }) => {
                    const usk = getUSK(state.state, options.getPlainNumber('mixeffect'), options.getPlainNumber('key'));
                    return usk?.flyProperties?.isAtKeyFrame === Number(options.getPlainNumber('keyframe'));
                },
                learn: ({ options }) => {
                    const usk = getUSK(state.state, options.getPlainNumber('mixeffect'), options.getPlainNumber('key'));
                    if (usk?.flyProperties) {
                        return {
                            ...options.getJson(),
                            keyframe: usk.flyProperties.isAtKeyFrame,
                        };
                    }
                    else {
                        return undefined;
                    }
                },
            }
            : undefined,
    };
}
//# sourceMappingURL=usk.js.map