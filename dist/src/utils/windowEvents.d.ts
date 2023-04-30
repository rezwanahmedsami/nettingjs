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
    constructor();
    getWindowDimensions(): {
        innerHeight: number;
        innerWidth: number;
        outerHeight: number;
        outerWidth: number;
    };
    getScrollTopPosition(): number;
}
export {};
