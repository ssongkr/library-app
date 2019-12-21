import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
} from 'react-native';
import ReservedListItem from './ReservedListItem';
import colors from '../../styles/colors';

const ReservedList = (props) => {

    const data = props.books.reservedInfo;

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>예약현황</Text>
            <FlatList
                data={data}
                keyExtractor={({id}) => id}
                renderItem={ ({item}) => <ReservedListItem { ...item }/> }
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

export default ReservedList;