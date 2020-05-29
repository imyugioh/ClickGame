import {connect} from 'react-redux';
import React, {Component} from 'react';
import * as Languages from '../lib/language.json';
import {StyleSheet, View, Text} from 'react-native';
class HighScore extends Component {
  render() {
    const {setting} = this.props;
    const localLang = Languages[setting.lang];
    const renderHighScore = () => {
      const {hiscore, level} = this.props;
      if (hiscore[level].length === 0) return <Text></Text>;
      let minResult = hiscore[level][0].result;
      hiscore[level].forEach((elem) => {
        if (minResult >= elem.result) minResult = elem.result;
      });
      return (
        <Text style={styles.hiscoreTitle}>
          {localLang.highScoreText}: {minResult / 1000}s
        </Text>
      );
    };
    return <View style={styles.container}>{renderHighScore()}</View>;
  }
}
const mapStateToProps = (state) => {
  return {
    won: state.game.won,
    level: state.game.level,
    setting: state.setting,
    hiscore: state.game.hiscore,
  };
};

const styles = StyleSheet.create({
  container: {},
  hiscoreTitle: {
    fontFamily: 'Arial',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 0,
    color: 'red',
  },
});

export default connect(mapStateToProps)(HighScore);
