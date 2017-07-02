import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Text
} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  dateItem: {
    width: Math.floor(width / 7),
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateItemText: {
    textAlign: 'center'
  }
});

const CalendarItem = ({date}) => {
  return <View style={[styles.dateItem]}>
    <Text style={styles.dateItemText}>{date.getDate()}</Text>
  </View>
};

CalendarItem.defaultProps = {
  height: 40
};

export default CalendarItem;
