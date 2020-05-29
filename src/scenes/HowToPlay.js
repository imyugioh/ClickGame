import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Button,
} from 'react-native';

import Header from '../components/Header';

import gc from '../config';
import {Actions} from 'react-native-router-flux';
const bgImage = require('../../assets/background.jpg');
import * as Languages from '../lib/language.json';
class HowToPlay extends Component {
  render() {
    const {setting} = this.props;
    const currentLang = setting.lang;
    return (
      <ImageBackground source={bgImage} style={gc.container}>
        <View style={styles.backStyle}>
          <Button
            title={Languages[currentLang].backText}
            color="black"
            onPress={Actions['home']}
          />
        </View>
        <View style={styles.container}>
          <StatusBar hidden />
          <Header title={Languages[currentLang].howToPlayTitle} />
          <Text style={styles.aboutText}>
            {Languages[currentLang].howToPlayText}
          </Text>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: '10%',
    height: '100%',
  },
  aboutText: {
    marginTop: 50,
    marginBottom: 20,
    marginHorizontal: 20,
    textAlign: 'justify',
    lineHeight: 30,
  },
  backStyle: {
    alignSelf: 'flex-start',
    top: 20,
    left: 20,
    position: 'absolute',
    zIndex: 999,
  },
  text: {
    textAlign: 'center',
  },
});
const mapStateToProps = (state) => {
  return {
    setting: state.setting,
  };
};
export default connect(mapStateToProps)(HowToPlay);
