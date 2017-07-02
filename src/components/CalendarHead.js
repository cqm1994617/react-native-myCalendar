import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import util from '../lib/util';

const styles = StyleSheet.create({
  head: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    height: 40,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#fff'
  }
});

const CalendarPanel = ({date}) => {
  return (
    <View>
      <View style={styles.head}>
        <Text style={styles.text}>{util.dateFormat(date)}</Text>
      </View>
    </View>
  );
};

export default CalendarPanel;
