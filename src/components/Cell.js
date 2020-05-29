import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class Cell extends Component {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.onPress()}
        disabled={this.isDisabled()}>
        <Animatable.View
          animation="bounceIn"
          delay={Math.random() * 400}
          duration={400}
          ref="chip"
          style={[styles.chip, this.styles()]}>
          {this.renderText()}
        </Animatable.View>
      </TouchableWithoutFeedback>
    );
  }

  onPress() {
    const {chip, onPress} = this.props;

    this.refs.chip.tada(75);
    onPress(chip.id);
  }

  renderText() {
    const {chip} = this.props;

    if (chip.status === 'hidden') {
      return <Text />;
    }

    return <Text style={styles.text}>{chip.number}</Text>;
  }

  isDisabled() {
    const {chip} = this.props;
    return chip.status !== 'highlighted' && chip.status !== 'hidden';
  }

  styles() {
    const {chip} = this.props;
    return chip.status ? styles[chip.status] : {};
  }
}

const {width} = Dimensions.get('window');

// 1 (1 8 1) (1 8 1) (1 8 1) (1 8 1) 1
const minchipSize = 44;
const maxchipSize = 64;
const chipSize = Math.min(
  Math.max(parseInt((8 / 42) * width), minchipSize),
  maxchipSize,
);
const chipMargin = parseInt((width - 5 * chipSize) / 10);

const styles = StyleSheet.create({
  chip: {
    margin: chipMargin,
    backgroundColor: 'lightseagreen',
    borderRadius: chipSize / 2,
    width: chipSize,
    height: chipSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  idle: {
    backgroundColor: '#00000000',
  },
  highlighted: {
    backgroundColor: 'blue',
  },
  hidden: {},
  disabled: {
    backgroundColor: 'royalblue',
  },
  valid: {
    backgroundColor: 'blue',
  },
  invalid: {
    backgroundColor: 'indianred',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: '#ffffff',
  },
});
