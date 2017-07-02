import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import util from '../lib/util';
import CalendarItem from './CalendarItem';

const styles = StyleSheet.create({

});

const CalendarPanel = ({width, height, date}) => {
  return (
    <View style={{width, height}}>
      <Text>{util.dateFormat(date, 'chinese')}</Text>
    </View>
  );
};

export default CalendarPanel;
