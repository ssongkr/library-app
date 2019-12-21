import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import colors from '../../styles/colors';

const ReservedListItem = (data) => {
    return (                   
		<View style={styles.container}>
			<Text style={styles.titleText}>{data.reservedBook}</Text>
			<Text>청구기호: {data.callNum}</Text>
			<Text>예약일자: {data.reservedDate}</Text>
			<Text>예약순위: {data.reservedRank}</Text>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					onPress={() => {
						alert('예약취소');
					}}>
					<Text style={styles.buttonText}>예약취소</Text>
				</TouchableOpacity>
			</View>
		</View>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: 'white',
		borderTopWidth: 1,
		borderTopColor: '#f3f3f3',
	},
	titleText: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 4,
		color: colors.primary_black
	},
	buttonContainer: {
		alignSelf: 'flex-end', 
		backgroundColor: '#70808a',
		borderRadius: 8, 
		elevation: 2,
	},
	buttonText: {
		paddingHorizontal: 8, 
		paddingVertical: 6, 
		color: colors.toolbar, 
		fontSize: 12, 
		fontWeight: 'bold',
	}
});

export default ReservedListItem;