# react-native-swipe-gestures

React Native component for handling swipe gestures in up, down, left and right direction.

## Installation

`npm i -S react-native-swipe-gestures`

## Usage

```javascript
'use strict';

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

class SomeComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      myText: 'I\'m ready to get swiped!',
      gestureName: 'none',
      backgroundColor: '#fff'
    };
  }

  onSwipeUp(gestureState) {
    this.setState({myText: 'You swiped up!'});
  }

  onSwipeDown(gestureState) {
    this.setState({myText: 'You swiped down!'});
  }

  onSwipeLeft(gestureState) {
    this.setState({myText: 'You swiped left!'});
  }

  onSwipeRight(gestureState) {
    this.setState({myText: 'You swiped right!'});
  }

  onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({backgroundColor: 'red'});
        break;
      case SWIPE_DOWN:
        this.setState({backgroundColor: 'green'});
        break;
      case SWIPE_LEFT:
        this.setState({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        this.setState({backgroundColor: 'yellow'});
        break;
    }
  }

  render() {
    
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        onSwipeUp={(state) => this.onSwipeUp(state)}
        onSwipeDown={(state) => this.onSwipeDown(state)}
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={(state) => this.onSwipeRight(state)}
        config={config}
        style={{
          flex: 1,
          backgroundColor: this.state.backgroundColor
        }}
        >
        <Text>{this.state.myText}</Text>
        <Text>onSwipe callback received gesture: {this.state.gestureName}</Text>
      </GestureRecognizer>
    );
  }
}

export default SomeComponent;
```

## Config

Can be passed within optional `config` property.

| Params                     | Type          | Default | Description  |
| -------------------------- |:-------------:| ------- | ------------ |
| velocityThreshold          | Number        | 0.3     | Velocity that has to be breached in order for swipe to be triggered (`vx` and `vy` properties of `gestureState`) |
| directionalOffsetThreshold | Number        | 80      | Absolute offset that shouldn't be breached for swipe to be triggered (`dy` for horizontal swipe, `dx` for vertical swipe) |
| gestureIsClickThreshold    | Number        | 5       | Absolute distance that should be breached for the gesture to not be considered a click (`dx` or `dy` properties of `gestureState`) |

## Methods

#### onSwipe(gestureName, gestureState)

| Params        | Type          | Description  |
| ------------- |:-------------:| ------------ |
| gestureName   | String        | Name of the gesture (look example above) |
| gestureState  | Object        | gestureState received from PanResponder  |


#### onSwipeUp(gestureState)

| Params        | Type          | Description  |
| ------------- |:-------------:| ------------ |
| gestureState  | Object        | gestureState received from PanResponder  |

#### onSwipeDown(gestureState)

| Params        | Type          | Description  |
| ------------- |:-------------:| ------------ |
| gestureState  | Object        | gestureState received from PanResponder  |

#### onSwipeLeft(gestureState)

| Params        | Type          | Description  |
| ------------- |:-------------:| ------------ |
| gestureState  | Object        | gestureState received from PanResponder  |

#### onSwipeRight(gestureState)

| Params        | Type          | Description  |
| ------------- |:-------------:| ------------ |
| gestureState  | Object        | gestureState received from PanResponder  |
