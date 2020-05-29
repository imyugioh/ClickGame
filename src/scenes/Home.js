import React, {Component} from 'react';
import gc from '../config';
import {connect} from 'react-redux';
import axios from 'axios';
import {
  ImageBackground,
  View,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {version as currentVersion} from '../../app.json';
import {Actions} from 'react-native-router-flux';
import Header from '../components/Header';
import config from '../config';
import * as Languages from '../lib/language.json';
const bgImage = require('../../assets/background.jpg');
const startImage = require('../../assets/playnow.png');
const highScoreImage = require('../../assets/hiscore.png');
const helpImage = require('../../assets/help.png');

class Home extends Component {
  constructor() {
    super();
    this.state = {
      version: '',
      percentage: '',
    };
  }
  componentDidMount() {
    axios
      .get(config.API + 'v1/update/version')
      .then((res) => {
        this.setState(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const {version} = this.state;
    const {setting} = this.props;
    const currentLang = setting.lang;
    if (currentVersion < version)
      Alert.alert(
        Languages[currentLang].alertTitle,
        Languages[currentLang].versionText,
      );
    return (
      <ImageBackground source={bgImage} style={gc.container}>
        <View style={[gc.wrapper, styles.container]}>
          <Header title={Languages[currentLang].headerTitle} />
          <View style={[gc.buttonContainer, styles.buttonsWrapper]}>
            <TouchableOpacity onPress={Actions['level']}>
              <Image source={startImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={Actions['hiscore']}>
              <Image source={highScoreImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={Actions['about']}>
              <Image source={helpImage} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: '40%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%',
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    setting: state.setting,
  };
};
export default connect(mapStateToProps)(Home);
