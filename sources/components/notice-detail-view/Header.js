import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableNativeFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/colors';

const Header = (props) => {

    const _onPress = () => {
        props.navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>공지사항</Text>
            <View style={styles.back}>
                <TouchableNativeFeedback onPress={_onPress}>
                    <Ionicons 
                        name='md-close'
                        size={26} 
                        color='#4a4a4a' />
                </TouchableNativeFeedback>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 72,
        elevation: 3,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.toolbar,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginLeft: 16,
        color: colors.primary_black,
    },
    back: {
        margin: 8, 
        padding: 8
    }
});

export default Header;