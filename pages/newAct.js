'use strict';

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Navigator,
    Image,
    TextInput,
    TouchableOpacity,
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
            length: 0,
            title: '',
            value: '',
            animated: true,
            transparent: true,
            modalVisible: true,
            time: '早晨'
        }
    };

    componentDidMount() {

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
    };

    save() {
        db.transaction((tx) => {
            let del = 'delete from data where id=1 or id=2 or id=3 or id=4 or id=5 or id=6 or id=7';
            let insert = 'insert into data(id, title, value, time, year, month, date) values(null,' + '\'' + this.state.title + '\', \''
                + this.state.value + '\', \'' + this.state.time + '\',' + this.props.year + ',' + this.props.month + ','
                + this.props.date + ')';
            let select = 'select * from data'
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
                                       style={styles.textInput} onChangeText={(t)=>this.setState({title: t})}/>
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
                            <TextInput autoCapitalize="none" style={styles.textArea}
                                       maxLength={500} multiline={true} onChangeText={(t)=>this.changeText(t)}
                                       value={this.state.value} placeholder="不超过500字" />
                        </View>
                    </View>
                </View>
                <Text style={styles.textLength}>{this.state.length}/500</Text>

            </View>
        )
    }
}
