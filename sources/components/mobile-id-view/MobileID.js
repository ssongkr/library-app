import React from 'react';
import { 
    View, 
    StyleSheet,
} from 'react-native';
import QRCode from 'react-native-qrcode';
import colors from '../../styles/colors';

const MobileID = (data) => {
    return (		
        <View style={styles.container}>
            <View style={styles.qrContainer}>
                <QRCode
                    value={data.qr_code + ''}
                    size={120}
                    bgColor='black'
                    fgColor='white' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		height: '58%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.primary_gray,
	},
	qrContainer: {
		height: 140,
		width: 140,
		elevation: 3,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 6,
		marginBottom: 50,
		backgroundColor: 'white',
	},
});

export default MobileID;