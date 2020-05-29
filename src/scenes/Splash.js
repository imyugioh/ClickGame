import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
const splashImage = require('../../assets/splash.jpg');
class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      Actions.home();
    }, 2200);
  }
  render() {
    return (
      <Image source={splashImage} style={styles.splash} resizeMode="cover" />
    );
  }
}

const styles = StyleSheet.create({
  splash: {
    backgroundColor: 'transparent',
    flex: 1,
    width: null,
    height: null,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
});

export default Splash;
