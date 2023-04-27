type WindowDimensionsObject = {
    innerHeight: number;
    innerWidth: number;
    outerHeight: number;
    outerWidth: number;
};
type ScrollPosition = number;
interface WindowContext {
    getWindowDimensions: () => WindowDimensionsObject;
    getScrollPosition: () => ScrollPosition;
}
export default class WindowEvents implements WindowContext {
    constructor();
    getWindowDimensions(): {
        innerHeight: number;
        innerWidth: number;
        outerHeight: number;
        outerWidth: number;
    };
    getScrollPosition(): number;
}
export {};
