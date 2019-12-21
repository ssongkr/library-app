import React from 'react';
import {
    View,
    Text,
    WebView,
    StyleSheet,
    ScrollView,
} from 'react-native';
import colors from '../../styles/colors';

const NoticeDetails = (data) => {

    console.log(data.content);

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text styledd={styles.writeInfo}>작성자: {data.author} | 작성일: {data.date}</Text>
                    <Text style={styles.attachments}>첨부파일</Text>
                </View>
                <WebView
                    style={styles.webView}
                    source={{ html: data.content }} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    infoContainer: {
        flex: 1,
        margin: 16,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 8
    },
    writeInfo: {
        fontSize: 13,
        color: 'gray',
        marginBottom: 20,
    },
    attachments: {
        fontSize: 15,
        color: colors.primary,
        marginBottom: 8,
    },
    webView: {
        height: 2000,
        margin: 8,
        elevation: 3,
    }
});

export default NoticeDetails;