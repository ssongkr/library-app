import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import BookListItem from './BookListItem';
import LoadingSpinner from '../common/LoadingSpinner';
import colors from '../../styles/colors';

const BookList = (props) => {

    const { fetchBooks, bookState } = props;

	const _renderFooter = () => {
		return bookState.isFetchingMore &&
			<LoadingSpinner />
	}
	
	const _onEndReached = () => {
		if(bookState.books.length >= 5) {
			fetchBooks(bookState.keyword, bookState.page)
		}
	}

    return (
		<View>               
			<FlatList
				contentContainerStyle={styles.bookList}
				ListFooterComponent={_renderFooter}
				onEndReached={_onEndReached}
				onEndReachedThreshold={0.1}
				keyExtractor={() => bookState.books.id}
				data={bookState.books}
				renderItem={({item}) => 
					<BookListItem 
						{ ...props.navigation }
						{ ...props.bookState.books[item.id] }/>
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},	
	bookList: {
		marginTop: 2,
		paddingBottom: 76,
	},
});

export default BookList;
