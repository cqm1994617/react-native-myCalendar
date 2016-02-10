/**
 * Created by chenqiming on 16/2/10.
 */

let StyleSheet = require('react-native').StyleSheet;
let Dimensions = require('react-native').Dimensions;
let {height, width} = Dimensions.get('window');

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    head: {
        height: 60,
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center'
    },
    back: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backImg: {
        width: 20,
        height: 20,
    },
    title: {
        flex: 1,
    },
    titleText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    actContainer: {
        borderTopWidth: 1,
        borderColor: '#e0e0e0',
    },
    actList: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        height: 50,
        alignItems: 'center'
    },
    actList2: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    actTitle: {
        width: 50,
    },
    actTitle2: {
        marginTop: 10,
        marginLeft: 8,
    },
    actTitleText: {
        textAlign: 'center',
        fontSize: 17,
        color: '#666'
    },
    actListContainer: {
        marginLeft: 10,
        justifyContent: 'center',
        flex: 1,
    },
    textInput: {
        height: 40,
    },
    textInput2: {
        height: 40,
        justifyContent: 'center'
    },
    textHeight: {
        height: 100,
    },
    textArea: {
        paddingTop: 10,
        height: 100,
        fontSize: 14,
    },
    textLength: {
        padding: 5,
        textAlign: 'right'
    },
    modalView: {
        position: 'absolute',
        top: 0,
        width: width,
        height: height,
        backgroundColor: 'rgba(0, 0, 0, .5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalBox: {
        width: width * 0.7,
        height: 270,
        backgroundColor: '#fff',
        borderRadius: 20
    },
    modalTitle: {
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitleText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    modalList: {
        height: 40,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalListText: {
        fontSize: 14,
        color: '#6495ED'
    },
    delBtn: {
        width: width,
        height: 50,
        borderWidth: 1,
        borderColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center'
    },
    delBtnText: {
        color: '#f00',
        fontSize: 16,
    }
})

module.exports = Styles