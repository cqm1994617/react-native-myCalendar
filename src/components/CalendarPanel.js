import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';
import util from '../lib/util';
import CalendarItem from './CalendarItem';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  panel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff'
  },
  emptyItem: {
    width: Math.floor(width / 7),
    height: 40
  }
});


const CalendarPanel = ({width, height, date}) => {
  const firstDate = util.getFirstDateInMonth(date);
  const emptyArr = new Array(firstDate.getDay()).fill('');
  return (
    <View style={[styles.panel, {width}]}>
      {emptyArr.map((z, index) => <View style={styles.emptyItem} key={`empty${index}`} />)}
      {util.getDateArr(date).map((d) =>
        <CalendarItem
          key={d.getMonth().toString() + d.getDate()}
          date={d}
          height={height / 7}
        />
      )}
    </View>
  );
};

export default CalendarPanel;
