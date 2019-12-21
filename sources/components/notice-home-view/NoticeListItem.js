import React from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TouchableNativeFeedback, 
} from 'react-native';
import colors from '../../styles/colors'

const NoticeListItem = (props) => {
        
    const _onPress = () => {
        props.navigation.navigate('NoticeDetail', {data: props});
	}
	
	return (
		<TouchableNativeFeedback 
			onPress={_onPress} >
			<View
				style={styles.container}>
				<Text style={styles.title}>{props.title}</Text>
				<Text style={styles.contents} numberOfLines={3}>{props.contents}</Text>
				<Text style={styles.date}>{props.date}</Text>
			</View>
		</TouchableNativeFeedback>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		borderBottomWidth: 1.0,
		borderColor: '#eeeeee',
	},
	title: {
		fontSize: 15,
		fontWeight: 'bold',
		marginBottom: 4,
		color: colors.primary_black,
	}, 
	contents: {
		fontSize: 12,
	}, 
	date: {
		fontSize: 10,
		marginBottom: 4,
		alignSelf: 'flex-end'
	}
});

export default NoticeListItem;