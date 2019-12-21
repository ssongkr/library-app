import React, { Component } from 'react';
import { 
	View,
	StyleSheet, 
} from 'react-native';
import NoticeSearchBar from '../components/notice-search-view/NoticeSearchBar';
import NoticeList from '../components/notice-search-view/NoticeList';
import colors from '../styles/colors';

import { searchNotice, setKeyword } from '../redux/actions/NoticeSearchActions';
import { connect } from 'react-redux';
import LoadingSpinner from '../components/common/LoadingSpinner';

class NoticeSearchView extends Component {

	renderResponseData = () => {
		return (this.props.items.isFetching)
			? <LoadingSpinner />
			: <NoticeList {...this.props} />
	}

	render() {
		return (
			<View style={styles.container}>
				<NoticeSearchBar {...this.props}/>
				<this.renderResponseData />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
});

const mapStateToProps = state => ({
	input: state.noticeSearchReducers.keywordReducer,
	items: state.noticeSearchReducers.searchReducer,
})

const mapDispatchToProps = dispatch => ({
	setKeyword: (keyword) => dispatch(setKeyword(keyword)),
	searchNotice: (page, keyword) => dispatch(searchNotice(page, keyword)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NoticeSearchView);