import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TextInput,
    StatusBar,
    KeyboardAvoidingView,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import colors from '../styles/colors';
import firebase from 'react-native-firebase';
import * as keychain from 'react-native-keychain';
import { makeEncryptedRealID, parseXml } from '../modules/DataCrypter';

export default class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
        }
    }

    componentWillMount() {
        //keychain이 있다면 자동으로 로그인
        keychain
            .getGenericPassword()
            .then(credentials => {
                console.log("==========================")
                console.log(credentials)
                if(credentials != false){
                    this.setState({
                        id: credentials.username,
                        password: credentials.password,
                    })
                    this.postLogin()
                }
            })
            .catch(function (err) {
                console.log(`Keychain을 불러오는데 실패. 아마 값이 비어있는 경우 ${err}`);
            })
    }

    login = () => {
        if (this.state.id == '') {
            ToastAndroid.show('ID 가 비어 있습니다', ToastAndroid.LONG)
        }
        if (this.state.password == '') {
            ToastAndroid.show('PW가 비어 있습니다', ToastAndroid.LONG)
        } else {
            this.postLogin();
        }
    }

    postLogin(){
        const { navigate } = this.props.navigation;

        let temp_id = this.state.id;
        let temp_pw = this.state.password;
        let p_id = encodeURIComponent(makeEncryptedRealID(this.state.id));
        let p_pw = encodeURIComponent(makeEncryptedRealID(this.state.password));

        console.log(`${p_id}\n${p_pw}`)
        let url = `http://210.107.226.14/mobile/MA/xml_login_min.php?id=${p_id}&pass_wd=${p_pw}`;
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then(response => response.text())
            .then((response) => {
                parseXml(response.toString(), function (result) {
                    console.log(result);
                    if (result.root.item[0].result_code == 0) {
                        //로그인 성공
                        console.log("login success")
                        console.log(this.props);

                        //keychain 저장
                        keychain
                            .setGenericPassword(temp_id, temp_pw)
                            .then(function () {
                                console.log("ID & PW saved")
                                navigate('home');
                            })
                            .catch(function (err) {
                                console.log(err);
                            })
                    } else {
                        ToastAndroid.show('ID 혹은 PW가 잘못되었습니다', ToastAndroid.LONG)
                    }
                })
            })
            .catch(err => {
                console.log(err);
                ToastAndroid.show('학술정보원 서버에 접속할 수 없습니다.', ToastAndroid.LONG)
            })
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <StatusBar
                    backgroundColor={colors.primary}
                    barStyle="light-content" />
                <KeyboardAvoidingView style={styles.wrapper}>
                    <View style={styles.logoContainer}>
                        <Image
                            style={styles.logo}
                            source={require('../assets/images/logo.png')} />
                    </View>

                    <View style={styles.loginContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder='ID'
                            onChangeText={(id) => this.setState({ id })}
                            underlineColorAndroid='transparent' />

                        <TextInput
                            style={styles.textInput}
                            secureTextEntry={true}
                            placeholder='PASSWORD'
                            onChangeText={(password) => this.setState({ password })}
                            underlineColorAndroid='transparent' />

                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.login} >
                            <Text style={styles.buttonText}>LOG IN</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>세종대학교 학술정보원</Text>
                    </View>

                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    logoContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: colors.primary,
    },
    loginContainer: {
        flex: 3,
        paddingLeft: 32,
        paddingRight: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: colors.primary,
    },
    logo: {
        width: 130,
        height: 130,
    },
    textInput: {
        backgroundColor: '#eeeeee',
        elevation: 2,
        marginBottom: 24,
        padding: 8,
        paddingLeft: 16,
        alignSelf: 'stretch',
        borderRadius: 45,
    },
    button: {
        backgroundColor: '#d5d5a5',
        elevation: 2,
        padding: 10,
        alignSelf: 'stretch',
        borderRadius: 45,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2a363b',
        alignSelf: 'center',
        borderRadius: 45,
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#eeeeee',
        marginBottom: 12,
        padding: 24,
        justifyContent: 'flex-end',
        alignSelf: 'center',
    }
});
