import { Regex } from '@companion-module/base';
import { ALL_MODEL_CHOICES } from './models/index.js';
export const fadeFpsDefault = 10;
export var PresetStyleName;
(function (PresetStyleName) {
    PresetStyleName[PresetStyleName["Short"] = 0] = "Short";
    PresetStyleName[PresetStyleName["Long"] = 1] = "Long";
})(PresetStyleName || (PresetStyleName = {}));
export function GetConfigFields(_self) {
    return [
        {
            type: 'static-text',
            id: 'info',
            width: 12,
            label: 'Information',
            value: 'This works with all models of Blackmagic Design ATEM mixers. <br />' +
                'Firmware versions 7.5.2 and later are known to work, other versions may experience problems. <br />' +
                'Firmware versions after 9.4 are not verified to be working at the time of writing, but they likely will work fine. <br />' +
                "In general the model can be left in 'Auto Detect', however a specific model can be selected below for offline programming. <br />" +
                'Devices must be controlled over a network, USB control is NOT supported.',
        },
        {
            type: 'bonjour-device',
            id: 'bonjourHost',
            label: 'Device',
            width: 6,
        },
        {
            type: 'textinput',
            id: 'host',
            label: 'Target IP',
            width: 6,
            isVisible: (options) => !options['bonjourHost'],
            default: '',
            regex: Regex.IP,
        },
        {
            type: 'static-text',
            id: 'host-filler',
            width: 6,
            label: '',
            isVisible: (options) => !!options['bonjourHost'],
            value: '',
        },
        {
            type: 'dropdown',
            id: 'modelID',
            label: 'Model',
            width: 6,
            choices: ALL_MODEL_CHOICES,
            default: 0,
        },
        {
            type: 'static-text',
            id: 'autoModelName',
            label: 'Detected Model',
            width: 6,
            isVisible: (options) => options['modelID'] + '' === '0',
            value: _self.config.autoModelName ?? 'Pending',
        },
        {
            type: 'static-text',
            id: 'autoModelName-filler',
            width: 6,
            label: '',
            isVisible: (options) => options['modelID'] + '' !== '0',
            value: '',
        },
        {
            type: 'dropdown',
            id: 'presets',
            label: 'Preset Style',
            width: 6,
            choices: [
                { id: PresetStyleName.Short, label: 'Short Names' },
                { id: PresetStyleName.Long, label: 'Long Names' },
            ],
            default: PresetStyleName.Short,
        },
        {
            type: 'number',
            id: 'fadeFps',
            label: 'Framerate for fades',
            tooltip: 'Higher is smoother, but has higher impact on system performance',
            width: 6,
            min: 5,
            max: 60,
            step: 1,
            default: fadeFpsDefault,
        },
        {
            type: 'checkbox',
            id: 'enableCameraControl',
            label: 'Enable Camera Control',
            width: 6,
            default: false,
        },
        {
            type: 'checkbox',
            id: 'pollTimecode',
            label: 'Enable Timecode variable',
            width: 6,
            default: false,
        },
    ];
}
//# sourceMappingURL=config.js.map