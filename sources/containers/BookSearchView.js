import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import BookSearchBar from '../components/book-search-view/BookSearchBar';
import BookList from '../components/book-search-view/BookList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import colors from '../styles/colors';

import { fetchBooks, setKeyword } from '../redux/actions/BookSearchActions';
import { connect } from 'react-redux';

class BookSearchView extends Component {
	renderMainContents = () => {
		return this.props.bookState.isFetching
				? <LoadingSpinner/>
				: <BookList {...this.props}/>
	}

	render() {
		return (
			<View style={styles.container}>
				<BookSearchBar {...this.props}/>
				<this.renderMainContents />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	}
});

const mapStateToProps = state => ({
	bookState: state.bookSearchReducer,
})

const mapDispatchToProps = dispatch => ({
	fetchBooks: (keyword, page) => dispatch(fetchBooks(keyword, page)),
	setKeyword: (keyword) => { dispatch(setKeyword(keyword)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(BookSearchView);
