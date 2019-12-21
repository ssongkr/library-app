import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableNativeFeedback,
} from 'react-native';
import colors from '../../styles/colors';

const BookListItem = (props) => {

    let stateColor = '#5b78a1';
    if (props.state !== '대출가능') {
        stateColor = '#c46262';
    }

    const _onPress = () => {
        props.navigate('BookDetail', {bookData: props});
    }

    return (
        <View style={styles.container}>
            <TouchableNativeFeedback
                onPress={_onPress} >
                <View style={styles.bookContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={props.image}
                            style={styles.image} />
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
                        <Text style={styles.publication} numberOfLines={1}>{props.author} | {props.publisher}</Text>
                        <Text style={styles.date}>출판년도: {props.date}</Text>
                        <Text style={[styles.state, { color: stateColor }]}>{props.state}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default BookListItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    bookContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 1,
        marginHorizontal: 8,
        backgroundColor: 'white',
        elevation: 3,
    },
    image: {
        height: 96, 
        width: 72,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#cccccc',
    },
    imageContainer: {
        width: 104,
        justifyContent: 'center',
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    title: {
        flex: 1,
        marginTop: 12,
        marginRight: 24,
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.primary_black,
    },
    publication: {
        flex: 1,
        fontSize: 12,
        marginTop: 4,
        color: '#757575',
        marginRight: 96,
    },
    date: {
        fontSize: 12,
        color: '#757575',
    },
    state: {
        fontSize: 13,
        marginTop: 20,
        marginBottom: 16,
        marginRight: 24,
        alignSelf: 'flex-end',
        fontWeight: 'bold',
    }
})