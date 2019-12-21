import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import colors from '../../styles/colors';

export default class LoadingSpinner extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    size='large' 
                    color={colors.primary_light} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingVertical: 16,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
})