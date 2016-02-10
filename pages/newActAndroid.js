'use strict';

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Navigator,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    BackAndroid,
    Animated
} from 'react-native';
//!!!
let {height, width} = Dimensions.get('window');
import SQLite from "react-native-sqlite-storage";
import styles from "./pageStyleAndroid"

function openCB() {
    console.log('open!')
}
function errorCB(err) {
    console.log(err)
}

let db = SQLite.openDatabase({name: "mydata.db", createFromLocation: 1}, openCB, errorCB);

export default class NewAct extends React.Component {
    static propTypes = {
        year: React.PropTypes.number,
        month: React.PropTypes.number,
        date: React.PropTypes.number
    };

    constructor(props) {
        super(props);
        this.state = {
            year: this.props.year,
            month: this.props.month,
            date: this.props.date,
            length: 0,
            title: '',
            value: '',
            time: '早晨',
            isVisible: false,
            modalOpacity: new Animated.Value(0)
        }
    };

    componentDidMount() {
    };

    componentWillUnmount() {
        clearTimeout(this.timeout)
    };

    back() {
        const navigator = this.props.navigator;
        navigator.pop()
    };

    changeText(t) {
        this.setState({
            value: t,
            length: t.length
        })
    };

    myAlert() {
        this.setState({
            isVisible: true
        });
        Animated.timing(
            this.state.modalOpacity,
            {
                toValue: 1,
                duration: 200,
            }
        ).start();
    };

    changeTime(t) {
        Animated.timing(
            this.state.modalOpacity,
            {
                toValue: 0,
                duration: 200,
            }
        ).start();
        let _this = this;
        this.timeout = setTimeout(function () {
            _this.setState({
                time: t,
                isVisible: false
            });
        }, 200)
    };

    modalView() {
        if (this.state.isVisible == true) {
            return (
                <Animated.View style={[styles.modalView, {opacity: this.state.modalOpacity}]}>
                    <View style={styles.modalBox}>
                        <View style={styles.modalTitle}>
                            <Text style={styles.modalTitleText}>选择您的活动时间</Text>
                        </View>
                        <TouchableOpacity style={styles.modalList} onPress={(t) => this.changeTime('早晨')}>
                            <Text style={styles.modalListText}>早晨</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalList} onPress={(t) => this.changeTime('上午')}>
                            <Text style={styles.modalListText}>上午</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalList} onPress={(t) => this.changeTime('中午')}>
                            <Text style={styles.modalListText}>中午</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalList} onPress={(t) => this.changeTime('下午')}>
                            <Text style={styles.modalListText}>下午</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalList} onPress={(t) => this.changeTime('晚上')}>
                            <Text style={styles.modalListText}>晚上</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )
        } else {
            return null;
        }
    }

    save() {
        db.transaction((tx) => {
            let del = 'delete from data where id=1 or id=2 or id=3 or id=4 or id=5 or id=6 or id=7';
            let insert = 'insert into data(id, title, value, time, year, month, date) values(null,' + '\'' + this.state.title + '\', \''
                + this.state.value + '\', \'' + this.state.time + '\',' + this.props.year + ',' + this.props.month + ','
                + this.props.date + ')';
            tx.executeSql(insert, [], (tx, result)=> {
                this.props.fetchData()
                this.props.navigator.pop()
            })
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.head}>
                    <TouchableOpacity style={styles.back} onPress={()=>this.back()}>
                        <Image style={styles.backImg} source={require('./fanhui.png')}/>
                    </TouchableOpacity>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>新建活动</Text>
                    </View>
                    <TouchableOpacity style={styles.back} onPress={()=>this.save()}>
                        <Text style={{color: '#fff'}}>保存</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.actContainer}>
                    <View style={styles.actList}>
                        <View style={styles.actTitle}>
                            <Text style={styles.actTitleText}>日期</Text>
                        </View>
                        <View style={styles.actListContainer}>
                            <Text>{this.props.year + '年' + (this.props.month + 1) + '月' + this.props.date + '日'}</Text>
                        </View>
                    </View>
                    <View style={styles.actList}>
                        <View style={styles.actTitle}>
                            <Text style={styles.actTitleText}>标题</Text>
                        </View>
                        <View style={styles.actListContainer}>
                            <TextInput autoCapitalize="none" placeholder="不超过20字" maxLength={20}
                                       onChangeText={(t)=>this.setState({title: t})}
                                       style={styles.textInput} underlineColorAndroid="transparent"/>
                        </View>
                    </View>
                    <View style={styles.actList}>
                        <View style={styles.actTitle}>
                            <Text style={styles.actTitleText}>时段</Text>
                        </View>
                        <TouchableOpacity style={[styles.actListContainer, {height: 50, justifyContent: 'center'}]}
                                          onPress={()=>this.myAlert()}>
                            <Text>{this.state.time}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.actList2}>
                        <View style={styles.actTitle2}>
                            <Text style={styles.actTitleText}>内容</Text>
                        </View>
                        <View style={styles.actListContainer}>
                            <TextInput autoCapitalize="none" style={styles.textArea} textAlignVertical="top"
                                       maxLength={500} multiline={true} onChangeText={(t)=>this.changeText(t)}
                                       value={this.state.value} placeholder="不超过500字"
                                       underlineColorAndroid="transparent"/>
                        </View>
                    </View>
                </View>
                <Text style={styles.textLength}>{this.state.length}/500</Text>
                {this.modalView()}
            </View>
        )
    }
}
