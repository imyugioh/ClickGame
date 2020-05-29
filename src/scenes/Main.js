import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  StatusBar,
  StyleSheet,
  View,
  ImageBackground,
  Button,
  Text,
} from 'react-native';

import gc from '../config';
import Header from '../components/Header';
import {Actions} from 'react-native-router-flux';

import * as Languages from '../lib/language.json';
import BoardContainer from '../containers/BoardContainer';
import GameControl from '../containers/GameControl';
import ElapsedTime from '../containers/ElapsedTime';
import WinLoseControl from '../containers/WinLoseControl';
import HighScore from '../containers/HighScore';
import commonStyles from '../styles/common';
const bgImage = require('../../assets/background.jpg');

class Main extends Component {
  render() {
    const {setting} = this.props;
    const localLang = Languages[setting.lang];
    const {level} = this.props;
    return (
      <ImageBackground source={bgImage} style={gc.container}>
        <View style={styles.backStyle}>
          <Button
            title={localLang.backText}
            color="black"
            onPress={Actions['level']}
          />
        </View>
        <View style={[commonStyles.scene, styles.container]}>
          <StatusBar hidden />
          <Header
            title={
              level == 4
                ? localLang.easyText
                : level == 8
                ? localLang.mediumText
                : level == 12
                ? localLang.hardText
                : level == 16
                ? localLang.insaneText
                : level == 25
                ? localLang.impossibleText
                : ''
            }
          />
          <View style={styles.content}>
            <HighScore />
          </View>
          <ElapsedTime />
          <WinLoseControl />
          <GameControl />
          <BoardContainer />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '10%',
  },
  content: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  backStyle: {
    alignSelf: 'flex-start',
    top: 20,
    left: 20,
    position: 'absolute',
    zIndex: 999,
  },
  levelTitle: {
    fontFamily: 'Arial',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 0,
    color: 'darkblue',
  },
});

const mapStateToProps = (state) => {
  return {
    level: state.game.level,
    hiscore: state.game.hiscore,
    setting: state.setting,
  };
};
export default connect(mapStateToProps)(Main);
