import React, {Component} from 'react';
import {
  StatusBar,
  StyleSheet,
  Button,
  View,
  ImageBackground,
} from 'react-native';

import {connect} from 'react-redux';
import * as Languages from '../lib/language.json';
import {Actions} from 'react-native-router-flux';
import Header from '../components/Header';
import gc from '../config';

import ShowRecord from '../containers/ShowRecord';

const bgImage = require('../../assets/record.jpg');
class Record extends Component {
  render() {
    const {setting} = this.props;
    const localLang = Languages[setting.lang];
    return (
      <ImageBackground source={bgImage} style={gc.container}>
        <View style={[gc.wrapper, styles.container]}>
          <View style={styles.backStyle}>
            <Button
              title={localLang.backText}
              color="black"
              onPress={Actions['home']}
            />
          </View>
          <Header title={localLang.recordsHeaderTitle} />
          <StatusBar hidden />
          <ShowRecord />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '10%',
  },
  backStyle: {
    alignSelf: 'flex-start',
    top: 20,
    left: 20,
    position: 'absolute',
    zIndex: 999,
  },
});
const mapStateToProps = (state) => {
  return {
    setting: state.setting,
  };
};
export default connect(mapStateToProps)(Record);
