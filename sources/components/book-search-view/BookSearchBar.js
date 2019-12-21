import React, { Component } from 'react';
import { 
    View,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableNativeFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/colors';

const BookSearchBar = (props) => {

    const { fetchBooks, setKeyword } = props;

    const _onChangeText = (text) => {
        setKeyword(text); 
    }

    const _onSubmitEditing = () => {
        fetchBooks(props.bookState.keyword, 1);
    }

    const _onBackPress = () => {
        props.navigation.goBack();
    }

    return (				
        <View style={styles.container}>
            <TextInput 
                style={styles.searchBox}
                autoFocus='true'
                underlineColorAndroid='transparent'
                placeholder='검색어를 입력해 주세요.' 
                onChangeText={_onChangeText}
                onSubmitEditing={_onSubmitEditing} 
            />
            <View style={styles.backContainer} >
                <TouchableNativeFeedback
                    onPress={_onBackPress} >
                    <Ionicons 
                        name='md-close'
                        size={24} 
                        color='gray' />
                </TouchableNativeFeedback>
            </View>
        </View>
    )
}

const SCREEN_WIDTH = Dimensions.get('screen');
const styles = StyleSheet.create({
	container: {
		height: 72,
		backgroundColor: colors.toolbar,
		elevation: 3,
	},
	searchBox: {
		height: 48,
		width: SCREEN_WIDTH - 16,
		backgroundColor: 'white',
		elevation: 3,
		marginTop: 12,
		marginHorizontal: 8,
		paddingLeft: 48,
		borderRadius: 2,
		fontSize: 14,
	},
	backContainer: {
		position: 'absolute',
		elevation: 5,
		zIndex: 9999,
		width: 28,
		height: 28,
		left: 25,
		top: 24,
	},
})

export default BookSearchBar;