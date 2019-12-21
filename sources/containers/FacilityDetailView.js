import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    StatusBar,
    FlatList
 } from 'react-native';
import colors from '../styles/colors';
import querystring from 'query-string';

export default class FacilityDetail extends Component {
    constructor(){
        super()
        this.state = {
            roomNumber: '',
            peopleMin: '',
            peopleMax: '',
            peopleSource: [],
        }
    }

    componentDidMount(){

    }

    reserve = () => {
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
            
        })
    }

    /*

			for(var key in json){
				switch(json[key].roomId){
					case "25":
					case "26":
					case "27":
					case "28":
						//2~4명
						json[key].reservationer = "2~4명"
						break;
					case "29":
					case "30":
						//2~5명
						json[key].reservationer = "2~5명"
						break;
					case "1":
					case "6":
					case "13":
					case "14":
					case "15":
					case "16":
					case "23":
					case "24":
						//3~8명
						json[key].reservationer = "3~8명"
						break;
					case "2":
					case "3":
					case "4":
					case "5":
					case "17":
					case "18":
					case "19":
					case "20":
					case "21":
					case "22":
						//3~6명
						json[key].reservationer = "3~6명"
						break;
					case "8":
					case "9":
					case "10":
						//4~8명
						json[key].reservationer = "4~8명"
						break;
					case "7":
						//4~9명
						json[key].reservationer = "4~9명"
						break;
					case "11":
						//4~18명
						json[key].reservationer = "4~18명"
						break;
					case "12":
						//5~10명
						json[key].reservationer = "5~10명"
						break;
    */

	render() {
        const { navigate } = this.props;
        /*
        const roomId = navigation.getParam('roomId', '0')
        const displayName = navigation.getParam('displayName', '')
        const aviliableUser = navigation.getParam('aviliableUser', '')
        */
		return (
            <View style={styles.container}>
                <View style = {{flex:1, flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
                    <View style = {{width: 60, height: 60, borderRadius: 60/2, backgroundColor: colors.primary_light , justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginTop: 10,}}>
                        <Text style = {{fontSize: 25, color: 'white', textAlign: 'center'}}>
                            {"0"}
                        </Text>
                    </View>
                    <View style = {{flex: 1, justifyContent: 'center', marginLeft: 10}}>
                        <Text style = {{fontSize: 23, color: 'black', marginBottom: 5}}>
                            {"걍의실 이름"}
                        </Text>
                        <Text style = {{fontSize: 14, color: 'black',}}>
                            {"사용가능인원 : "}{"x명"}
                        </Text>
                    </View>
                </View>

                <View style = {{flex:3, flexDirection: 'row'}}>
				</View>

                <TextInput
                style={styles.textInput}
                underlineColorAndroid='transparent' />

                <TouchableOpacity style={styles.button}
                onPress={this.reserve}>
                    <Text style={styles.buttonText}>예약하기</Text>
                </TouchableOpacity>
            </View>
		)
	};
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    headcontainer: {
		height: 60,
		width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
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
    textInput: {
        backgroundColor: '#eeeeee',
        elevation: 2,
        marginBottom: 24,
        alignSelf: 'stretch',
    },
    button: {
        backgroundColor: colors.primary_light,
        elevation: 2,
        padding: 10,
        alignSelf: 'stretch',
    },
})