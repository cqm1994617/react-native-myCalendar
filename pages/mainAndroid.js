'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    ListView,
    Dimensions,
    ScrollView,
    ViewPagerAndroid,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    BackAndroid,
    PixelRatio
} from 'react-native';
import chineseLunar from "./chinese-lunar"
import SQLite from "react-native-sqlite-storage";
import newAct from "./newActAndroid";
import actView from "./actViewAndroid"
let {height, width} = Dimensions.get('window');

function openCB() {
    console.log('open!')
}
function errorCB(err) {
    console.log(err)
}

let db = SQLite.openDatabase({name: "mydata.db", createFromLocation: 1}, openCB, errorCB);


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
            nextMonth: this.props.date.getMonth(),
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            busyDay: []
        }
    };

    componentDidMount() {
        this.fetchData()
    };

    componentWillMount() {
        this.monthDay = [31, 28 + this.isLeap(this.state.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const {navigator} = this.props;
        this.backListener = BackAndroid.addEventListener('hardwareBackPress', function () {
            if (navigator.getCurrentRoutes().length > 1) {
                navigator.pop();
                return true;

            } else {
                return false;
            }
        })
    };

    isLeap(year) {
        let res;
        return ((year % 100 == 0) ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0) ? 1 : 0);
    };

    fetchData() {
        let select = 'select * from data where year = ' + this.state.year + ' and month = '
            + this.state.month + ' and date = ' + this.state.date;
        let dateCheck = 'select date from data where year = ' + this.state.year + ' and month = '
            + this.state.month;
        db.transaction((tx) => {
            tx.executeSql(select, [], (tx, result) => {
                //result.rows.length;
                let arr = []
                for (let i = 0; i < result.rows.length; i++) {
                    arr.push(result.rows.item(i))
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(arr)
                })
            })
        });
        db.transaction((tx) => {
            tx.executeSql(dateCheck, [], (tx, result) => {
                let arr = [];

                for (let i = 0; i < result.rows.length; i++) {
                    arr.push(result.rows.item(i).date)
                }
                this.setState({busyDay: arr})
            })
        })
    };

    nextMonth() {
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

    myScroll(event) {
        var that = this;
        if (event.nativeEvent.position == 2) {
            this.nextMonth()
        }
        if (event.nativeEvent.position == 0) {
            this.prev()
        }
        that.refs.trueViewPager.setPageWithoutAnimation(1)

        this.fetchData()
    };

    selectDay(d) {
        this.setState({
            date: d
        })
        this.fetchData()
    };

    backTodayTouch() {
        this.setState({
            year: this.state.staticYear,
            month: this.state.staticMonth,
            date: this.state.staticDate
        })
    }

    render() {
        return (
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
                <ViewPagerAndroid style={styles.list} initialPage={1}
                                  onPageSelected={event=>this.myScroll(event)} ref="trueViewPager">
                    <View>
                        <ScrollView>
                            <DateBoard year={this.state.year} month={this.state.month-1} date={this.state.date}
                                       selectDay={this.selectDay.bind(this)} isLeap={this.isLeap}
                                       fetchData={this.fetchData.bind(this)} busyDay={this.state.busyDay}/>
                            <ActList navigator={this.props.navigator} year={this.state.year} month={this.state.month}
                                     date={this.state.date} fetchData={this.fetchData.bind(this)}
                                     dataSource={this.state.dataSource}/>
                        </ScrollView>
                    </View>
                    <View>
                        <ScrollView>
                            <DateBoard year={this.state.year} month={this.state.month} date={this.state.date}
                                       selectDay={this.selectDay.bind(this)} isLeap={this.isLeap}
                                       fetchData={this.fetchData.bind(this)} busyDay={this.state.busyDay}/>
                            <ActList navigator={this.props.navigator} year={this.state.year} month={this.state.month}
                                     date={this.state.date} fetchData={this.fetchData.bind(this)}
                                     dataSource={this.state.dataSource}/>
                        </ScrollView>
                    </View>
                    <View>
                        <ScrollView>
                            <DateBoard year={this.state.year} month={this.state.month+1} date={this.state.date}
                                       selectDay={this.selectDay.bind(this)} isLeap={this.isLeap}
                                       fetchData={this.fetchData.bind(this)} busyDay={this.state.busyDay}/>
                            <ActList navigator={this.props.navigator} year={this.state.year} month={this.state.month}
                                     date={this.state.date} fetchData={this.fetchData.bind(this)}
                                     dataSource={this.state.dataSource}/>
                        </ScrollView>
                    </View>
                </ViewPagerAndroid>
            </View>

        )
    }
}

class DateBoard extends React.Component {
    static defaultProps = {
        year: 2016,
        month: 0,
        busyDay: [],
    };
    static propTypes = {
        year: React.PropTypes.number,
        month: React.PropTypes.number,
        selectDay: React.PropTypes.func,
        isLeap: React.PropTypes.func,
        date: React.PropTypes.number,
        busyDay: React.PropTypes.array
    };

    constructor(props) {
        super(props);

        this.isBusy = false;
    };
    componentDidMount() {

    }

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
            let lunar = chineseLunar.solarToLunar(new Date(myYear, myMonth, i));
            if (this.props.date == i) {
                if (this.props.busyDay.indexOf(i) > -1) {
                    arr.push(
                        <TouchableOpacity onPress={this.props.selectDay.bind(this, i)} key={i} style={styles.dateBox}>
                            <View style={[styles.selected, {backgroundColor: '#35c0c5'}]}>
                                <View style={styles.point}></View>
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
                            <View style={[styles.selected, {backgroundColor: '#35c0c5'}]}>
                                <Text style={[styles.dateText, {color: '#fff', fontWeight: 'bold'}]}>{i}</Text>
                                <Text style={[styles.dateText, styles.lunarFont, {color: '#fff', fontWeight: 'bold'}]}>
                                    {chineseLunar.dayName(lunar.day)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                }

            } else {
                if (this.props.busyDay.indexOf(i) > -1) {
                    arr.push(
                        <TouchableOpacity onPress={this.props.selectDay.bind(this, i)} key={i} style={styles.dateBox}>
                            <View style={styles.selected}>
                                <View style={styles.point}></View>
                                <Text style={styles.dateText}>{i}</Text>
                                <Text
                                    style={[styles.dateText, styles.lunarFont]}>{chineseLunar.dayName(lunar.day)}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                } else {
                    arr.push(
                        <TouchableOpacity onPress={this.props.selectDay.bind(this, i)} key={i} style={styles.dateBox}>
                            <View style={styles.selected}>
                                <Text style={styles.dateText}>{i}</Text>
                                <Text
                                    style={[styles.dateText, styles.lunarFont]}>{chineseLunar.dayName(lunar.day)}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
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


class ActList extends React.Component {
    static propTypes = {
        year: React.PropTypes.number,
        month: React.PropTypes.number,
        date: React.PropTypes.number,
        dataSource: React.PropTypes.object,
        fetchData: React.PropTypes.func
    };

    constructor(props) {
        super(props);
    };

    newAct() {
        const navigator = this.props.navigator;
        if (navigator) {
            navigator.push({
                name: 'newAct',
                component: newAct,
                params: {
                    year: this.props.year,
                    month: this.props.month,
                    date: this.props.date,
                    fetchData: this.props.fetchData
                }
            })
        }
    };

    actView(i) {
        this.props.navigator.push({
            name: 'actView',
            component: actView,
            params: {
                id: i,
                year: this.props.year,
                month: this.props.month,
                date: this.props.date,
                fetchData: this.props.fetchData
            }
        })
    };

    renderRow(r) {
        return (
            <TouchableHighlight onPress={this.actView.bind(this, r.id)} style={styles.addBtn} underlayColor="#eee">
                <View style={styles.bView}>
                    <View style={styles.time}>
                        <Text style={{fontSize: 12, color: '#FFA500'}}>{r.time}</Text>
                    </View>
                    <View style={styles.textBorder}>
                        <Text style={styles.btnText}>{r.title}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    };

    render() {
        return (
            <View>
                <ListView bounces={false} dataSource={this.props.dataSource}
                          renderRow={(row)=>this.renderRow(row)}/>
                <TouchableHighlight style={styles.addBtn} underlayColor="#eee" onPress={()=>this.newAct()}>
                    <View style={styles.bView}>
                        <Image style={styles.addImg} source={require('./tianjia.png')}/>
                        <View style={styles.textBorder}>
                            <Text style={styles.btnText}>创建活动</Text>
                        </View>
                    </View>
                </TouchableHighlight>
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
        height: 50,
        backgroundColor: '#000',
        flexDirection: 'row'
    },
    dayTitle: {
        flex: 1,
        height: 50,
        alignItems: 'center'
    },
    dayTimeTouch: {
        height: 50,
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
        height: 50,
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
        height: height - 95,
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
        width: 42,
        height: 42,
        borderRadius: 21,
    },
    addBtn: {
        width: width,
        height: 60,
    },
    bView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#ea8010',
        fontWeight: 'bold',
    },
    textBorder: {
        height: 60,
        width: width - 50,
        justifyContent: 'center',
        borderBottomWidth: .5,
        borderColor: '#eee'
    },
    time: {
        width: 42,
        height: 42,
        marginLeft: 5.5,
        borderRadius: 21,
        borderWidth: 1,
        borderColor: '#ea8010',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addImg: {
        marginLeft: 3,
        width: 42,
        height: 42,
    },
    point: {
        position: 'absolute',
        left: 19,
        top: 3,
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#f00'
    }
});