import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import colors from '../../styles/colors';

const MyBookSummary = (props) => {

    const rentalNum = props.books.rentalInfo.length;
    const reservedNum = props.books.reservedInfo.length;
    const lateFee = props.lateFeeInfo.lateFee;

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>대 여</Text>
                <Text style={styles.text}>{rentalNum} 권</Text>
            </View>
            <View style={styles.border} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>예 약</Text>
                <Text style={styles.text}>{reservedNum} 권</Text>
            </View>
            <View style={styles.border} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>연체료</Text>
                <Text style={styles.text}>{lateFee} 원</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 8,
		marginTop: 8,
		marginBottom: 4,
		height: 96,
		flexDirection: 'row',
		backgroundColor: 'white',
		elevation: 2,
	},
	textContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 16,
		fontWeight: 'bold',
		color: colors.primary_black,
		padding: 4,
    },
    border: {
        borderLeftWidth: 1, 
        borderColor: colors.border, 
        marginVertical: 12,
    }
});

export default MyBookSummary;