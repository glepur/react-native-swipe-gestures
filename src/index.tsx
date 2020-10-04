import React, {Component} from 'react';
import {
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  PanResponderInstance,
  View,
  ViewProps,
} from 'react-native';

export enum SwipeDirections {
  SWIPE_UP = 'SWIPE_UP',
  SWIPE_DOWN = 'SWIPE_DOWN',
  SWIPE_LEFT = 'SWIPE_LEFT',
  SWIPE_RIGHT = 'SWIPE_RIGHT',
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

const swipeConfig: GestureRecognizerConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
  gestureIsClickThreshold: 5,
};

function isValidSwipe(
  velocity: number,
  velocityThreshold: number,
  directionalOffset: number,
  directionalOffsetThreshold: number,
): boolean {
  return (
    Math.abs(velocity) > velocityThreshold &&
    Math.abs(directionalOffset) < directionalOffsetThreshold
  );
}

export interface GestureRecognizerProps extends ViewProps {
  config?: GestureRecognizerConfig;
  onSwipe?(
    gestureName: SwipeDirections,
    gestureState: PanResponderGestureState,
  ): void;
  onSwipeUp?(gestureState: PanResponderGestureState): void;
  onSwipeDown?(gestureState: PanResponderGestureState): void;
  onSwipeLeft?(gestureState: PanResponderGestureState): void;
  onSwipeRight?(gestureState: PanResponderGestureState): void;
}

class GestureRecognizer extends Component<GestureRecognizerProps> {
  protected panResponder: PanResponderInstance;

  protected swipeConfig: GestureRecognizerConfig;

  constructor(props: GestureRecognizerProps) {
    super(props);
    this.swipeConfig = Object.assign(swipeConfig, props.config);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.handleShouldSetPanResponder,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    });
  }

  public componentDidUpdate(prevProps: GestureRecognizerProps) {
    if (this.props.config !== prevProps.config) {
      this.swipeConfig = Object.assign(swipeConfig, this.props.config);
    }
  }

  private handleShouldSetPanResponder = (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    return (
      event.nativeEvent.touches.length === 1 &&
      !this.gestureIsClick(gestureState)
    );
  };

  private gestureIsClick = (
    gestureState: PanResponderGestureState,
  ): boolean => {
    return (
      Math.abs(gestureState.dx) < swipeConfig.gestureIsClickThreshold &&
      Math.abs(gestureState.dy) < swipeConfig.gestureIsClickThreshold
    );
  };

  private handlePanResponderEnd = (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    const direction: SwipeDirections = this.getSwipeDirections(gestureState);
    this.triggerSwipeHandlers(direction, gestureState);
  };

  private triggerSwipeHandlers = (direction: SwipeDirections, gestureState) => {
    const {
      onSwipe,
      onSwipeUp,
      onSwipeDown,
      onSwipeLeft,
      onSwipeRight,
    } = this.props;

    if (typeof onSwipe === 'function') {
      onSwipe(direction, gestureState);
    }

    switch (direction) {
      case SwipeDirections.SWIPE_LEFT:
        if (typeof onSwipeLeft === 'function') {
          onSwipeLeft(gestureState);
        }
        break;
      case SwipeDirections.SWIPE_RIGHT:
        if (typeof onSwipeRight === 'function') {
          onSwipeRight(gestureState);
        }
        break;
      case SwipeDirections.SWIPE_UP:
        if (typeof onSwipeUp === 'function') {
          onSwipeUp(gestureState);
        }
        break;
      case SwipeDirections.SWIPE_DOWN:
        if (typeof onSwipeDown === 'function') {
          onSwipeDown(gestureState);
        }
        break;
    }
  };

  private getSwipeDirections = (gestureState: PanResponderGestureState) => {
    const {dx, dy} = gestureState;
    if (this.isValidHorizontalSwipe(gestureState)) {
      return dx > 0 ? SwipeDirections.SWIPE_RIGHT : SwipeDirections.SWIPE_LEFT;
    } else if (this.isValidVerticalSwipe(gestureState)) {
      return dy > 0 ? SwipeDirections.SWIPE_DOWN : SwipeDirections.SWIPE_UP;
    }
    return null;
  };

  private isValidHorizontalSwipe = (
    gestureState: PanResponderGestureState,
  ): boolean => {
    const {vx, dy} = gestureState;
    const {velocityThreshold, directionalOffsetThreshold} = this.swipeConfig;
    return isValidSwipe(vx, velocityThreshold, dy, directionalOffsetThreshold);
  };

  private isValidVerticalSwipe = (
    gestureState: PanResponderGestureState,
  ): boolean => {
    const {vy, dx} = gestureState;
    const {velocityThreshold, directionalOffsetThreshold} = this.swipeConfig;
    return isValidSwipe(vy, velocityThreshold, dx, directionalOffsetThreshold);
  };

  render() {
    return <View {...this.props} {...this.panResponder.panHandlers} />;
  }
}

export default GestureRecognizer;
