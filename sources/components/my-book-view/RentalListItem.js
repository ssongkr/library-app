import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import colors from '../../styles/colors';

const RentalListItem = (data) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{data.rentalBook}</Text>
            <Text>{data.rentalDate} ~ {data.returnDate}</Text>
            <Text>연장횟수: {data.extensionTime}회</Text>
            <Text>연체일수: {data.delayedDate}일</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        alert('연장');
                    }}>
                    <Text style={styles.buttonText}>연장하기</Text>
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
		marginBottom: 4,
		fontWeight: 'bold',
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

export default RentalListItem;