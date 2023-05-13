import { NeuralNetwork } from 'brain.js';
import ExitIntentModel from '../../models/exit_intent_trained_model.json';
import { ActivityState } from '../ExitIntent/ExitIntent';
type NetConfig = {
  activation: string;
  hiddenLayers: number[];
  learningRate: number;
};

export default class ExitIntentNeuralNet {
  private NetConfig: NetConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private Net: any;
  private TrainedModel: object;

  constructor() {
    //code here
    this.NetConfig = {
      activation: 'sigmoid',
      hiddenLayers: [8, 8],
      learningRate: 0.6,
    };
    this.Net = new NeuralNetwork(this.NetConfig);
    this.TrainedModel = ExitIntentModel;

    this.Net.fromJSON(this.TrainedModel);
  }

  genrateNormalizedDataForInput(ActivityState: ActivityState) {
    const data = {
      mouseX: ActivityState.mouse.x,
      mouseY: ActivityState.mouse.y,
      scrollHeight: ActivityState.scrollHeight,
      scrollTop: ActivityState.scrollTop,
      windowInnerHeight: ActivityState.window.innerHeight,
      windowInnerWidth: ActivityState.window.innerWidth,
      windowOuterHeight: ActivityState.window.outerHeight,
      windowOuterWidth: ActivityState.window.outerWidth,
      os: ActivityState.os,
      browser: ActivityState.browser,
      sessionTime: ActivityState.sessionTime,
      isInteracted: ActivityState.isInteracted == true ? 1 : 0,
    };

    const normalizedData = {
      mouseX: parseFloat(
        (data.mouseX / ActivityState.window.innerWidth).toFixed(2)
      ),
      mouseY: parseFloat(
        (data.mouseY / ActivityState.window.innerHeight).toFixed(2)
      ),
      scrollRate: parseFloat(
        ((data.scrollTop + data.windowInnerHeight) / data.scrollHeight).toFixed(
          2
        )
      ),
      windowInnerHeight: parseFloat(
        (data.windowInnerHeight / data.windowOuterHeight).toFixed(2)
      ),
      windowInnerWidth: parseFloat(
        (data.windowInnerWidth / data.windowOuterWidth).toFixed(2)
      ),
      os: data.os,
      browser: data.browser,
      sessionTime: data.sessionTime,
      isInteracted: data.isInteracted,
    };

    return normalizedData;
  }

  predictExitIntent(ActivityState: ActivityState) {
    const NetInput = this.genrateNormalizedDataForInput(ActivityState);
    return this.Net.run([
      NetInput.mouseX,
      NetInput.mouseY,
      NetInput.scrollRate,
      NetInput.windowInnerHeight,
      NetInput.windowInnerWidth,
      NetInput.os,
      NetInput.browser,
      NetInput.sessionTime,
      NetInput.isInteracted,
    ]);
  }
}
