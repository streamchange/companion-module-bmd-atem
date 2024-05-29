import {} from 'atem-connection';
import { ActionId } from '../ActionId.js';
import { AtemCameraControlDirectCommandSender } from '@atem-connection/camera-control';
import { CHOICES_ON_OFF_TOGGLE, CameraControlSourcePicker } from '../../choices.js';
export function createCameraControlDisplayActions(config, atem, state) {
    if (!config.enableCameraControl) {
        return {
            [ActionId.CameraControlDisplayColorBars]: undefined,
        };
    }
    const commandSender = atem && new AtemCameraControlDirectCommandSender(atem);
    return {
        [ActionId.CameraControlDisplayColorBars]: {
            name: 'Camera Control: Show Color Bars',
            options: {
                cameraId: CameraControlSourcePicker(),
                state: {
                    id: 'state',
                    type: 'dropdown',
                    label: 'State',
                    default: 'toggle',
                    choices: CHOICES_ON_OFF_TOGGLE,
                },
            },
            callback: async ({ options }) => {
                const cameraId = await options.getParsedNumber('cameraId');
                let target;
                if (options.getPlainString('state') === 'toggle') {
                    const cameraState = state.atemCameraState.get(cameraId);
                    target = !cameraState?.display?.colorBarEnable;
                    console.log('camera', cameraState, target);
                }
                else {
                    target = options.getPlainString('state') === 'true';
                }
                await commandSender?.displayColorBars(cameraId, target);
            },
        },
    };
}
//# sourceMappingURL=display.js.map