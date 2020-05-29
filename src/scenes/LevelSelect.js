import React, {Component} from 'react';
import gc from '../config';
import {connect} from 'react-redux';
import {
  ImageBackground,
  View,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Header from '../components/Header';
import * as Languages from '../lib/language.json';
const bgImage = require('../../assets/background.jpg');
const easyImage = require('../../assets/easy.png');
const mediumImage = require('../../assets/medium.png');
const hardImage = require('../../assets/hard.png');
const insaneImage = require('../../assets/insane.png');
const impossibleImage = require('../../assets/impossible.png');
class LevelSelect extends Component {
  render() {
    const {setting} = this.props;
    const currentLang = setting.lang;
    const {selectLevel} = this.props;
    return (
      <ImageBackground source={bgImage} style={gc.container}>
        <View style={[gc.wrapper, styles.container]}>
          <View style={styles.backStyle}>
            <Button
              title={Languages[currentLang].backText}
              color="black"
              onPress={Actions['home']}
            />
          </View>
          <View style={[gc.buttonContainer, styles.buttonsWrapper]}>
            <TouchableOpacity
              onPress={() => {
                selectLevel(4);
                Actions.main();
              }}>
              <Image source={easyImage} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                selectLevel(8);
                Actions.main();
              }}>
              <Image source={mediumImage} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                selectLevel(12);
                Actions.main();
              }}>
              <Image source={hardImage} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                selectLevel(16);
                Actions.main();
              }}>
              <Image source={insaneImage} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                selectLevel(25);
                Actions.main();
              }}>
              <Image source={impossibleImage} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    setting: state.setting,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    selectLevel: (level) => {
      dispatch({type: 'SELECT_LEVEL', payload: level});
    },
  };
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: '10%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backStyle: {
    alignSelf: 'flex-start',
    top: 20,
    left: 20,
    position: 'absolute',
  },
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(LevelSelect);
