import React, {PropTypes} from 'react';
import {
  ScrollView,
  ViewPagerAndroid,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';
import util from './lib/util';
import CalendarHead from './components/CalendarHead';
import CalendarPanel from './components/CalendarPanel';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  v: {
    width,
    height: 250
  }
});

export default class Calendar extends React.Component {

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
  };

  static defaultProps = {
    width,
    height: 250
  };

  state = {
    today: new Date(),
    currentDate: new Date(),
    nextMonthDate: util.getNextMonthDate(new Date()),
    preMonthDate: util.getPreMonthDate(new Date()),
  };
  scrollView = null;

  scrollEnd(event) {
    const scrollView = this.scrollView;
    const {width} = this.props;
    const {currentDate} = this.state;

    let changeDate = currentDate;

    if (Platform.OS === 'ios') {
      const offsetX = event.nativeEvent.contentOffset.x
      if (offsetX < width) {
        //上个月
        changeDate = util.getPreMonthDate(currentDate)
      } else if (offsetX > width) {
        //下个月
        changeDate = util.getNextMonthDate(currentDate)
      }

      offsetX !== width && scrollView.scrollTo({x: width, animated: false});
    } else {
      if (event.nativeEvent.position === 0) {
        //上个月
        changeDate = util.getPreMonthDate(currentDate)
      } else {
        //下个月
        changeDate = util.getNextMonthDate(currentDate)
      }
      scrollView.setPageWithoutAnimation(1);
    }

    this.setState({
      currentDate: changeDate,
      nextMonthDate: util.getNextMonthDate(changeDate),
      preMonthDate: util.getPreMonthDate(changeDate)
    });
  }

  render() {
    const {preMonthDate, currentDate, nextMonthDate} = this.state;
    const {width, height} = this.props;
    console.log(preMonthDate, currentDate, nextMonthDate);
    if (Platform.OS === 'ios') {
      return (
        <View>
          <CalendarHead date={currentDate} />
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            onMomentumScrollEnd={(event) => this.scrollEnd(event)}
            ref={(scrollView) => this.scrollView = scrollView}
            contentOffset={{x: width}}
          >
            <CalendarPanel
              date={preMonthDate}
              width={width}
              height={height}
            />
            <CalendarPanel
              date={currentDate}
              width={width}
              height={height}
            />
            <CalendarPanel
              date={nextMonthDate}
              width={width}
              height={height}
            />
          </ScrollView>
        </View>
      );
    }
    return (
      <View>
        <CalendarHead date={currentDate} />
        <ViewPagerAndroid
          style={{height: 250}}
          initialPage={1}
          onPageSelected={(event) => this.scrollEnd(event)}
          ref={(scrollView) => this.scrollView = scrollView}
        >
          <CalendarPanel date={preMonthDate}/>
          <CalendarPanel date={currentDate}/>
          <CalendarPanel date={nextMonthDate}/>
        </ViewPagerAndroid>
      </View>
    )
  }
}
