import React, { Component } from 'react';
import { 
	View, 
	Text, 
	StyleSheet,
} from 'react-native';
import colors from '../styles/colors';
import FacHomeTab from '../navigator/FacHomeTab'

class FacilityHomeView extends Component{
	render(){
		return (
			<View style={styles.container}>
			<FacHomeTab />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
});
export default FacilityHomeView