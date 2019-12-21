import React, { Component } from 'react';
import { 
	View, 
	StyleSheet,
	ScrollView,
} from 'react-native';
import Header from '../components/book-detail-view/Header';
import BookDetails from '../components/book-detail-view/BookDetails';
import BookCollections from '../components/book-detail-view/BookCollections';
import LoadingSpinner from '../components/common/LoadingSpinner';

import { fetchBookCollections } from '../redux/actions/BookDetailActions';
import { connect } from 'react-redux';

class BookDetailView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			bookData: this.props.navigation.getParam('bookData', ''), // navi에서 받아오지 말고 state 값을 읽어서 사용하기.
		}
	}

	getCid(url) {
		let splited = url.split('cid=');
		let cid = splited.pop();
		return cid;
	}

	componentDidMount() {
		let url = this.state.bookData.detailUrl;
		let cid = this.getCid(url);
		this.props.fetchCollections(cid);
	}

	render() {
		return (			
            <View style={styles.container}>
				<Header 
					title={this.state.bookData.title} 
					navigation={this.props.navigation}/>
				<this.renderMainContents />
            </View>
		);
	}

	renderMainContents = () => {
		const table = {
			'data': this.props.collections.data,
			'head': ['등록번호', '소장위치 / 청구기호', '대출정보'],
		}
		if(this.props.collections.isFetching) {
			return <LoadingSpinner />
		} else {
			return (
				<ScrollView style={styles.container}>
					<BookDetails {...this.state.bookData}/>
					<BookCollections {...table}	/>
				</ScrollView>
			)
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
});

const mapStateToProps = state => ({
	collections: state.bookDetailReducer,
})

const mapDispatchToProps = dispatch => ({
	fetchCollections: (cid) => dispatch(fetchBookCollections(cid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailView);
