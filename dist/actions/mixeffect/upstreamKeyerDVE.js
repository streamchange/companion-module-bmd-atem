import { Enums } from 'atem-connection';
import { AtemMEPicker, AtemUSKDVEPropertiesPickers, AtemUSKPicker } from '../../input.js';
import { ActionId } from '../ActionId.js';
import { CHOICES_FLYDIRECTIONS, CHOICES_KEYFRAMES } from '../../choices.js';
import { getUSK } from '../../state.js';
export function createUpstreamKeyerDVEActions(atem, model, state) {
    if (!model.USKs || !model.DVEs) {
        return {
            [ActionId.USKDVEProperties]: undefined,
            [ActionId.USKFly]: undefined,
            [ActionId.USKFlyInfinite]: undefined,
        };
    }
    return {
        [ActionId.USKDVEProperties]: {
            name: 'Upstream key: Change DVE properties',
            options: {
                mixeffect: AtemMEPicker(model, 0),
                key: AtemUSKPicker(model),
                ...AtemUSKDVEPropertiesPickers(),
            },
            callback: async ({ options }) => {
                const keyId = options.getPlainNumber('key');
                const mixEffectId = options.getPlainNumber('mixeffect');
                const newProps = {};
                const props = options.getRaw('properties');
                if (props && Array.isArray(props)) {
                    if (props.includes('maskEnabled')) {
                        newProps.maskEnabled = options.getPlainBoolean('maskEnabled');
                    }
                    if (props.includes('maskTop')) {
                        newProps.maskTop = options.getPlainNumber('maskTop') * 1000;
                    }
                    if (props.includes('maskBottom')) {
                        newProps.maskBottom = options.getPlainNumber('maskBottom') * 1000;
                    }
                    if (props.includes('maskLeft')) {
                        newProps.maskLeft = options.getPlainNumber('maskLeft') * 1000;
                    }
                    if (props.includes('maskRight')) {
                        newProps.maskRight = options.getPlainNumber('maskRight') * 1000;
                    }
                    if (props.includes('sizeX')) {
                        newProps.sizeX = options.getPlainNumber('sizeX') * 1000;
                    }
                    if (props.includes('sizeY')) {
                        newProps.sizeY = options.getPlainNumber('sizeY') * 1000;
                    }
                    if (props.includes('positionX')) {
                        newProps.positionX = options.getPlainNumber('positionX') * 1000;
                    }
                    if (props.includes('positionY')) {
                        newProps.positionY = options.getPlainNumber('positionY') * 1000;
                    }
                    if (props.includes('rotation')) {
                        newProps.rotation = options.getPlainNumber('rotation');
                    }
                    if (props.includes('borderOuterWidth')) {
                        newProps.borderOuterWidth = options.getPlainNumber('borderOuterWidth') * 100;
                    }
                    if (props.includes('borderInnerWidth')) {
                        newProps.borderInnerWidth = options.getPlainNumber('borderInnerWidth') * 100;
                    }
                    if (props.includes('borderOuterSoftness')) {
                        newProps.borderOuterSoftness = options.getPlainNumber('borderOuterSoftness');
                    }
                    if (props.includes('borderInnerSoftness')) {
                        newProps.borderInnerSoftness = options.getPlainNumber('borderInnerSoftness');
                    }
                    if (props.includes('borderBevelSoftness')) {
                        newProps.borderBevelSoftness = options.getPlainNumber('borderBevelSoftness');
                    }
                    if (props.includes('borderBevelPosition')) {
                        newProps.borderBevelPosition = options.getPlainNumber('borderBevelPosition');
                    }
                    if (props.includes('borderOpacity')) {
                        newProps.borderOpacity = options.getPlainNumber('borderOpacity');
                    }
                    if (props.includes('borderHue')) {
                        newProps.borderHue = options.getPlainNumber('borderHue') * 10;
                    }
                    if (props.includes('borderSaturation')) {
                        newProps.borderSaturation = options.getPlainNumber('borderSaturation') * 10;
                    }
                    if (props.includes('borderLuma')) {
                        newProps.borderLuma = options.getPlainNumber('borderLuma') * 10;
                    }
                    if (props.includes('lightSourceDirection')) {
                        newProps.lightSourceDirection = options.getPlainNumber('lightSourceDirection') * 10;
                    }
                    if (props.includes('lightSourceAltitude')) {
                        newProps.lightSourceAltitude = options.getPlainNumber('lightSourceAltitude');
                    }
                    if (props.includes('borderEnabled')) {
                        newProps.borderEnabled = options.getPlainBoolean('borderEnabled');
                    }
                    if (props.includes('shadowEnabled')) {
                        newProps.shadowEnabled = options.getPlainBoolean('shadowEnabled');
                    }
                    if (props.includes('borderBevel')) {
                        newProps.borderBevel = options.getPlainNumber('borderBevel');
                    }
                    if (props.includes('rate')) {
                        newProps.rate = options.getPlainNumber('rate');
                    }
                }
                if (Object.keys(newProps).length === 0)
                    return;
                await atem?.setUpstreamKeyerDVESettings(newProps, mixEffectId, keyId);
            },
            learn: ({ options }) => {
                const usk = getUSK(state.state, options.getPlainNumber('mixeffect'), options.getPlainNumber('key'));
                if (usk?.dveSettings) {
                    return {
                        ...options.getJson(),
                        maskEnabled: usk.dveSettings.maskEnabled,
                        maskTop: usk.dveSettings.maskTop / 1000,
                        maskBottom: usk.dveSettings.maskBottom / 1000,
                        maskLeft: usk.dveSettings.maskLeft / 1000,
                        maskRight: usk.dveSettings.maskRight / 1000,
                        sizeX: usk.dveSettings.sizeX / 1000,
                        sizeY: usk.dveSettings.sizeY / 1000,
                        positionX: usk.dveSettings.positionX / 1000,
                        positionY: usk.dveSettings.positionY / 1000,
                        rotation: usk.dveSettings.rotation,
                        borderOuterWidth: usk.dveSettings.borderOuterWidth / 100,
                        borderInnerWidth: usk.dveSettings.borderInnerWidth / 100,
                        borderOuterSoftness: usk.dveSettings.borderOuterSoftness,
                        borderInnerSoftness: usk.dveSettings.borderInnerSoftness,
                        borderBevelSoftness: usk.dveSettings.borderBevelSoftness,
                        borderBevelPosition: usk.dveSettings.borderBevelPosition,
                        borderOpacity: usk.dveSettings.borderOpacity,
                        borderHue: usk.dveSettings.borderHue / 10,
                        borderSaturation: usk.dveSettings.borderSaturation / 10,
                        borderLuma: usk.dveSettings.borderLuma / 10,
                        lightSourceDirection: usk.dveSettings.lightSourceDirection / 10,
                        lightSourceAltitude: usk.dveSettings.lightSourceAltitude,
                        borderEnabled: usk.dveSettings.borderEnabled,
                        shadowEnabled: usk.dveSettings.shadowEnabled,
                        borderBevel: usk.dveSettings.borderBevel,
                        rate: usk.dveSettings.rate,
                    };
                }
                else {
                    return undefined;
                }
            },
        },
        [ActionId.USKFly]: {
            name: 'Upstream key: fly to keyframe',
            options: {
                mixeffect: AtemMEPicker(model, 0),
                key: AtemUSKPicker(model),
                keyframe: {
                    type: 'dropdown',
                    id: 'keyframe',
                    label: 'Key Frame',
                    choices: CHOICES_KEYFRAMES,
                    default: CHOICES_KEYFRAMES[0].id,
                },
            },
            callback: async ({ options }) => {
                await atem?.runUpstreamKeyerFlyKeyTo(options.getPlainNumber('mixeffect'), options.getPlainNumber('key'), options.getPlainNumber('keyframe'));
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
        },
        [ActionId.USKFlyInfinite]: {
            name: 'Upstream key: fly to infinite',
            options: {
                mixeffect: AtemMEPicker(model, 0),
                key: AtemUSKPicker(model),
                flydirection: {
                    type: 'dropdown',
                    id: 'flydirection',
                    label: 'Fly direction',
                    choices: CHOICES_FLYDIRECTIONS,
                    default: CHOICES_FLYDIRECTIONS[0].id,
                },
            },
            callback: async ({ options }) => {
                await atem?.runUpstreamKeyerFlyKeyToInfinite(options.getPlainNumber('mixeffect'), options.getPlainNumber('key'), options.getPlainNumber('flydirection'));
            },
            learn: ({ options }) => {
                const usk = getUSK(state.state, options.getPlainNumber('mixeffect'), options.getPlainNumber('key'));
                if (usk?.flyProperties) {
                    return {
                        ...options.getJson(),
                        flydirection: usk.flyProperties.runToInfiniteIndex,
                    };
                }
                else {
                    return undefined;
                }
            },
        },
    };
}
//# sourceMappingURL=upstreamKeyerDVE.js.map