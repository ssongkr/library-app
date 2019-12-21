import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import SearchButton from '../components/common/SearchButton';
import colors from '../styles/colors';
import BookHomeTab from '../navigator/BookHomeTab';

class BookHomeView extends Component {
	render() {
		return (
			<View style={styles.container}>
				<SearchButton
					scene='BookSearch'
					message='어떤 책을 찾고 계신가요?'
					navigation={this.props.navigation} />
				<BookHomeTab />
			</View>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
});
export default BookHomeView;