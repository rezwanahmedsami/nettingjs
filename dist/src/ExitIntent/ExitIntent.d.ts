import WindowEvents from '../utils/windowEvents';
export type ActivityState = {
    mouse: {
        x: number;
        y: number;
    };
    scrollHeight: number;
    scrollTop: number;
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
type ExitIntentCallbackArg = {
    exitChance: number;
    sessionTime: number;
};
type ExitIntentCallbackFunction = (arg: ExitIntentCallbackArg) => void;
export declare class ExitIntent extends WindowEvents {
    protected Timer: unknown;
    protected Interval: unknown;
    protected TimeSec: number;
    protected MaxTime: number;
    private isTracking;
    private ExitIntentCallbackFunction;
    protected ActivityState: ActivityState;
    private neuralNet;
    constructor(config: ExitIntentConfiguration);
    private startMouseMoveTracker;
    private stopMouseMoveTracker;
    private performResultoperations;
    setCallBack(ExitIntentCallbackFunction: ExitIntentCallbackFunction): void;
    private MouseMoveTracker;
    private updateActivityStateIsInterect;
    private mouseEnter;
    private mouseLeave;
}
export {};
