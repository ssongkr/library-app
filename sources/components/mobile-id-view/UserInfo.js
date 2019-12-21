import React from 'react';
import { 
    View, 
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import colors from '../../styles/colors';

const UserInfo = (data) => {
    //밑에 styles에 대해서는 조금 조정이 필요하지 않을까 논의

    const { 
        user_name, 
        user_code, 
        user_deptName, 
        user_patName, 
        user_photoUrl
    } = data;

    return (		
        <View style={styles.container}>
            <Image
                style={styles.userImage}
                source={{ uri: user_photoUrl }} />

            <View style={styles.infoContainer}>
                <Text style={styles.textName}>{user_name}</Text>
                <View style={styles.border} />
                <Text style={styles.textCode}>{user_code}</Text>
                <View style={styles.border} />
                <Text style={styles.textMajor}>{user_deptName}, {user_patName}</Text>
            </View>	

        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
	},
	userImage: {
		height: 128,
		width: 128,
		marginTop: -64,
		borderRadius: 64,
		borderColor: 'white',
		borderWidth: 5,
	},
	infoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
		marginVertical: 12,
		marginHorizontal: 42,
		height: 124,
    },
    textName: {
		fontSize: 27,
		color: '#233340',
        fontWeight: "bold",
        fontWeight: '600',
	},

	textCode: {
		fontSize: 16,
        color: '#666666',
        fontWeight: '600',
	},

	textMajor: {
		fontSize: 19,
        color: '#666666',
    },
    border: {
        borderBottomWidth: 1, 
        borderBottomColor: colors.border, 
        marginVertical: 2
    }
});

export default UserInfo;