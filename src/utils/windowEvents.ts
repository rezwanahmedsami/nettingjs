type WindowDimensionsObject = {
  innerHeight: number;
  innerWidth: number;
  outerHeight: number;
  outerWidth: number;
};

type ScrollTopPosition = number;

interface WindowContext {
  getWindowDimensions: () => WindowDimensionsObject;
  getScrollTopPosition: () => ScrollTopPosition;
}

export default class WindowEvents implements WindowContext {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public constructor() {}

  public getWindowDimensions() {
    const innerWindowHeight: number = window?.innerHeight;
    const innerWindowWidth: number = window?.innerWidth;
    const outerWindowHeight: number = window?.outerHeight;
    const outerWindowWidth: number = window?.outerWidth;

    return {
      innerHeight: innerWindowHeight,
      innerWidth: innerWindowWidth,
      outerHeight: outerWindowHeight,
      outerWidth: outerWindowWidth,
    };
  }

  public getScrollTopPosition() {
    const scrollTop: number = window?.scrollY || window?.pageYOffset;
    return scrollTop;
  }
}
