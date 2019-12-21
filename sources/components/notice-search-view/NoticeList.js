import React from 'react';
import { 
	View, 
	StyleSheet, 
	FlatList,
} from 'react-native';
import NoticeListItem from '../notice-home-view/NoticeListItem';
import LoadingSpinner from '../common/LoadingSpinner';

const NoticeList = (props) => {

	const { searchNotice } = props;
	const { page, data, isFetchingMore } = props.items;
	const { keyword } = props.input;

	const _renderFooter = () => {
		return isFetchingMore &&
			<LoadingSpinner />
	}

	const _fetchMoreNotice = () => {
		searchNotice(page, keyword);
    }
    
	return (
		<View style={styles.container}>
			<FlatList
				contentContainerStyle={{paddingBottom: 72}}
				data={data}
				keyExtractor={({id}) => id}
				scrollEventThrottle={16}
				ListFooterComponent={_renderFooter}
				onEndReached={_fetchMoreNotice}
				onEndReachedThreshold={0.001}
				renderItem={({item}) => 
					<NoticeListItem
                        seq={item.seq}
						title={item.subject}
						contents={item.content_preview}
						date={item.date_time}
						url={item.url}
						author={item.author}
						navigation={props.navigation}
						content={item.content}
					/>
				}
			/>
		</View>
	)
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
});

export default NoticeList;