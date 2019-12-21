import React from 'react';
import {
    View,
    FlatList,
    StyleSheet,
} from 'react-native';
import NoticeListItem from './NoticeListItem';

const NoticeList = (props) => {
    let data = props.noticeData.notices;
    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.scrollContainer}
                data={data}
                keyExtractor={({id}) => id}
                renderItem={({item}) => <NoticeListItem { ...item }/> }
            />
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContainer: {
		paddingBottom: 8,
	}
});

export default NoticeList;