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
    ScrollView
} from 'react-native';

let {height, width} = Dimensions.get('window');
import newEdit from "./newEditAndroid";
import SQLite from "react-native-sqlite-storage";
import styles from "./pageStyleAndroid"

function openCB() {
    console.log('open!')
}
function errorCB(err) {
    console.log(err)
}

let db = SQLite.openDatabase({name: "mydata.db", createFromLocation: 1}, openCB, errorCB);

export default class ActView extends React.Component {
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
            value: '',
            title: '',
            time: '',
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

    edit() {
        this.props.navigator.push({
            name: 'newEdit',
            component: newEdit,
            params: {
                year: this.state.year,
                month: this.state.month,
                date: this.state.date,
                id: this.props.id,
                fetchData: this.props.fetchData
            }
        })
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
                    <TouchableOpacity style={styles.back} onPress={()=>this.edit()}>
                        <Text style={{color: '#fff'}}>编辑</Text>
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
                            <Text>{this.state.title}</Text>
                        </View>
                    </View>
                    <View style={styles.actList}>
                        <View style={styles.actTitle}>
                            <Text style={styles.actTitleText}>时段</Text>
                        </View>
                        <Text style={styles.actListContainer}>
                            <Text>{this.state.time}</Text>
                        </Text>
                    </View>
                    <View style={styles.actList2}>
                        <View style={styles.actTitle2}>
                            <Text style={styles.actTitleText}>内容</Text>
                        </View>
                        <View style={[styles.actListContainer, {paddingTop: 12}]}>
                            <ScrollView style={styles.textHeight}>
                                <Text style={styles.textArea2}>{this.state.value}</Text>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}