import React, { Component } from 'react';
import SplashScreen from "react-native-splash-screen";
import LoginNavigator from './sources/navigator/LoginNavigator';

import store from './sources/redux/store';
import { Provider } from 'react-redux';
import { checkPermission } from './sources/modules/RNFCM';
import firebase from 'react-native-firebase';

export default class App extends Component {

	componentDidMount() {
		SplashScreen.hide();
		checkPermission();
	}

	async componentDidMount() {
		SplashScreen.hide();
		checkPermission();

		this.messageListener = firebase.messaging().onMessage((message) => {
			// Process your message as required
			console.log(message);
		});
	}

	componentWillUnmount() {
		this.messageListener();
	}


	render() {
		return (
			<Provider store={store}>
				<LoginNavigator />
			</Provider>
		);
	}
}
