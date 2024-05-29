// import { Enums } from 'atem-connection'
import { ModelSpecConstellationHD2ME } from './constellationHd2Me.js';
export const ModelSpecConstellation4K2ME = {
    ...ModelSpecConstellationHD2ME,
    id: 29,
    label: '2 M/E Constellation 4K',
    fairlightAudio: {
        ...ModelSpecConstellationHD2ME.fairlightAudio,
        audioRouting: true,
    },
};
//# sourceMappingURL=constellation4K2Me.js.map