import type { GivenInterruptableScrollToOptions, KnownEventName } from './type';
export declare const STOP_AUTO_SCROLLING: {
    value: import("./type").AnyFunction;
};
export declare const MANUAL_SCROLL_EVENT_NAMES: Array<KnownEventName>;
export declare const SCROLL_EVENT_NAMES: Array<KnownEventName>;
export declare const closest: (node: Node, selector: string, startWithParent?: boolean) => Element | null;
export declare const createDomNodes: <Type extends Node = Node>(html: string) => Type;
export declare const fade: (domNode: HTMLElement, intervalInMilliseconds?: number, out?: boolean) => Promise<void> & {
    clear: () => void;
    resetStyles: () => void;
};
export declare const fadeIn: (domNode: HTMLElement, intervalInMilliseconds?: number) => Promise<void> & {
    clear: () => void;
    resetStyles: () => void;
};
export declare const fadeOut: (domNode: HTMLElement, intervalInMilliseconds?: number) => Promise<void> & {
    clear: () => void;
    resetStyles: () => void;
};
export declare const getAll: (root: Node) => Node[];
export declare const getParents: (node: Node) => Array<Node>;
export declare const getText: (root: Node, recursive?: boolean) => Array<string>;
/**
 * Smoothly scrolls both horizontally and vertically to a target DOM node.
 * Cancels instantly if the user interacts with the mouse, touch, or keys.
 * @param givenOptions - Configuration options.
 * @param givenOptions.targetDomNode - The DOM node you want to scroll to.
 * @param givenOptions.containerDomNode - The scrollable parent.
 * @param givenOptions.durationInMilliseconds - Animation duration in
 * milliseconds.
 * @param givenOptions.interruptOnManualScroll - Whether to stop the animation
 * if the user starts to scroll manually.
 * @param givenOptions.offset - Pixel offsets.
 * @param givenOptions.offset.top - Vertical offset in pixels.
 * @param givenOptions.offset.left - Horizontal offset in pixels.
 */
export declare const interruptableScrollTo: (givenOptions?: GivenInterruptableScrollToOptions) => void;
/**
 * Scrolls to the given DomNode's location or tio of the page.
 * @param targetDomNode - DomNode to scroll to. If not given, scrolls to the
 * top of the page.
 * @param behavior - Scroll behavior to use.
 */
export declare const scrollTo: (targetDomNode?: Node | null, behavior?: ScrollToOptions['behavior']) => void;
/**
 * Checks whether given html or text strings are equal.
 * @param first - First html, selector to dom node or text to compare.
 * @param second - Second html, selector to dom node or text to compare.
 * @param forceHTMLString - Indicates whether given contents are
 * interpreted as html string (otherwise automatic detection will be
 * triggered).
 * @returns Returns true if both dom representations are equivalent.
 */
export declare const isEquivalent: (first: Node | string, second: Node | string, forceHTMLString?: boolean) => boolean;
/**
 * Checks whether the given dom node is visible or takes space in the document
 * flow.
 * Elements with visibility: hidden or opacity: 0 are considered to be visible,
 * since they still consume space in the layout. During animations that hide an
 * element, the element is considered to be visible until the end of the
 * animation.
 * @param domNode - To inspect.
 * @returns A boolean indicating the visibility.
 */
export declare const isHidden: (domNode: HTMLElement) => boolean;
export declare const onDocumentReady: (callback?: () => void) => Promise<void>;
/**
 * Replaces a given dom node with given nodes.
 * @param domNodeToReplace - Node to replace its children.
 * @param replacementDomNodes - Node or array of nodes to use as replacement.
 * @param skipEmptyTextNodes - Configures whether to trim text.
 */
export declare const replace: (domNodeToReplace: HTMLElement, replacementDomNodes: Array<Node> | Node, skipEmptyTextNodes?: boolean) => void;
/**
 * Moves the content of a given dom node one level up and removes the given
 * node.
 * @param domNode - Node to unwrap.
 * @returns List of unwrapped nodes.
 */
export declare const unwrap: (domNode: HTMLElement) => Array<ChildNode>;
export declare const wrap: (domNodes: Node | NodeListOf<Node>, wrapper: HTMLElement) => void;
