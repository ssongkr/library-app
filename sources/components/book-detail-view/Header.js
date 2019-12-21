import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    TouchableNativeFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/colors';

export default class Header extends Component {

	_onPress = () => {
		this.props.navigation.goBack()
	}

	render() {
		return (				
            <View style={styles.container}>
                <View style={styles.backContainer} >
                    <TouchableNativeFeedback onPress={this._onPress}>
                        <Ionicons 
                            name='md-close'
                            size={26} 
							color='#4a4a4a' />
                    </TouchableNativeFeedback>
                </View>
				<Text style={styles.title} numberOfLines={1}>{this.props.title}</Text>
            </View>
		)
	};
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: 72,
		backgroundColor: colors.toolbar,
		elevation: 4,
	},
	backContainer: {
		marginTop: 4,
		marginHorizontal: 24,
		alignSelf: 'center',
	},
	title: {
		flex: 1,
		fontSize: 20,
		fontWeight: 'bold',
		marginRight: 24,
		alignSelf: 'center',
		color: colors.primary_black,
	},
});