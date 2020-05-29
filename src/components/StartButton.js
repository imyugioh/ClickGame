import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class StartButton extends Component {
  render() {
    const {label} = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => this.onPress()}>
        <Animatable.View ref="controlButton" style={styles.container}>
          <Text style={styles.label}>{label.toUpperCase()}</Text>
        </Animatable.View>
      </TouchableWithoutFeedback>
    );
  }

  onPress() {
    const {onPress} = this.props;

    this.refs.controlButton.tada(75);
    onPress();
  }
}

StartButton.propTypes = {
  label: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: 'royalblue',
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  label: {
    color: 'white',
    fontFamily: 'HelveticaNeue',
    fontSize: 17,
    fontWeight: '400',
    letterSpacing: 3,
  },
});
