import React, { Component } from 'react';
import { 
    createBottomTabNavigator, 
    createStackNavigator 
} from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MobileIDView from '../containers/MobileIDView'
import Setting from '../containers/Setting'
import colors from '../styles/colors';

import NoticeHomeView from '../containers/NoticeHomeView';
import NoticeDetailView from '../containers/NoticeDetailView';
import NoticeSearchView from '../containers/NoticeSearchView';

import BookHomeView from '../containers/BookHomeView';
import BookSearchView from '../containers/BookSearchView';
import BookDetailView from '../containers/BookDetailView';

import FacHomeView from '../containers/FacilityHomeView';

const NoticeNavigator = createStackNavigator({
    NoticeHome:	  { screen: NoticeHomeView },
    NoticeSearch: { screen: NoticeSearchView },
    NoticeDetail: { screen: NoticeDetailView },
}, {navigationOptions: {
    header: null,
}});
NoticeNavigator.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;
    if(navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible: tabBarVisible,
    };
}

const BookNavigator = createStackNavigator({
    BookHome:   { screen: BookHomeView },
    BookSearch: { screen: BookSearchView },
    BookDetail: { screen: BookDetailView }
}, {navigationOptions: {
    header: null,
}});
BookNavigator.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;
    if(navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return { 
        tabBarVisible: tabBarVisible,
    };
}

const Navigator = createBottomTabNavigator({
    이용증: { screen: MobileIDView },
    공지사항: { screen: NoticeNavigator },
    도서: { screen: BookNavigator },
    시설물: { screen: FacHomeView },
    설정: { screen: Setting },
    
}, {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                switch (routeName) {
                    case '이용증':
                        iconName = 'md-person';
                        break;
                    case '공지사항':
                        iconName = 'ios-notifications';
                        break;
                    case '도서':
                        iconName = 'ios-book';
                        break;
                    case '시설물':
                        iconName = 'md-create';
                        break;
                    case '설정':
                        iconName = 'ios-settings';
                        break;
                }
                return <Ionicons name={iconName} size={horizontal ? 30 : 28} color={tintColor} />
            }
        }),
        tabBarOptions: {
            activeTintColor: colors.primary_light,
            inactiveTintColor: '#c0c0c0',
            scrollEnabled: true,
            labelStyle: {
              fontSize: 10,
            },
            style: {
                paddingBottom: 4,
                paddingTop: 4,
                height: 56,
                borderTopWidth: 0.5,
                borderTopColor: '#eeeeee'
            },

            safeAreaInset: false,
        },  
    }
);

class HomeNavigator extends Component {
    render() {
        return (
            <Navigator />
        );
    }
}

export default HomeNavigator;