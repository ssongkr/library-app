import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { fetchMobileID } from '../redux/actions/MobileIDActions';
import LoadingSpinner from '../components/common/LoadingSpinner';
import MobileID from '../components/mobile-id-view/MobileID';
import UserInfo from '../components/mobile-id-view/UserInfo';
import Header from '../components/mobile-id-view/Header'

class MobileIDView extends Component {

	componentDidMount() {
		this.props.fetchMobileID();
	}

	render() {
		return (
			<View style={styles.container}>
				<Header {...this.props}/>
				<this.renderMainContents />
			</View>
		);
	}

	renderMainContents = () => {
		return this.props.userState.isFetching
			? <LoadingSpinner />
			: <View style={styles.container}>
				<MobileID {...this.props.userState.userData}/>
				<UserInfo {...this.props.userState.userData}/>
			</View>
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: '#fdfdfd',
		alignItems: 'center',
		justifyContent: 'center',
	},
})

const mapStateToProps = (state) => ({
	userState: state.mobileIDReducer
})

export default connect( mapStateToProps, { fetchMobileID } )(MobileIDView);