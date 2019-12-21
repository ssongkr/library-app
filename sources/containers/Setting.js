import React, { Component } from 'react'
import { 
	View, 
	Text, 
	StyleSheet,
	TouchableOpacity,
    ToastAndroid 
} from 'react-native'
import colors from '../styles/colors';
import * as keychain from 'react-native-keychain';

export default class Setting extends Component {
	logout = () =>{
		keychain
		.resetGenericPassword()
		.then(function(){
			ToastAndroid.show('로그아웃 되었습니다.', ToastAndroid.LONG);
			//처음 view로 넘겨야 하는데 작동 안하는중
			//key체인 삭제는 정상적으로 이루어짐
			this.props.navigation.navigate('login');
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.button}
					onPress={this.logout} >
					<Text style={styles.buttonText}>LOGOUT</Text>
				</TouchableOpacity>
			</View>
		)
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	button: {
        backgroundColor: colors.primary_light,
        elevation: 2,
        padding: 10,
        alignSelf: 'stretch',
	},
	buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        borderRadius: 45,
    },
})