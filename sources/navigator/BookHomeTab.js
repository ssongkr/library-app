import { createMaterialTopTabNavigator } from 'react-navigation';
import colors from '../styles/colors';
import MyBookView from '../containers/MyBookView';
import MyBookNoticeView from '../containers/MyBookNoticeView';

const BookHomeTab = createMaterialTopTabNavigator({
    '나의도서': { screen: MyBookView },
	'알림': { screen: MyBookNoticeView },
}, {
	tabBarOptions: {
		activeTintColor: colors.primary_black,
		inactiveTintColor: '#c0c0c0',
		labelStyle: {
			fontSize: 16,
			fontWeight: 'bold',
		},
		style: {
			height: 48,
			elevation: 3,
			backgroundColor: colors.toolbar,
		}, 
		indicatorStyle: {
			backgroundColor: colors.primary_light,
			height: 0,
		}
	}
});

export default BookHomeTab;
