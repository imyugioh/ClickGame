import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {ScrollView, StyleSheet, Text} from 'react-native';
import moment from 'moment';

import * as Languages from '../lib/language.json';
import {formatTime} from '../lib/format';

class Records extends Component {
  renderScore(no, result, date) {
    return (
      <Row style={styles.row} key={no}>
        <Col size={2}>
          <Text style={styles.col_no}>{no}.</Text>
        </Col>
        <Col size={3}>
          <Text style={styles.col_result}>{result}</Text>
        </Col>
        <Col size={7}>
          <Text style={styles.col_date}>{date}</Text>
        </Col>
      </Row>
    );
  }
  render() {
    const {setting} = this.props;
    const localLang = Languages[setting.lang];
    const {hiscore} = this.props;
    return (
      <ScrollView contentContainerStyle={styles.container} style={styles.view}>
        <Text style={styles.levelText}>
          {localLang.easyText + ' ' + localLang.modeText}
        </Text>
        <Grid>
          {hiscore['4'].length === 0 && (
            <Text style={styles.noRecordText}>{localLang.noRecordText}</Text>
          )}
          {hiscore['4'].map((item, i) =>
            this.renderScore(
              i + 1,
              formatTime(item.result),
              this.formatDate(item.date),
            ),
          )}
        </Grid>
        <Text style={styles.levelText}>
          {localLang.mediumText + ' ' + localLang.modeText}
        </Text>
        <Grid>
          {hiscore['8'].length === 0 && (
            <Text style={styles.noRecordText}>{localLang.noRecordText}</Text>
          )}
          {hiscore['8'].map((item, i) =>
            this.renderScore(
              i + 1,
              formatTime(item.result),
              this.formatDate(item.date),
            ),
          )}
        </Grid>
        <Text style={styles.levelText}>
          {localLang.hardText + ' ' + localLang.modeText}
        </Text>
        <Grid>
          {hiscore['12'].length === 0 && (
            <Text style={styles.noRecordText}>{localLang.noRecordText}</Text>
          )}
          {hiscore['12'].map((item, i) =>
            this.renderScore(
              i + 1,
              formatTime(item.result),
              this.formatDate(item.date),
            ),
          )}
        </Grid>
        <Text style={styles.levelText}>
          {localLang.insaneText + ' ' + localLang.modeText}
        </Text>
        <Grid>
          {hiscore['16'].length === 0 && (
            <Text style={styles.noRecordText}>{localLang.noRecordText}</Text>
          )}
          {hiscore['16'].map((item, i) =>
            this.renderScore(
              i + 1,
              formatTime(item.result),
              this.formatDate(item.date),
            ),
          )}
        </Grid>
        <Text style={styles.levelText}>
          {localLang.impossibleText + ' ' + localLang.modeText}
        </Text>
        <Grid>
          {hiscore['25'].length === 0 && (
            <Text style={styles.noRecordText}>{localLang.noRecordText}</Text>
          )}
          {hiscore['25'].map((item, i) =>
            this.renderScore(
              i + 1,
              formatTime(item.result),
              this.formatDate(item.date),
            ),
          )}
        </Grid>
      </ScrollView>
    );
  }

  formatDate(date) {
    return moment(date).fromNow();
  }
}

const styles = StyleSheet.create({
  container: {},
  view: {
    marginVertical: 20,
    marginBottom: '30%',
  },
  levelText: {
    fontFamily: 'Arial',
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 10,
    marginLeft: 20,
    color: 'white',
  },
  row: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 15,
  },
  col: {
    marginHorizontal: 10,
    marginBottom: 5,
  },
  noRecordText: {
    color: 'black',
    fontSize: 15,
    marginLeft: 15,
    marginBottom: 10,
  },
  col_no: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  col_result: {
    fontFamily: 'Courier',
    fontSize: 18,
  },
  col_date: {
    fontSize: 13,
    textAlign: 'left',
  },
});

const mapStateToProps = (state) => {
  return {
    setting: state.setting,
  };
};
export default connect(mapStateToProps)(Records);
