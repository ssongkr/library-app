import React from 'react';
import { 
    View, 
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import colors from '../../styles/colors';

const BookDetails = (bookData) => {
	return (				
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image 
					style={styles.image} 
					source={bookData.image} />
			</View>
			<View style={styles.infoContainer}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>{bookData.title}</Text>
				</View>
				<View style={styles.detailContainer}>
					<Text style={[styles.detail, {color: '#595959'}]}>[ {bookData.type} ]</Text>
					<Text style={styles.detail}>글쓴이: {bookData.author}</Text>
					<Text style={styles.detail}>출판사: {bookData.publisher}</Text>
					<Text style={styles.detail}>출판년도: {bookData.date}</Text>
				</View>
			</View>
		</View>
	)
}

export default BookDetails;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: 'white',
		marginHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#d3d3d3'
	},
	imageContainer: {
		flex: 1,
		flexDirection: 'column',
		marginVertical: 22,
	},
	infoContainer: {
		flex: 2,
		flexDirection: 'column',
		marginTop: 20,
	},
	titleContainer: {
		marginBottom: 16,
		paddingLeft: 8,
	},
	detailContainer: {
		marginBottom: 16,
		paddingLeft: 8,
	},
	image: {
		height: 144,
		width: 104,
		borderWidth: 1,
		borderColor: '#cccccc',
	},
	title: {
		fontSize: 17,
		fontWeight: 'bold',
		color: colors.primary_black,
	},
	detail: {
		fontSize: 13,
		color: '#757575',
	},
});