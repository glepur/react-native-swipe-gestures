'use strict';

import React, {Component} from 'react';
import {View, PanResponder} from 'react-native';

export const swipeDirections = {
  SWIPE_UP: 'SWIPE_UP',
  SWIPE_DOWN: 'SWIPE_DOWN',
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT',
  ON_PRESS: 'ON_PRESS',
};

const swipeConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};

function isValidSwipe(velocity, velocityThreshold, directionalOffset, directionalOffsetThreshold) {
  return Math.abs(velocity) > velocityThreshold && Math.abs(directionalOffset) < directionalOffsetThreshold;
}

class GestureRecognizer extends Component {

  constructor(props, context) {
    super(props, context);
    this.swipeConfig = Object.assign(swipeConfig, props.config);
  }

  componentWillReceiveProps(props) {
    this.swipeConfig = Object.assign(swipeConfig, props.config);
  }

  componentWillMount() {
    const responderEnd = this._handlePanResponderEnd.bind(this);
    const shouldSetResponder = this._handleShouldSetPanResponder.bind(this);
    this._panResponder = PanResponder.create({ //stop JS beautify collapse
      onStartShouldSetPanResponder: shouldSetResponder,
      onMoveShouldSetPanResponder: shouldSetResponder,
      onPanResponderRelease: responderEnd,
      onPanResponderTerminate: responderEnd
    });
  }

  _handleShouldSetPanResponder(evt, gestureState) {
    return evt.nativeEvent.touches.length === 1 && !this._gestureIsPress(gestureState);
  }
  
  _gestureIsPress(gestureState) {
    return Math.abs(gestureState.dx) < 5  && Math.abs(gestureState.dy) < 5;
  }

  _handlePanResponderEnd(evt, gestureState) {
    const swipeDirection = this._getSwipeDirection(gestureState);
    this._triggerSwipeHandlers(swipeDirection, gestureState);
  }

  _triggerSwipeHandlers(swipeDirection, gestureState) {
    const {onSwipe, onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight, onPress} = this.props;
    const {SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP, SWIPE_DOWN,ON_PRESS} = swipeDirections;
    onSwipe && onSwipe(swipeDirection, gestureState);
    switch (swipeDirection) {
      case SWIPE_LEFT:
        onSwipeLeft && onSwipeLeft(gestureState);
        break;
      case SWIPE_RIGHT:
        onSwipeRight && onSwipeRight(gestureState);
        break;
      case SWIPE_UP:
        onSwipeUp && onSwipeUp(gestureState);
        break;
      case SWIPE_DOWN:
        onSwipeDown && onSwipeDown(gestureState);
        break;
      case ON_PRESS:
        onPress && onPress(gestureState);
        break;
    }
  }

  _getSwipeDirection(gestureState) {
    const {SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP, SWIPE_DOWN,ON_PRESS} = swipeDirections;
    const {dx, dy} = gestureState;
    if((dx <5 && dy < 5)){return ON_PRESS}

    else if (this._isValidHorizontalSwipe(gestureState)) {
      return (dx > 5)
        ? SWIPE_RIGHT
        : SWIPE_LEFT;
    } else if (this._isValidVerticalSwipe(gestureState)) {
      return (dy > 5)
        ? SWIPE_DOWN
        : SWIPE_UP;
    }
    else  {
      return ON_PRESS;
    }
    return null;
  }

  _isValidHorizontalSwipe(gestureState) {
    const {vx, dy} = gestureState;
    const {velocityThreshold, directionalOffsetThreshold} = this.swipeConfig;
    return isValidSwipe(vx, velocityThreshold, dy, directionalOffsetThreshold);
  }

  _isValidVerticalSwipe(gestureState) {
    const {vy, dx} = gestureState;
    const {velocityThreshold, directionalOffsetThreshold} = this.swipeConfig;
    return isValidSwipe(vy, velocityThreshold, dx, directionalOffsetThreshold);
  }

  render() {
    return (<View {...this.props} {...this._panResponder.panHandlers}/>);
  }
};

export default GestureRecognizer;
