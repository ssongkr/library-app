import React from 'react';
import { 
	View, 
	StyleSheet, 
	FlatList,
	Animated,
} from 'react-native';
import NoticeListItem from './NoticeListItem';
import LoadingSpinner from '../common/LoadingSpinner';

const NoticeList = (props) => {

	const category = props.category;
	const { isFetchingMore, data, page } = props.noticeItems;
	const fetchNotice = props.fetchNotice;
	
	const renderFooter = () => {
		return isFetchingMore &&
			<LoadingSpinner />
	};

	const fetchMoreNotice = () => {
		fetchNotice(page, category);
	}
	return (
		<View>
			<FlatList
				contentContainerStyle={styles.listContainer}
				data={data}
				keyExtractor={({id}) => id}
				scrollEventThrottle={16}
				ListFooterComponent={renderFooter}
				onEndReached={fetchMoreNotice}
				onEndReachedThreshold={0.001}
				onScroll={ Animated.event(
					[{ nativeEvent: {
						contentOffset: {
							y: props.scrollY
						}
					}}]
				)}
				renderItem={({item}) => 
					<NoticeListItem
						title={item.subject}
						contents={item.content_preview}
						date={item.date_time}
						url={item.url}
						author={item.author}
						category={props.category}
						navigation={props.navigation}
						content={item.content}
						attachments={item.attachments}
					/>
				}
			/>
		</View>
	)

}

const HEADER_EXPANDED_HEIGHT = 116;

const styles = StyleSheet.create({
	listContainer: {
		paddingTop: HEADER_EXPANDED_HEIGHT,
	},
});

export default NoticeList;