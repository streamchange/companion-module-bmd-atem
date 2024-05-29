import {} from 'atem-connection';
import { AtemMEPicker, AtemRatePicker } from '../../input.js';
import { ActionId } from '../ActionId.js';
import { getMixEffect } from '../../state.js';
export function createFadeToBlackActions(atem, model, state) {
    return {
        [ActionId.FadeToBlackAuto]: {
            name: 'Fade to black: Run AUTO Transition',
            options: {
                mixeffect: AtemMEPicker(model, 0),
            },
            callback: async ({ options }) => {
                await atem?.fadeToBlack(options.getPlainNumber('mixeffect'));
            },
        },
        [ActionId.FadeToBlackRate]: {
            name: 'Fade to black: Change rate',
            options: {
                mixeffect: AtemMEPicker(model, 0),
                rate: AtemRatePicker('Rate'),
            },
            callback: async ({ options }) => {
                await atem?.setFadeToBlackRate(options.getPlainNumber('rate'), options.getPlainNumber('mixeffect'));
            },
            learn: ({ options }) => {
                const me = getMixEffect(state.state, options.getPlainNumber('mixeffect'));
                if (me?.fadeToBlack) {
                    return {
                        ...options.getJson(),
                        rate: me.fadeToBlack.rate,
                    };
                }
                else {
                    return undefined;
                }
            },
        },
    };
}
//# sourceMappingURL=fadeToBlack.js.map