import React, { Component } from 'react';
import { 
	View,
    Text,
    StyleSheet,
	TouchableOpacity, 
	Dimensions,
} from 'react-native';
import colors from '../../styles/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';


const SearchButton = (props) => {
        
    // _onPress() {
    //     this.props.navigation.navigate(this.props.scene);
	// }

	const _onPress = () => {
        props.navigation.navigate(props.scene);
	}
	
	return (
		<View style={[styles.container, {elevation: props.elevation}]}>
			<TouchableOpacity 
				style={styles.searchButton}
				//onPress={this._onPress}>
				onPress={_onPress}>
				<Text style={styles.message}>{props.message}</Text>	
			</TouchableOpacity>
			<View style={styles.searchIcon}>
				<Ionicons
					name='ios-search'
					size={22} 
					color='#aaaaaa'/>
			</View>
		</View>
	)
}

const SCREEN_WIDTH = Dimensions.get('screen');
const styles = StyleSheet.create({
	container: {
		height: 72,
		backgroundColor: colors.toolbar,
	},
	searchButton: {
		height: 48,
		width: SCREEN_WIDTH - 16,
		backgroundColor: 'white',
		elevation: 3,
		marginTop: 12,
		marginBottom: 4,
		marginHorizontal: 8,
		borderRadius: 2,
		fontSize: 16,
	}, 
	message: {
		fontSize: 14,
		color: colors.search_text,
		paddingTop: 14,
		paddingLeft: 48,
	},
	searchIcon: {
		position: 'absolute',
		elevation: 5,
		zIndex: 9999,
		width: 28,
		height: 28,
		left: 25,
		top: 25,
	},
});

export default SearchButton;