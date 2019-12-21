import React, { Component } from 'react'
import { 
    View, 
	StyleSheet,
	FlatList,
} from 'react-native';
import NoticeList from '../components/my-book-view/NoticeList';
import { fetchMyBookNotice } from '../redux/actions/BookHomeActions';
import { connect } from 'react-redux';

class MyBookNoticeView extends Component {

	componentDidMount () {
		this.props.fetchMyBookNotice();
	};

	render () {
		return <NoticeList { ...this.props } />		
	};
}

const mapStateToProps = state => ({
	noticeData: state.bookHomeReducers.fetchMyBookNoticeReducer
})

const mapDispatchToProps = dispatch => ({
	fetchMyBookNotice: () => dispatch(fetchMyBookNotice())
})

export default connect(mapStateToProps, mapDispatchToProps)(MyBookNoticeView);