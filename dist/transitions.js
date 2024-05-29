import { fadeFpsDefault } from './config.js';
import * as Easing from './easings.js';
export class AtemTransitions {
    transitions;
    fps;
    tickInterval;
    constructor(instanceConfig) {
        this.transitions = new Map();
        this.fps = instanceConfig.fadeFps ?? fadeFpsDefault;
    }
    stopAll() {
        this.transitions.clear();
        if (this.tickInterval) {
            clearInterval(this.tickInterval);
            delete this.tickInterval;
        }
    }
    runTick() {
        const completedPaths = [];
        for (const [path, info] of this.transitions.entries()) {
            const newValue = info.steps.shift();
            if (newValue !== undefined) {
                info.sendFcn(newValue).catch((_e) => {
                    // TODO
                    // this.instance.log('debug', 'Action execution error: ' + e)
                });
            }
            if (info.steps.length === 0) {
                completedPaths.push(path);
            }
        }
        // Remove any completed transitions
        for (const path of completedPaths) {
            this.transitions.delete(path);
        }
        // If nothing is left, stop the timer
        if (this.transitions.size === 0) {
            this.stopAll();
        }
    }
    async run(id, sendFcn, from, to, duration) {
        const interval = 1000 / this.fps;
        const stepCount = Math.ceil(duration / interval);
        // TODO - what if not sending db
        if (stepCount <= 1 || typeof from !== 'number') {
            this.transitions.delete(id);
            await sendFcn(to);
        }
        else {
            const diff = to - from;
            const steps = [];
            const easing = Easing.Linear.None; // TODO - dynamic
            for (let i = 1; i <= stepCount; i++) {
                const fraction = easing(i / stepCount);
                steps.push(from + diff * fraction);
            }
            this.transitions.set(id, {
                steps,
                sendFcn,
            });
            if (!this.tickInterval) {
                // Start the tick if not already running
                this.tickInterval = setInterval(() => this.runTick(), 1000 / this.fps);
            }
        }
    }
}
//# sourceMappingURL=transitions.js.map