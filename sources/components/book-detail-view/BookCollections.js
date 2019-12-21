import React from 'react';
import { 
    View, 
    Text,
    StyleSheet,
} from 'react-native';
import colors from '../../styles/colors';
import { Table, Row, Rows } from 'react-native-table-component';

const BookCollections = (table) => {
	return (								
		<View>
			<Text style={styles.collectionTitle}>소장자료</Text>
			<View style={styles.tableContainer}>
				{/* 대출가능 색상 지정 1. 라이브러리 수정 2...다른 방법 */}
				<Table
					borderStyle={{borderWidth: 1, borderColor: '#cccccc'}}>
					<Row
						data={table.head} 
						flexArr={[2, 5, 2]}
						style={styles.tableHead} 
						textStyle={styles.tableHeadText}/>
					<Rows 
						flexArr={[2, 5, 2]}
						data={table.data}
						textStyle={styles.tableDataText} />
				</Table>
			</View>
		</View>
	)
}
export default BookCollections;

const styles = StyleSheet.create({
	collectionTitle: {
		fontSize: 22,
		fontWeight: 'bold',
		marginTop: 16,
		marginLeft: 20,
		marginBottom: 2,
		color: colors.primary_black,
	},
	tableContainer: {
		flex: 1, 
		padding: 12, 
		backgroundColor: '#ffffff',
	},
	tableHead: { 
		height: 40, 
		backgroundColor: '#fffdeb',
	},
	tableHeadText: {
		fontSize: 15,
		color: colors.primary_black,
		marginVertical: 12,
		textAlign: 'center', 
		fontWeight: 'bold',
	},
	tableDataText: {
		fontSize: 15,
		color: '#565656',
		marginVertical: 8,
		textAlign: 'center', 
		fontWeight: '100',
	},
});