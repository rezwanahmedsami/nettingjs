import { ActivityState } from '../ExitIntent/ExitIntent';
export default class ExitIntentNeuralNet {
    private NetConfig;
    private Net;
    private TrainedModel;
    constructor();
    genrateNormalizedDataForInput(ActivityState: ActivityState): {
        mouseX: number;
        mouseY: number;
        scrollRate: number;
        windowInnerHeight: number;
        windowInnerWidth: number;
        os: number;
        browser: number;
        sessionTime: number;
        isInteracted: number;
    };
    predictExitIntent(ActivityState: ActivityState): any;
}
