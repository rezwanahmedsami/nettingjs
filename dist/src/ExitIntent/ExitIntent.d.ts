import WindowEvents from '../utils/windowEvents';
export type ActivityState = {
    mouse: {
        x: number;
        y: number;
    };
    scrollPosition: number;
    isInteracted: boolean;
    sessionTime: number;
    window: {
        innerHeight: number;
        innerWidth: number;
        outerHeight: number;
        outerWidth: number;
    };
    os: number;
    browser: number;
};
type ExitIntentConfiguration = {
    MaxTime: number;
};
export declare class ExitIntent extends WindowEvents {
    protected Timer: unknown;
    protected Interval: unknown;
    protected TimeSec: number;
    protected MaxTime: number;
    protected ActivityState: ActivityState;
    private neuralNet;
    constructor(config: ExitIntentConfiguration);
    private startMouseMoveTracker;
    private stopMouseMoveTracker;
    private MouseMoveTracker;
    private updateActivityStateIsInterect;
    private mouseEnter;
    private mouseLeave;
}
export {};
