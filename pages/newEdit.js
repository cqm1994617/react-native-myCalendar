/**
 * Created by chenqiming on 16/2/9.
 */
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
    Animated,
    TouchableHighlight,
    Alert,
    AlertIOS
} from 'react-native';

let {height, width} = Dimensions.get('window');
import SQLite from "react-native-sqlite-storage";
import styles from "./pageStyle"

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
            time: '',
            isVisible: false,
            modalOpacity: new Animated.Value(0)
        }
    };

    componentDidMount() {
        let select = 'select * from data where id = ' + this.props.id;
        console.log(select);
        let _this = this;
        db.transaction((tx) => {
            tx.executeSql(select, [], (tx, result)=> {
                this.setState({
                    year: result.rows.item(0).year,
                    month: result.rows.item(0).month,
                    date: result.rows.item(0).date,
                    value: result.rows.item(0).value,
                    title: result.rows.item(0).title,
                    time: result.rows.item(0).time,
                    length: result.rows.item(0).value.length,
                })
            })
        });
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

    myAlert() {
        AlertIOS.alert(
            '您的活动时段',
            null,
            [
                {text: '早晨', onPress: () => this.setState({time: '早晨'})},
                {text: '上午', onPress: () => this.setState({time: '上午'})},
                {text: '中午', onPress: () => this.setState({time: '中午'})},
                {text: '下午', onPress: () => this.setState({time: '下午'})},
                {text: '晚上', onPress: () => this.setState({time: '晚上'})},
            ]
        )
    }

    save() {
        db.transaction((tx) => {
            let del = 'delete from data where id=1 or id=2 or id=3 or id=4 or id=5 or id=6 or id=7';
            let update = 'update data set value = ' + '\'' + this.state.value + '\', ' + 'title = ' + '\''
                + this.state.title + '\', ' + 'time = ' + '\'' + this.state.time + '\'' + 'where id = ' + this.props.id;
            tx.executeSql(update, [], (tx, result)=> {
                this.props.fetchData()
                this.props.navigator.popToTop()
            })
        });
    }

    ifDelete() {
        Alert.alert(
            '确认删除该事件?',
            '删除后不可恢复!',
            [
                {text: '是', onPress: () => this.delete()},
                {text: '否'},
            ]
        )
    }

    delete() {
        db.transaction((tx) => {
            let del = 'delete from data where id=' + this.props.id;
            tx.executeSql(del, [], (tx, result)=> {
                this.props.fetchData()
                this.props.navigator.popToTop()
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
                                       onChangeText={(t)=>this.setState({title: t})} value={this.state.title}
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
                    <Text style={styles.textLength}>{this.state.length}/500</Text>
                    <View style={{alignItems: 'center'}}>
                        <TouchableHighlight style={styles.delBtn} onPress={this.ifDelete.bind(this)}
                                            underlayColor='#eee'>
                            <Text style={styles.delBtnText}>删除</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }
}

