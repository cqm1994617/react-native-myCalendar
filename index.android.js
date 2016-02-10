/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';

import main from './pages/mainAndroid.js';

class myDate extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date()
        }
    };

    render() {
        return (
            <Navigator
                initialRoute={{ name: 'main', component: main, params: {date: this.state.date}}}
                configureScene={() => {
                    return Navigator.SceneConfigs.FloatFromRight;//FloatFromRight
                }}
                renderScene={(route, navigator)=>{
                        let Component = route.component;
                        if(route.component) {
                        return <Component {...route.params} navigator={navigator} />
                    }
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('myDate', () => myDate);
