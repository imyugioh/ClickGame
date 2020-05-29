import {connect} from 'react-redux';

import Time from './../components/Time';

const mapStateToProps = state => {
  return {
    started: state.game.started,
    startedAt: state.game.startedAt,
    endedAt: state.game.endedAt,
    won: state.game.won,
  };
};

const ElapsedTime = connect(mapStateToProps)(Time);

export default ElapsedTime;
