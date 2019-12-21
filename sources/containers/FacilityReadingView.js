import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    FlatList,
 } from 'react-native';
import colors from '../styles/colors';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default class FacilityReadingview extends Component {
    constructor(){
        super()
        this.state = {
            readingroomData: [],
            isLoading: true
        }
    }

    componentDidMount(){
        const url = 'http://ncm.sejong.ac.kr:8084/readingroom/status'
		
		fetch(url)
		.then((response) => response.json())
		.then((responseJson) => {
			this.setState({
				readingroomData: responseJson.data,
				isLoading: false
			})
		})
        .catch(err => {
            console.log(err);
		})
	}


    renderItem = ({item}) => {
        return(
            <View style = {{flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
				<View style = {{width: 60, height: 60, borderRadius: 60/2, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginTop: 10,}}>
					<Text style = {{fontSize: 25, color: 'white', textAlign: 'center'}}>
						{item.roomId}
					</Text>
					</View>
				<View style = {{flex: 1, justifyContent: 'center', marginLeft: 10}}>
					<Text style = {{fontSize: 23, color: 'black', marginBottom: 5}}>
						{item.displayName}
					</Text>
					<Text style = {{fontSize: 14, color: 'black',}}>
						{'사용 좌석수 : '}{item.use}{'   잔여 좌석수 : '}{item.available}
					</Text>
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
    
    renderFlatList = () => {
		return(
			this.state.isLoading
			?
			<LoadingSpinner/>
			:
			<View style={{flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center'}}>
				<View style={{height: '95%', width: '95%', backgroundColor: 'white'}}>
				<FlatList
					data={this.state.readingroomData}
					renderItem={this.renderItem}
					keyExtractor={(item, index) => index}
					ItemSeparatorComponent={this.renderSeparator}
				/>
				</View>
			</View>
		)
	}

	render() {
		return (
            <View style={styles.container}>
            	<this.renderFlatList/>
            </View>
		)
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})