import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	Animated,
} from 'react-native';
import Header from '../components/notice-home-view/Header';
import LoadingSpinner from '../components/common/LoadingSpinner';
import NoticeList from '../components/notice-home-view/NoticeList';

import { setCategory, fetchNotice } from '../redux/actions/NoticeHomeActions';
import { connect } from 'react-redux';

import store from '../redux/store'

class NoticeHomeView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			scrollY: new Animated.Value(0),
		};
	}

	componentDidMount() {
		this.props.fetchNotice();
	}
	
	renderResponseData = () => {
		return (this.props.noticeItems.isFetching)
			? <View style={styles.spinner}> 
				<LoadingSpinner />
			  </View>
			: <NoticeList {...this.props}
				scrollY={this.state.scrollY} />
	}

	render() {
		const headerHeight = this.state.scrollY.interpolate({
			inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
			outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
			extrapolate: 'clamp',
		});
		return (
			<View style={styles.container}>
				<Header {...this.props}
					headerHeight={headerHeight} />
				<this.renderResponseData />
			</View>
		)
	};
}

const HEADER_EXPANDED_HEIGHT = 116;
const HEADER_COLLAPSED_HEIGHT = 72;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	spinner: {
		flex: 1,
		paddingTop: HEADER_EXPANDED_HEIGHT,
	},
});

const mapStateToProps = (state) => ({
	category: state.noticeHomeReducers.categoryReducer.category,
	noticeItems: state.noticeHomeReducers.fetchReducer,
})

const mapDispatchToProps = (dispatch) => ({
	setCategory: (category) => dispatch(setCategory(category)),
	fetchNotice: (page, type) => dispatch(fetchNotice(page, type)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NoticeHomeView);