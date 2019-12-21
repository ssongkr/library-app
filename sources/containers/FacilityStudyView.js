import React, { Component } from 'react';
import { 
	View, 
	Text, 
	StyleSheet,
	TouchableOpacity,
	Dimensions, 
	FlatList,
	TextInput
} from 'react-native';
import { 
    createStackNavigator 
} from 'react-navigation';
import colors from '../styles/colors';
import moment from 'moment'
import DatetimePicker from 'react-native-modal-datetime-picker'
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoadingSpinner from '../components/common/LoadingSpinner';

class RoomlistView extends React.Component{
	constructor(){
		super()
		this.state = {
			isVisible: false,
			chosenDate: moment(),
			dataSource: [],
			isLoading: false,
		}
	}

	componentDidMount(){
		//현재 시간에 예약가능한 스터디룸 보여주는것도 나쁘지는 않을듯
	}

	addAvilableUser = (inputJson) => {
		let returnJson = new Array();
		
		for(var key in inputJson){
			var temp = new Object()
			//null값은 예약이 불가능한 스터디룸
			//예약이 가능한 스터디룸은 int under24
			if(inputJson[key].reservationer + 0 < 24 || inputJson[key].reservationer + 0 >= 0){
				var [min, max] = this.getAviliableUser(inputJson[key])
				temp = inputJson[key];
				temp["min"] = min;
				temp["max"] = max;
				returnJson.push(temp);
			}
		}
		//roomId순으로 정렬
		returnJson.sort(function(a,b){
			if(parseInt(a.roomId) < parseInt(b.roomId))
				return -1;
			if(parseInt(a.roomId) > parseInt(b.roomId))
				return 1
			return 0
		});

		console.log(returnJson)

		//state 갱신
		this.setState({
			dataSource: returnJson,
		})
	}

	getAviliableUser = (item) => {	
		//이거 roomId에 대해서 각자 설정 해줘야할듯
		//tuple로 min max 반환
		switch(item.roomId){
			case "17":
			case "18":
			case "19":
			case "20":
				//2~4명
				return [2,4];
			case "21":
			case "22":
				//2~5명
				return [2,5];
			case "11":
			case "15":
			case "16":
			case "23":
			case "24":
			case "25":
			case "32":
			case "33":
				//3~8명
				return [3,8];
			case "10":
			case "12":
			case "13":
			case "14":
			case "26":
			case "27":
			case "28":
			case "29":
			case "30":
			case "31":			
				//3~6명
				return [3,6];
			case "2":
			case "3":
			case "9":
				//4~8명
				return [4,8];
			case "1":
				//4~9명
				return [4,9];
			case "4":
				//4~18명
				return [4,18];
			case "5":
				//5~10명
				return [5,10];	
			case "8":
				//10~32명
				return [10,32];
			case "34":
			case "35":
			case "36":
				//5~16명
				return [5,16];	
			default:
				return [0,0];
		}
	}

	handlePicker = (date) => {
		this.setState({
			isVisible: false,
			chosenDate: date,
			isLoading: true
		})

		var url = 'http://ncm.sejong.ac.kr:8084/studyroom/datetime?'
		let dateFormat = moment(this.state.chosenDate).format('YYYY-MM-DD')
		let timeFormat = moment(this.state.chosenDate).format('HH:mm')
		let reverse = false;
		

		if(reverse == true)
			url = url + "date=" + dateFormat + "&time=" + timeFormat + '&reverse=true'
		else
			url = url + "date=" + dateFormat + "&time=" + timeFormat + '&reverse=false'

		fetch(url)
		.then((response) => response.json())
		.then((responseJson) => {
			this.addAvilableUser(responseJson.data);
			this.setState({
				isVisible: false,
				chosenDate: date,
				isLoading: false
			})
		})
		.catch(err => {
            console.log(err);
		})	
	}

	showPicker = () => {
		this.setState({
			isVisible: true
		})
	}

	hidePicker = () => {
		this.setState({
			isVisible: true
		})
	}

	selectItem(item){
		console.log("=========================")
		console.log(item);
		console.log(this.props)
		
		this.props.navigation.navigate('Reserve', item)
	}

	renderItem = ({item}) => {
		return(
			<TouchableOpacity style = {{flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 10}}
				onPress={() => this.selectItem(item)}>
				<View style = {{width: 60, height: 60, borderRadius: 60/2, backgroundColor: colors.primary_light , justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginTop: 10,}}>
					<Text style = {{fontSize: 25, color: 'white', textAlign: 'center'}}>
						{item.roomId}
					</Text>
				</View>
				<View style = {{flex: 1, justifyContent: 'center', marginLeft: 10}}>
					<Text style = {{fontSize: 23, color: 'black', marginBottom: 5}}>
						{item.displayName}
					</Text>
					<Text style = {{fontSize: 14, color: 'black',}}>
						{"사용가능인원 : "}{item.min}{"~"}{item.max}{"명"}
					</Text>
				</View>
			</TouchableOpacity>
		)
	}

	renderSeparator = () => {
		return(
			<View
				style = {{height: 1, width: '100%', backgroundColor: '#ededed'}}>
			</View>
		)
	}

	renderFlatList = () => {
		return(
			this.state.isLoading
			?
			<LoadingSpinner/>
			:
			<View style={{flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center'}}>
				<View style={{height: '95%', width: '95%', backgroundColor: 'white'}}>
				<FlatList
					data={this.state.dataSource}
					renderItem={this.renderItem}
					keyExtractor={(item, index) => index}
					ItemSeparatorComponent={this.renderSeparator}
				/>
				</View>
			</View>
		)
	}

	render(){
		return (
			<View style={styles.container}>
			<DatetimePicker
				isVisible={this.state.isVisible}
				onConfirm={this.handlePicker}
				onCancel={this.hidePicker} 
				mode={'datetime'}
				datePickerModeAndroid={'spinner'}
				is24Hour={false}
			/>
			<TouchableOpacity 
				style={styles.searchButton}
				onPress={this.showPicker}>
				<Text style={styles.message}>
					{moment(this.state.chosenDate).format('YYYY-MM-DD HH:mm')}
				</Text>	
			</TouchableOpacity>
			<View style={styles.searchIcon}>
				<Ionicons
					name='ios-search'
					size={22} 
					color='#aaaaaa'/>
			</View>
			<this.renderFlatList/>
		</View>
		)
	}
}

class ReserveView extends React.Component{
	constructor(){
        super()
        this.state = {
            userDataSource: [],
        }
	}
	
	componentDidMount(){
		console.log(this.props);

		var tempJson = new Array();
		var maxOfUser = this.props.navigation.state.params.max;
		
		for (var i =0; i < maxOfUser; i++){
			var temp = new Object()

			temp["index"] = i;
			temp["userName"] = '';
			temp["userCode"] = '';
			temp["realCode"] = '';
			tempJson.push(temp);
		}

		this.setState({
			userDataSource: tempJson,
		})
	}

    reserve = () => {
		/*
        let url = 'http://library.sejong.ac.kr/studyroom/BookingProcess.axa'
        let data = new FormData()

        data.append("year", "2018")
        data.append("month", "12")
        data.append("day", "12")
        data.append("startHour", "14")
        data.append("closeTime", "15")
        data.append("hours", "1")
        data.append("altPid1", peopleSource[0].id)
        data.append("name1", peopleSource[0].name)
        data.append("altPid2", peopleSource[1].id)
        data.append("name2", peopleSource[1].name)
        data.append("purpose", "팀플")
        data.append("ipid1",  peopleSource[0].pid)
        data.append("ipdi2",  peopleSource[1].pid)
        //자기학번 호출해서 입력
        var pid = '' //call funcion
        pid = '136317'
        data.append("ipid0", pid )
        data.append("ipid", pid)
        data.append("roomId", "15")
        data.append("mode", "INSERT")

        fetch(url, {
            method: 'POST',
            headers: {
                'cookie': 'JSESSIONID=91FCB93EA9C98120D1BE7ABA844C30CD;',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
        .then((response) => response.json())
		.then((responseJson) => {
			//if로 성공됬는지 확인
			this.props.navigation.goBack()
		})
		*/
		this.props.navigation.goBack();
	}

	renderItem = ({item}) => {
        return(
            <View style = {{flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
				<View style = {{width: 60, height: 60, borderRadius: 60/2, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginTop: 10,}}>
					<Text style = {{fontSize: 25, color: 'white', textAlign: 'center'}}>
						{item.index}
					</Text>
					</View>
				<View style = {{flex: 1, justifyContent: 'center', marginLeft: 10}}>
					<Text style = {{fontSize: 14, color: 'black', marginBottom: 5}}>
						{'학번'}
					</Text>
					<TextInput style={styles.textUserInput}
					underlineColorAndroid='transparent' />
					<Text style = {{fontSize: 14, color: 'black', marginBottom: 5}}>
						{'이름'}
					</Text>
					<TextInput style={styles.textUserInput}
					underlineColorAndroid='transparent' />
				</View>
			</View>
        )
    }

    renderSeparator = () => {
		return(
			<View
				style = {{height: 1, width: '100%', backgroundColor: '#ededed'}}>
			</View>
		)
	}

	render(){
		return(
			<View style={styles.container}>
			<View style = {{flex:1, flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
				<View style = {{width: 60, height: 60, borderRadius: 60/2, backgroundColor: colors.primary_light , justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginTop: 10,}}>
					<Text style = {{fontSize: 25, color: 'white', textAlign: 'center'}}>
						{this.props.navigation.getParam('roomId', '')}
					</Text>
				</View>
				<View style = {{flex: 1, justifyContent: 'center', marginLeft: 10}}>
					<Text style = {{fontSize: 23, color: 'black', marginBottom: 5}}>
						{this.props.navigation.getParam('displayName', '강의실 이름')}
					</Text>
					<Text style = {{fontSize: 14, color: 'black',}}>
						{"사용가능인원 : "}{this.props.navigation.getParam("min", '0')}{"~"}{this.props.navigation.getParam("max", '0')}{"명"}
					</Text>
				</View>
			</View>

			<View style = {{flex:3, flexDirection: 'row'}}>
				<FlatList
					data={this.state.userDataSource}
					renderItem={this.renderItem}
					keyExtractor={(item, index) => index}
					ItemSeparatorComponent={this.renderSeparator}
				/>		
			</View>

			<Text style = {{fontSize: 14, color: 'black',}}>예약목적</Text>
			<TextInput style={styles.textInput}
			underlineColorAndroid='transparent' />

			<TouchableOpacity style={styles.button}
			onPress={this.reserve}>
				<Text style={styles.buttonText}>예약하기</Text>
			</TouchableOpacity>
		</View>
		)
	}
}

export default class FacilityStudyView extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return(
			<FacStackNavigator />
		);
	}
}

const FacStackNavigator = createStackNavigator({
	Roomlist: {
		screen: RoomlistView
	},
	Reserve: { 
		screen: ReserveView 
	},
}, {navigationOptions: {
    header: null,
}});

const SCREEN_WIDTH = Dimensions.get('screen');
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	searchButton: {
		height: 48,
		width: SCREEN_WIDTH - 16,
		backgroundColor: 'white',
		elevation: 3,
		marginTop: 12,
		marginBottom: 4,
		marginHorizontal: 8,
		borderRadius: 2,
	}, 
	message: {
		fontSize: 14,
		color: colors.search_text,
		paddingTop: 14,
		paddingLeft: 48,
	},
	infoContainer: {
		marginVertical: 12,
		marginHorizontal: 42,
		height: 124,
	},
	textUserInput: {
        backgroundColor: '#eeeeee',
        elevation: 2,
        marginBottom: 5,
        alignSelf: 'stretch',
    },
    textInput: {
        backgroundColor: '#eeeeee',
        elevation: 2,
        alignSelf: 'stretch',
    },
	searchIcon: {
		position: 'absolute',
		elevation: 5,
		zIndex: 9999,
		width: 28,
		height: 28,
		left: 25,
		top: 25,
	},
	button: {
		backgroundColor: colors.primary_light,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonText: {
		color: 'white',
	}
});