import {connect} from 'react-redux';

import StartButton from './../components/StartButton';

import * as Languages from '../lib/language.json';
const mapStateToProps = (state) => {
  const {setting} = state;
  const localLang = Languages[setting.lang];
  return {
    label: state.game.started
      ? localLang.stopText
      : state.game.won === false
      ? localLang.tryAgainText
      : localLang.startText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPress: () => {
      dispatch({type: 'TOGGLE_GAME', now: Date.now()});
    },
  };
};

const GameControl = connect(mapStateToProps, mapDispatchToProps)(StartButton);

export default GameControl;
