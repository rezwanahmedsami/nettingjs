import WindowEvents from '../utils/windowEvents';
import { HtmlDOM } from '../utils/GlobalVars';
import { getBrowserName, getOs, getUserAgent } from '../utils/Platform';

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
};
type ExitIntentConfiguration = {
  MaxTime: number;
};
export class ExitIntent extends WindowEvents {
  protected Timer: unknown;
  protected Interval: unknown;
  protected TimeSec: number;
  protected MaxTime: number;
  protected ActivityState: ActivityState;

  constructor(config: ExitIntentConfiguration) {
    super();
    this.Timer = null;
    this.Interval = null;
    this.TimeSec = 0;
    this.MaxTime = config.MaxTime | 0;

    this.ActivityState = {
      mouse: {
        x: 0,
        y: 0,
      },
      scrollPosition: 0,
      isInteracted: false,
      session: 0,
      window: {
        innerHeight: 0,
        innerWidth: 0,
        outerHeight: 0,
        outerWidth: 0,
      },
    };
    console.log('yes exitintent class loaded');

    // mouseenter listener
    HtmlDOM?.addEventListener('mouseenter', this.mouseEnter.bind(this));

    // mouseleave listener
    HtmlDOM?.addEventListener('mouseleave', this.mouseLeave.bind(this));

    // start mouse move tracker
    this.startMouseMoveTracker();
  }

  private startMouseMoveTracker() {
    HtmlDOM?.addEventListener('mousemove', this.MouseMoveTracker.bind(this));
    this.Timer = setTimeout(
      this.stopMouseMoveTracker.bind(this),
      this.MaxTime * 1000
    );
    this.Interval = setInterval(() => {
      this.TimeSec++;
      console.log('time: ', this.TimeSec);
    }, 980);
  }

  private stopMouseMoveTracker() {
    console.log('stoping');
    document.removeEventListener('mousemove', this.MouseMoveTracker);
    clearTimeout(this.Timer as number);
    clearTimeout(this.Interval as number);
    if (this.TimeSec == this.MaxTime) {
      this.TimeSec = 0;
      console.log(this.ActivityState);
    }
    console.log('Mouse move event stopped');
  }

  private MouseMoveTracker(event: { clientX: number; clientY: number }) {
    const x = event.clientX;
    const y = event.clientY;
    const mouse = { x: x, y: y };
    const scrollPosition = this.getScrollPosition();
    this.ActivityState.mouse = mouse;
    this.ActivityState.scrollPosition = scrollPosition;
    HtmlDOM?.addEventListener(
      'mousedown',
      this.updateActivityStateIsInterect.bind(this)
    );
    this.ActivityState.window = this.getWindowDimensions();
    console.log('mouse move tracker');
  }

  private updateActivityStateIsInterect() {
    this.ActivityState.isInteracted = true;
  }

  private mouseEnter() {
    console.log('Scroll position', this.getScrollPosition());
    console.log('OS:', getOs());
    console.log('User agent:', getUserAgent());
    console.log('Browser name:', getBrowserName());
  }

  private mouseLeave() {
    console.log('Mouse left');
    this.ActivityState.session = this.TimeSec;
  }
}
