import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';

import Cell from './Cell';

export default class Board extends Component {
  render() {
    const {chips, onchipPress} = this.props;
    return (
      <View style={styles.board}>
        {chips.map(chip => (
          <Cell key={chip.id} chip={chip} onPress={onchipPress} />
        ))}
      </View>
    );
  }
}

Board.propTypes = {
  chips: PropTypes.array.isRequired,
  onchipPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  board: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: '10%',
  },
});
