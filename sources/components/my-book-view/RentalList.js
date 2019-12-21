import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
} from 'react-native';
import RentalListItem from './RentalListItem';
import colors from '../../styles/colors';

const RentalList = (props) => {

    const data = props.books.rentalInfo;

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>대여현황</Text>
            <FlatList
                data={data}
                keyExtractor={({id}) => id}
                renderItem={ ({item}) => <RentalListItem {...item}/> }
            />
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 8,
		marginVertical: 4,
		elevation: 2,
		backgroundColor: 'white',
	},
	titleText: {
		fontSize: 20,
		fontWeight: 'bold',
		padding: 8,
		paddingLeft: 16,
		color: colors.primary_black,
	},
});

export default RentalList;