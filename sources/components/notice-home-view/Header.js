import React from 'react';
import {
    StyleSheet,
    Animated,
    Dimensions,
    Picker,
} from 'react-native';
import SearchButton from '../common/SearchButton';
import colors from '../../styles/colors';

const Header = (props) => {

    const categories = [
        { label: '공지사항', value: '공지' }, 
        { label: '학사', value: '학사' }, 
        { label: '국제교류', value: '국제교류' }, 
        { label: '취업', value: '취업' }, 
        { label: '장학', value: '장학' }, 
        { label: '교내모집', value: '교내모집' }, 
    ];

    const setCategoryAndFetch = (category) => {
        props.setCategory(category);
        props.fetchNotice(0, category);
    }
    
    return (
        <Animated.View style={[styles.container, { height: props.headerHeight }]}>
            <SearchButton
                scene='NoticeSearch'
                message='어떤 공지사항을 찾고 계신가요?'
                navigation={props.navigation} />
            <Picker style={styles.picker}
                selectedValue={props.category}
                onValueChange={(itemValue) => setCategoryAndFetch(itemValue)}>
                {categories.map(({label, value}) => 
                    <Picker.Item label={label} value={value}/>
                )}
            </Picker>
        </Animated.View>
    )
}

const HEADER_EXPANDED_HEIGHT = 116;
const { width: SCREEN_WIDTH } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        height: HEADER_EXPANDED_HEIGHT,
        width: SCREEN_WIDTH,
        backgroundColor: colors.toolbar,
        elevation: 3,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 99,
    },
    picker: {
        marginLeft: 12,
        height: 32,
        width: 124,
    },
});

export default Header;