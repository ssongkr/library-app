import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    TouchableNativeFeedback,
} from 'react-native';
import colors from '../../styles/colors';

const NoticeListItem = (items) => {

    const { subject, date, state, path } = items;

    var _color = colors.primary_black;
    var _font = 'bold';
    if(state === '읽음') {
        _color = '#757575';
        _font = 'normal';
    }

    return (
        <View style={styles.container}>
            <TouchableNativeFeedback>
                <View style={styles.itemContainer}>
                    <Text style={[styles.subjectText, {color: _color, fontWeight: _font}]}>{subject}</Text>
                    <View style={styles.dateContainer}>
                        <Text style={[styles.dateText, {color: _color, fontWeight: _font}]}>{date}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}


const styles = StyleSheet.create({
	container: {
        flex: 1,
        elevation: 3,
        backgroundColor: 'white',
        marginHorizontal: 8,
        marginBottom: 1,
    },
    itemContainer: {
        flex: 1,
        padding: 16,
    },
    dateContainer: {
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'flex-end',
    },
    subjectText: {
        flex: 1,
        fontSize: 15,
        marginBottom: 18,
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
})

export default NoticeListItem;