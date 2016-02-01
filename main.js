'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    ListView,
    Dimensions,
    ScrollView,
    StatusBarIOS,
    TouchableOpacity,
    PixelRatio
} from 'react-native';
import chineseLunar from "chinese-lunar"
let {height, width} = Dimensions.get('window');

export default class Main extends React.Component {
    static propTypes = {
        date: React.PropTypes.instanceOf(Date)
    };

    constructor(props) {
        super(props);
        this.state = {
            year: this.props.date.getFullYear(),
            month: this.props.date.getMonth(),
            date: this.props.date.getDate(),
            staticYear: this.props.date.getFullYear(),
            staticMonth: this.props.date.getMonth(),
            staticDate: this.props.date.getDate(),
            nextMonthYear: this.props.date.getFullYear(),
            nextMonth: this.props.date.getMonth()
        }
    };

    componentWillMount() {
        this.monthDay = [31, 28 + this.isLeap(this.state.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        StatusBarIOS.setStyle(1, false);
    };

    nextMonth() {
        //let monthDay = [31, 28 + this.isLeap(this.state.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (this.state.month == 11) {
            if (this.state.date > this.monthDay[0]) {
                this.setState({
                    date: this.monthDay[0]
                })
            }
            this.setState({
                year: this.state.year + 1,
                month: 0,
            })
        } else {
            if (this.state.date > this.monthDay[this.state.month + 1]) {
                this.setState({
                    date: this.monthDay[this.state.month + 1]
                })
            }
            this.setState({
                month: this.state.month + 1,
            })
        }
    };

    prev() {
        let monthDay = [31, 28 + this.isLeap(this.state.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (this.state.month == 0) {
            if (this.state.date > this.monthDay[11]) {
                this.setState({
                    date: this.monthDay[11]
                })
            }
            this.setState({
                year: this.state.year - 1,
                month: 11,
            })
        } else {
            if (this.state.date > this.monthDay[this.state.month - 1]) {
                this.setState({
                    date: this.monthDay[this.state.month - 1]
                })
            }
            this.setState({
                month: this.state.month - 1,
            })
        }
    }

    isLeap(year) {
        let res;
        return ((year % 100 == 0) ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0) ? 1 : 0);
    };

    selectDay(d) {
        console.log(d)
        this.setState({
            date: d
        })
    };

    myScroll(event) {
        let scrollX = event.nativeEvent.contentOffset.x;
        if (scrollX > width) {
            this.nextMonth()
        } else if (scrollX < width) {
            this.prev()
        } else {

        }
        this.refs.trueScroll.scrollWithoutAnimationTo(0, width)
    };

    backTodayTouch() {
        this.setState({
            year: this.state.staticYear,
            month: this.state.staticMonth,
            date: this.state.staticDate
        })
    };

    render() {
        return (
            <ScrollView bounces={false}>
                <View style={styles.container}>
                    <View style={styles.head}>
                        <View style={styles.dayTitle}>
                            <TouchableOpacity onPress={(event)=>{console.log(event.nativeEvent.pageY)}}
                                              style={styles.dayTimeTouch}>
                                <Text style={styles.t1}>
                                    {this.state.year + '年' + (this.state.month + 1) + '月' + (this.state.date) + '日'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={()=>this.backTodayTouch()} style={styles.backTodayTouch}>
                            <Text style={styles.backToday}>今天</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dateTitle}>
                        <Text style={styles.dateTitleText}>日</Text>
                        <Text style={styles.dateTitleText}>一</Text>
                        <Text style={styles.dateTitleText}>二</Text>
                        <Text style={styles.dateTitleText}>三</Text>
                        <Text style={styles.dateTitleText}>四</Text>
                        <Text style={styles.dateTitleText}>五</Text>
                        <Text style={styles.dateTitleText}>六</Text>
                    </View>
                    <ScrollView horizontal={true} contentOffset={{x: width, y: 0}}
                                bounces={false} onMomentumScrollEnd={event=>this.myScroll(event)} ref="trueScroll"
                                showsHorizontalScrollIndicator={false} pagingEnabled={true}>
                        <DateBoard year={this.state.year} month={this.state.month-1} date={this.state.date}
                                   selectDay={this.selectDay.bind(this)} isLeap={this.isLeap}/>
                        <DateBoard year={this.state.year} month={this.state.month} date={this.state.date}
                                   selectDay={this.selectDay.bind(this)} isLeap={this.isLeap}/>
                        <DateBoard year={this.state.year} month={this.state.month+1} date={this.state.date}
                                   selectDay={this.selectDay.bind(this)} isLeap={this.isLeap}/>
                    </ScrollView>
                </View>
            </ScrollView>
        )
    }
}

class DateBoard extends React.Component {
    static defaultProps = {
        year: 2016,
        month: 0
    };
    static propTypes = {
        year: React.PropTypes.number,
        month: React.PropTypes.number,
        selectDay: React.PropTypes.func,
        isLeap: React.PropTypes.func,
        date: React.PropTypes.number
    };

    constructor(props) {
        super(props);
    };

    isLeap(year) {
        let res;
        return ((year % 100 == 0) ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0) ? 1 : 0);
    };

    renderDate() {
        let myMonth, myYear = 0;
        if (this.props.month == 12) {
            myMonth = 0;
            myYear = this.props.year + 1;
        } else if (this.props.month == -1) {
            myMonth = 11;
            myYear = this.props.year - 1;
        } else {
            myMonth = this.props.month;
            myYear = this.props.year
        }
        let fd = new Date(myYear, myMonth, 1);
        let firstDay = fd.getDay();
        let monthDay = [31, 28 + this.props.isLeap(this.props.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let arr = [];
        for (let i = 0; i < firstDay; i++) {
            arr.push(<View key={-i} style={styles.dateBox}></View>)
        }
        for (var i = 1; i < monthDay[myMonth] + 1; i++) {
            let lunar = chineseLunar.solarToLunar(new Date(myYear, myMonth, i))

            if (this.props.date == i) {
                arr.push(
                    <TouchableOpacity onPress={this.props.selectDay.bind(this, i)} key={i} style={styles.dateBox}>
                        <View style={[styles.selected, {backgroundColor: '#35c0c5'}]}>
                            <Text style={[styles.dateText, {color: '#fff', fontWeight: 'bold'}]}>{i}</Text>
                            <Text style={[styles.dateText, styles.lunarFont, {color: '#fff', fontWeight: 'bold'}]}>
                                {chineseLunar.dayName(lunar.day)}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            } else {
                arr.push(
                    <TouchableOpacity onPress={this.props.selectDay.bind(this, i)} key={i} style={styles.dateBox}>
                        <View style={styles.selected}>
                            <Text style={styles.dateText}>{i}</Text>
                            <Text style={[styles.dateText, styles.lunarFont]}>{chineseLunar.dayName(lunar.day)}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }
        }
        return arr;
    };

    render() {
        return (
            <View style={styles.dateBoard}>
                {this.renderDate()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    head: {
        paddingTop: 20,
        height: 60,
        backgroundColor: '#000',
        flexDirection: 'row'
    },
    dayTitle: {
        flex: 1,
        height: 40,
        alignItems: 'center'
    },
    dayTimeTouch: {
        height: 40,
        justifyContent: 'center'
    },
    t1: {
        fontSize: 14,
        textAlign: 'center',
        color: '#fff',
    },
    backTodayTouch: {
        position: 'absolute',
        right: 0,
        height: 40,
        justifyContent: 'center'
    },
    backToday: {
        fontSize: 14,
        color: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
    },
    dateTitle: {
        flexDirection: 'row',
        paddingTop: 3,
        paddingBottom: 3,
        borderBottomWidth: .5,
        borderColor: '#ddd'
    },
    dateTitleText: {
        width: width / 7 - 1,
        textAlign: 'center',
        fontSize: 10,
    },

    dateBoard: {
        width: width,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'rgb(250, 250, 250)',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#ccc'
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    dateBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 7 - 1,
        height: width / 7 - 1,
    },
    dateText: {
        fontSize: 14,
    },
    lunarFont: {
        fontSize: 9,
    },
    selected: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 38,
        height: 38,
        borderRadius: 19,
    }
});