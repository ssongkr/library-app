import React, { Component } from 'react'
import { 
    View, 
	StyleSheet,
	ScrollView,
} from 'react-native'
import colors from '../styles/colors';
import MyBookSummary from '../components/my-book-view/MyBookSummary';
import RentalList from '../components/my-book-view/RentalList';
import ReservedList from '../components/my-book-view/ReservedList';
import { fetchMyBooks } from '../redux/actions/BookHomeActions';
import { connect } from 'react-redux';

class MyBookView extends Component {

	componentDidMount() {
		this.props.fetchMyBooks();
	}

	// TODO reservation button indexing
	render() {
		return (
			<View style={styles.container}>
				<ScrollView style={styles.container}>
					<MyBookSummary {...this.props.myBookData} />
					<RentalList {...this.props.myBookData} />
					<ReservedList {...this.props.myBookData} />
				</ScrollView>
			</View>
		)
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
})

const mapStateToProps = state => ({
	myBookData: state.bookHomeReducers.fetchMyBookReducer
})

const mapDispatchToProps = dispatch => ({
	fetchMyBooks: () => dispatch(fetchMyBooks())
})

export default connect(mapStateToProps, mapDispatchToProps)(MyBookView);