import WindowEvents from '../utils/windowEvents';
import { HtmlDOM } from '../utils/GlobalVars';
import { getBrowserName, getOs } from '../utils/Platform';
import { browserNameToNumber, osToNumber } from '../utils/dataTransforms';
import ExitIntentNeuralNet from '../Networks/ExitIntentNeuralNet';

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

export class ExitIntent extends WindowEvents {
  protected Timer: unknown;
  protected Interval: unknown;
  protected TimeSec: number;
  protected MaxTime: number;
  private isTracking: boolean;
  private ExitIntentCallbackFunction: ExitIntentCallbackFunction;
  protected ActivityState: ActivityState;
  private neuralNet: ExitIntentNeuralNet;

  constructor(config: ExitIntentConfiguration) {
    super();
    this.Timer = null;
    this.Interval = null;
    this.TimeSec = 0;
    this.MaxTime = config.MaxTime | 0;
    this.isTracking = false;
    this.ExitIntentCallbackFunction = () => {
      //
    };
    this.ActivityState = {
      mouse: {
        x: 0,
        y: 0,
      },
      scrollHeight: document.body.scrollHeight,
      scrollTop: 0,
      isInteracted: false,
      sessionTime: 0,
      window: {
        innerHeight: 0,
        innerWidth: 0,
        outerHeight: 0,
        outerWidth: 0,
      },
      os: osToNumber(getOs()),
      browser: browserNameToNumber(getBrowserName()),
    };
    this.neuralNet = new ExitIntentNeuralNet();
    // console.log('yes exitintent class loaded');

    // mouseenter listener
    HtmlDOM?.addEventListener('mouseenter', this.mouseEnter.bind(this));

    // mouseleave listener
    HtmlDOM?.addEventListener('mouseleave', this.mouseLeave.bind(this));

    // start mouse move tracker
    this.startTracking();
  }

  private startTracking() {
    if (!this.isTracking) {
      HtmlDOM?.addEventListener('mousemove', this.MouseMoveTracker.bind(this));
      this.Timer = setTimeout(
        this.stopTracking.bind(this),
        this.MaxTime * 1000
      );
      this.Interval = setInterval(() => {
        this.TimeSec++;
        // console.log('time: ', this.TimeSec);
      }, 980);
      this.isTracking = true;
    }
  }

  private stopTracking() {
    if (this.isTracking) {
      clearTimeout(this.Timer as number);
      clearTimeout(this.Interval as number);
      this.ActivityState.sessionTime = this.TimeSec;

      if (this.TimeSec == this.MaxTime) {
        this.TimeSec = 0;
      }

      this.performResultoperations();
      this.isTracking = false;
    }
  }

  private performResultoperations() {
    const predictionResult = this.neuralNet.predictExitIntent(
      this.ActivityState
    )[0] as number;
    const output: ExitIntentCallbackArg = {
      exitChance: Number.isNaN(predictionResult) ? 0 : predictionResult,
      sessionTime: this.ActivityState.sessionTime,
    };
    this.ExitIntentCallbackFunction(output);
  }

  public setCallBack(ExitIntentCallbackFunction: ExitIntentCallbackFunction) {
    this.ExitIntentCallbackFunction = ExitIntentCallbackFunction;
  }

  private MouseMoveTracker(event: { clientX: number; clientY: number }) {
    const x = event.clientX;
    const y = event.clientY;
    const mouse = { x: x, y: y };
    const ScrollTopPosition = this.getScrollTopPosition();
    this.ActivityState.mouse = mouse;
    this.ActivityState.scrollTop = ScrollTopPosition;
    HtmlDOM?.addEventListener(
      'mousedown',
      this.updateActivityStateIsInterect.bind(this)
    );
    this.ActivityState.window = this.getWindowDimensions();
    // console.log('mouse move tracker');
  }

  private updateActivityStateIsInterect() {
    this.ActivityState.isInteracted = true;
  }

  private mouseEnter() {
    // console.log('Scroll position', this.getScrollPosition());
    // console.log('OS:', getOs());
    // console.log('User agent:', getUserAgent());
    // console.log('Browser name:', getBrowserName());
  }

  private mouseLeave() {
    this.stopTracking();
  }
}
