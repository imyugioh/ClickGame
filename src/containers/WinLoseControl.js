import {connect} from 'react-redux';
import React, {Component} from 'react';
import {StyleSheet, Text, Image, Button, View, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import * as Languages from '../lib/language.json';
const congrateImage = require('../../assets/congrate.png');
class WinLoseControl extends Component {
  constructor() {
    super();
    this.state = {showModal: false, isUpdated: false};
  }
  componentDidUpdate(props) {
    const {won, hiscore, level} = this.props;
    if (props.won !== this.props.won) {
      if (won === true) {
        if (hiscore[level].length == 1) this.setState({showModal: true});
        else if (hiscore[level].length > 1) {
          const compArray = hiscore[level].slice(1, hiscore[level].length);
          const lastRecord = hiscore[level][0].result;
          let minResult = hiscore[level][1].result;
          compArray.forEach((elem) => {
            if (minResult >= elem.result) {
              minResult = elem.result;
            }
          });
          if (lastRecord < minResult) this.setState({showModal: true});
        }
      }
    }
  }
  render() {
    const {setting} = this.props;
    const localLang = Languages[setting.lang];
    const {won} = this.props;
    const {showModal} = this.state;
    return (
      <View style={styles.container}>
        {won === null && <Text></Text>}
        {won === true && (
          <Text style={styles.successText}>{localLang.winText}</Text>
        )}
        {won === false && (
          <Text style={styles.failedText}>{localLang.loseText}</Text>
        )}
        <Modal
          isVisible={showModal}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          backdropColor="#b4b3db"
          backdropOpacity={0.3}
          onSwipeComplete={() => this.setState({showModal: false})}
          swipeDirection="right"
          onBackdropPress={() => this.setState({showModal: false})}>
          <View style={styles.content}>
            <Image
              source={congrateImage}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.text}>{localLang.newRecordText}</Text>
          </View>
        </Modal>
      </View>
    );
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

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {},
  content: {
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    borderColor: 'rgba(0,0,0,0.1)',
  },
  image: {
    width: width - 100,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'red',
    marginBottom: 15,
  },
  failedText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'darkred',
  },
  successText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'indigo',
  },
});

export default connect(mapStateToProps)(WinLoseControl);
