import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {VEHICLES, STARSHIPS, PEOPLE} from '../service/constants'
import EntityScreen from '../screens/EntityScreen'
import {View} from 'react-native-animatable'
import { Header, Content, Footer, FooterTab, Button, Text, Icon } from 'native-base';
interface AppProps {
  
}

interface AppState{
  activeScreen:string
}

export default  class App extends Component<AppProps,AppState> {

  constructor(props:any){
    super(props)
    this.state={
      activeScreen:PEOPLE
    }
  }

 

  getFooter(){
    return (
      <View style={styles.footer}>
        <Footer >
            <FooterTab>
              <Button onPress={()=>{this.setState({activeScreen:PEOPLE})}} active={this.state.activeScreen===PEOPLE}>
                <Icon name="ios-people"/>
                <Text>People</Text>
              </Button>
              <Button onPress={()=>{this.setState({activeScreen:VEHICLES})}} active={this.state.activeScreen===VEHICLES}>
                <Icon name="robot-industrial" type="MaterialCommunityIcons"/>
                <Text>Vehicles</Text>
              </Button>
              <Button onPress={()=>{this.setState({activeScreen:STARSHIPS})}} active={this.state.activeScreen===STARSHIPS}>
                <Icon name="space-shuttle" type="FontAwesome"/>
                <Text>Starships</Text>
              </Button>
            </FooterTab>
          </Footer>
      </View>
    )
  }

  render() {
    return (
        <View animation="fadeInUp" style={styles.main}>
          <View style={{flex:1, width:'100%',height:'100%'}}>
            {this.state.activeScreen ===PEOPLE ? <EntityScreen entity={PEOPLE}/>: null }
            {this.state.activeScreen ===VEHICLES ? <EntityScreen entity={VEHICLES}/>: null }
            {this.state.activeScreen ===STARSHIPS ? <EntityScreen entity={STARSHIPS}/>: null }
          </View>
          {this.getFooter()}
        </View>
    )
  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  main: {
    flex:1,
    height:'100%',
    width:'100%'
  },
  header: {
    fontSize: 40
  },
  footer:{justifyContent:"flex-end",}
})

