var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React, { Component } from 'react';
import { PanResponder, View, } from 'react-native';
export var SwipeDirections;
(function (SwipeDirections) {
    SwipeDirections["SWIPE_UP"] = "SWIPE_UP";
    SwipeDirections["SWIPE_DOWN"] = "SWIPE_DOWN";
    SwipeDirections["SWIPE_LEFT"] = "SWIPE_LEFT";
    SwipeDirections["SWIPE_RIGHT"] = "SWIPE_RIGHT";
})(SwipeDirections || (SwipeDirections = {}));
var swipeConfig = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
    gestureIsClickThreshold: 5,
};
function isValidSwipe(velocity, velocityThreshold, directionalOffset, directionalOffsetThreshold) {
    return (Math.abs(velocity) > velocityThreshold &&
        Math.abs(directionalOffset) < directionalOffsetThreshold);
}
var GestureRecognizer = /** @class */ (function (_super) {
    __extends(GestureRecognizer, _super);
    function GestureRecognizer(props) {
        var _this = _super.call(this, props) || this;
        _this.handleShouldSetPanResponder = function (event, gestureState) {
            return (event.nativeEvent.touches.length === 1 &&
                !_this.gestureIsClick(gestureState));
        };
        _this.gestureIsClick = function (gestureState) {
            return (Math.abs(gestureState.dx) < swipeConfig.gestureIsClickThreshold &&
                Math.abs(gestureState.dy) < swipeConfig.gestureIsClickThreshold);
        };
        _this.handlePanResponderEnd = function (event, gestureState) {
            var direction = _this.getSwipeDirections(gestureState);
            _this.triggerSwipeHandlers(direction, gestureState);
        };
        _this.triggerSwipeHandlers = function (direction, gestureState) {
            var _a = _this.props, onSwipe = _a.onSwipe, onSwipeUp = _a.onSwipeUp, onSwipeDown = _a.onSwipeDown, onSwipeLeft = _a.onSwipeLeft, onSwipeRight = _a.onSwipeRight;
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
        _this.getSwipeDirections = function (gestureState) {
            var dx = gestureState.dx, dy = gestureState.dy;
            if (_this.isValidHorizontalSwipe(gestureState)) {
                return dx > 0 ? SwipeDirections.SWIPE_RIGHT : SwipeDirections.SWIPE_LEFT;
            }
            else if (_this.isValidVerticalSwipe(gestureState)) {
                return dy > 0 ? SwipeDirections.SWIPE_DOWN : SwipeDirections.SWIPE_UP;
            }
            return null;
        };
        _this.isValidHorizontalSwipe = function (gestureState) {
            var vx = gestureState.vx, dy = gestureState.dy;
            var _a = _this.swipeConfig, velocityThreshold = _a.velocityThreshold, directionalOffsetThreshold = _a.directionalOffsetThreshold;
            return isValidSwipe(vx, velocityThreshold, dy, directionalOffsetThreshold);
        };
        _this.isValidVerticalSwipe = function (gestureState) {
            var vy = gestureState.vy, dx = gestureState.dx;
            var _a = _this.swipeConfig, velocityThreshold = _a.velocityThreshold, directionalOffsetThreshold = _a.directionalOffsetThreshold;
            return isValidSwipe(vy, velocityThreshold, dx, directionalOffsetThreshold);
        };
        _this.swipeConfig = Object.assign(swipeConfig, props.config);
        _this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: _this.handleShouldSetPanResponder,
            onMoveShouldSetPanResponder: _this.handleShouldSetPanResponder,
            onPanResponderRelease: _this.handlePanResponderEnd,
            onPanResponderTerminate: _this.handlePanResponderEnd,
        });
        return _this;
    }
    GestureRecognizer.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.config !== prevProps.config) {
            this.swipeConfig = Object.assign(swipeConfig, this.props.config);
        }
    };
    GestureRecognizer.prototype.render = function () {
        return <View {...this.props} {...this.panResponder.panHandlers}/>;
    };
    return GestureRecognizer;
}(Component));
export default GestureRecognizer;
