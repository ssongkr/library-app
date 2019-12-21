import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
import LoginView from '../containers/LoginView'
import HomeNavigator from './HomeNavigator'

const Navigator = StackNavigator({
	login: LoginView,
	home: HomeNavigator,
},  {
		navigationOptions: { header: null }
	}
);

export default class LoginNavigator extends Component {
	render() {
		return (
            <Navigator />
		)
	};
}