import { Component } from 'react';
import { PanResponderGestureState, PanResponderInstance, ViewProps } from 'react-native';
export declare enum SwipeDirections {
    SWIPE_UP = "SWIPE_UP",
    SWIPE_DOWN = "SWIPE_DOWN",
    SWIPE_LEFT = "SWIPE_LEFT",
    SWIPE_RIGHT = "SWIPE_RIGHT"
}
export interface GestureRecognizerConfig {
    /**
     * Velocity that has to be breached in order for swipe to be triggered (vx and vy properties of gestureState)
     * @default 0.3
     */
    velocityThreshold?: number;
    /**
     * Absolute offset that shouldn't be breached for swipe to be triggered (dy for horizontal swipe, dx for vertical swipe)
     * @default 80
     */
    directionalOffsetThreshold?: number;
    /**
     * Absolute distance that should be breached for the gesture to not be considered a click (dx or dy properties of gestureState)
     * @default 5
     */
    gestureIsClickThreshold?: number;
}
export interface GestureRecognizerProps extends ViewProps {
    config?: GestureRecognizerConfig;
    onSwipe?(gestureName: SwipeDirections, gestureState: PanResponderGestureState): void;
    onSwipeUp?(gestureState: PanResponderGestureState): void;
    onSwipeDown?(gestureState: PanResponderGestureState): void;
    onSwipeLeft?(gestureState: PanResponderGestureState): void;
    onSwipeRight?(gestureState: PanResponderGestureState): void;
}
declare class GestureRecognizer extends Component<GestureRecognizerProps> {
    protected panResponder: PanResponderInstance;
    protected swipeConfig: GestureRecognizerConfig;
    constructor(props: GestureRecognizerProps);
    componentDidUpdate(prevProps: GestureRecognizerProps): void;
    private handleShouldSetPanResponder;
    private gestureIsClick;
    private handlePanResponderEnd;
    private triggerSwipeHandlers;
    private getSwipeDirections;
    private isValidHorizontalSwipe;
    private isValidVerticalSwipe;
    render(): JSX.Element;
}
export default GestureRecognizer;
