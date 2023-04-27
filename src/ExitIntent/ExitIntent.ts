import WindowEvents from '../utils/windowEvents';

export class ExitIntent extends WindowEvents {
  constructor() {
    super();
    console.log('yes exitintent class loaded');

    // mouse leave listener
    document
      ?.querySelector('html')
      ?.addEventListener('mouseenter', this.mouseEnter.bind(this));
    document
      ?.querySelector('html')
      ?.addEventListener('mouseleave', this.mouseLeave.bind(this));
  }

  mouseEnter() {
    console.log(this.getScrollPosition());
  }

  mouseLeave() {
    console.log('Mouse left');
  }
}
