import {connect} from 'react-redux';

import Board from './../components/Board';

const mapStateToProps = state => {
  return {
    chips: state.game.chips,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onchipPress: id => {
      dispatch({type: 'PICK_chip', id: id, now: Date.now()});
    },
  };
};

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);

export default BoardContainer;
