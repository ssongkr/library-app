import { 
	createMaterialTopTabNavigator,
	createStackNavigator } from 'react-navigation';
import colors from '../styles/colors';
import FacStudyView from '../containers/FacilityStudyView';
import FacReadingView from '../containers/FacilityReadingView';

const FacHomeTab = createMaterialTopTabNavigator({
    '열람실': { screen: FacReadingView },
	'스터디룸': { screen: FacStudyView },
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

export default FacHomeTab;
