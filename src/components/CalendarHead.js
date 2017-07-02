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
  },
  dayHead: {
    height: 20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    flexDirection: 'row'
  },
  dayItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayItemText: {
    fontSize: 10,
    color: '#999'
  }
});


const CalendarHead = ({date}) => {

  const day = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <View>
      <View style={styles.head}>
        <Text style={styles.text}>{util.dateFormat(date)}</Text>
      </View>
      <View style={styles.dayHead}>
        {
          day.map(z => <View style={styles.dayItem} key={z}>
            <Text style={styles.dayItemText}>{z}</Text>
          </View>)
        }
      </View>
    </View>
  );
};

export default CalendarHead;
