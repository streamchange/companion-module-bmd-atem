// import { Enums } from 'atem-connection'
import { ModelSpecConstellationHD1ME } from './constellationHd1Me.js';
export const ModelSpecConstellation4K1ME = {
    ...ModelSpecConstellationHD1ME,
    id: 28,
    label: '1 M/E Constellation 4K',
    fairlightAudio: {
        ...ModelSpecConstellationHD1ME.fairlightAudio,
        audioRouting: true,
    },
};
//# sourceMappingURL=constellation4K1Me.js.map