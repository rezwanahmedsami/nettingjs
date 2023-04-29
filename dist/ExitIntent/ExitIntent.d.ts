import WindowEvents from '../utils/windowEvents';
type ActivityState = {
    mouse: {
        x: number;
        y: number;
    };
    scrollPosition: number;
    isInteracted: boolean;
    session: number;
    window: {
        innerHeight: number;
        innerWidth: number;
        outerHeight: number;
        outerWidth: number;
    };
    os: string;
    browserName: string;
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
    constructor(config: ExitIntentConfiguration);
    private startMouseMoveTracker;
    private stopMouseMoveTracker;
    private MouseMoveTracker;
    private updateActivityStateIsInterect;
    private mouseEnter;
    private mouseLeave;
}
export {};
