import React from 'react';
import { 
    View, 
    Text,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/colors';

const Header = (props) => {
    return (		
        <View style={styles.container}>
            <StatusBar
                backgroundColor={colors.toolbar}
                barStyle="dark-content" />
            <Text style={styles.titleText}>모바일 이용증</Text>
            <View style={styles.refreshIconContainer}>
                <TouchableOpacity
                    onPress={props.fetchMobileID}>
                    <Ionicons 
                        name='md-refresh'
                        size={28} 
                        color='#4a4a4a' />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		height: 72,
		width: '100%',
        elevation: 3,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.toolbar,
        justifyContent: 'space-between',
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginLeft: 16,
        color: colors.primary_black,
    },
    refreshIconContainer: {
        margin: 8, 
		padding: 8,
	}, 
	infoContainer: {
		marginVertical: 12,
		marginHorizontal: 42,
		height: 124,
	},
});

export default Header;