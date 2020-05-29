import {connect} from 'react-redux';

import Records from './../components/Records';

const mapStateToProps = state => {
  return {
    hiscore: state.game.hiscore,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const ShowRecord = connect(mapStateToProps, mapDispatchToProps)(Records);

export default ShowRecord;
