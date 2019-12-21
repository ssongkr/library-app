import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/notice-detail-view/Header';
import MainContents from '../components/notice-detail-view/NoticeDetails';
import colors from '../styles/colors';

class NoticeDetailView extends Component {

    render() {
        const data = this.props.navigation.getParam('data', '');

        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}/>
                <MainContents {...data}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
});

export default NoticeDetailView;