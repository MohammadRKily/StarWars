import React, { Component } from "react";
import { Button, Text,  TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { CardItem, Card, Body } from 'native-base';
import apiService from '../../service/baseUrlApi'
const api =apiService.create('')
import Person from '../../model/entities/Person'
import Planet from '../../model/entities/Planet'
import Film from "../../model/entities/Film";
import {View} from 'react-native-animatable'
import font from '../../theme/fonts'
const fontStyle = font.style;


interface PersonItemProps {
  person: Person,
  closeModal:any
}

interface PersonItemState {
  isModalVisible: boolean,
  planet: any 
  films: Film[] 
}

export default class PersonDetails extends Component<PersonItemProps, PersonItemState> {
  state = {
    isModalVisible: true,
    planet:null,
    films: null
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  
  componentDidMount(){  
      this.fetchPlanet()
  }
  
  fetchPlanet() {
    if(this.props.person ){
      const {person} = this.props
      const films = []
      this.state.planet? null: api.fetchUrl(this.props.person.homeworld).then(res=>this.setState({planet:res.data}))
      this.state.films? null: person.films.map((film:string,i)=>{
          api.fetchUrl(film).then(res=>films.push(res.data))
      })
      this.setState({films})
   }
  }

  getPersonalAttributes(person:Person){
    return (
        <View animation="fadeInRight"  duration={1200} delay={500}>
          <Card style={styles.personalAttributes}>
              <CardItem style={{alignSelf:'center'}} header bordered>
                  <Text style={fontStyle.h2}>{person.name}</Text>
              </CardItem>
              <CardItem bordered>
                  <Text style={fontStyle.h3}>
                    Birth Year: {person.birth_year}
                  </Text>
              </CardItem>
              <CardItem bordered>
                  <Text  style={fontStyle.h3}>
                    Gender: {person.gender}
                  </Text>
              </CardItem>
              <CardItem bordered>
                  <Text  style={fontStyle.h3}>
                  Height: {person.height}
                  </Text>
              </CardItem>
              <CardItem bordered>
                  <Text style={fontStyle.h3}>
                  Skin Colour: {person.skin_color}
                  </Text>
              </CardItem>
          </Card>
        </View>
    )
  }

  getAddress(person:Person){
    var {planet} = this.state
    return (
        <View animation="fadeInLeft"  duration={1200} delay={600}>
            <Card style={{borderRadius:12,width:'95%', alignSelf:'center', marginBottom:12}}>
                <CardItem style={{alignSelf:'center'}} header bordered>
                    <Text style={fontStyle.h2}>Homeworld of {person.name} </Text>
                </CardItem>
                <CardItem bordered>
                    <Text style={fontStyle.h3}>
                      Planet: {planet.planet}
                    </Text>
                </CardItem>
                <CardItem bordered>
                    <Text style={fontStyle.h3}>
                      Climate: {planet.climate}
                    </Text>
                </CardItem>
                <CardItem bordered>
                    <Text style={fontStyle.h3}>
                    Terrain: {planet.terrain}
                    </Text>
                </CardItem>
                <CardItem bordered>
                    <Text style={fontStyle.h3}>
                    Population: {planet.population}
                    </Text>
                </CardItem>
            </Card>
        </View>
    )
  }

  getFilms(person:Person){
    
    return (
      <View animation="fadeInRight" duration={1200} delay={900}>
          <Card style={styles.films}>
              <CardItem style={{alignSelf:'center'}} header bordered>
                  <Text style={fontStyle.h2}>{person.name} has feautured in:</Text>
              </CardItem>
              {this.state.films && this.state.films.map((film:Film, i:number)=>{
                return (
                    <CardItem bordered>
                        <Text style={fontStyle.h3}>
                        Episode: {film.episode_id+' '+ film.title} 
                        </Text>
                    </CardItem>
                )
              })}
            
          </Card>
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
          <Button title="Show modal" onPress={this.toggleModal} />
          <Modal isVisible={this.state.isModalVisible}
          backdropColor="#B4B3DB"
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={1200}
          animationOutTiming={555}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}>
          {this.renderModalContent()}
          </Modal>
      </View>
    );
  }
    renderModalContent(): React.ReactNode {
        const {person} = this.props
       return(
        <View style={{flex:1, height:'100%', width:'100%'}}>
            <ScrollView style={{flex:1, height:'90%', width:'100%', borderRadius:12}}>
              <Card >
          
                    {this.props.person &&
                        this.getPersonalAttributes(person)
                    }
                    {this.props.person && this.state.planet &&
                        this.getAddress(person)
                    }
                    {this.props.person && this.state.films &&
                        this.getFilms(person)
                    }
                  
                </Card>
              </ScrollView>
              <View style={{ height:'10%' , width:'100%'}}>
                  <Button title="Close" onPress={this.props.closeModal} />
              </View>
          </View>
       )
    }
}

const styles = StyleSheet.create({
    person: {
      marginHorizontal: 16,
      marginTop: 16
    },
    personalAttributes:{borderRadius:12,width:'95%', alignSelf:'center', marginBottom:12},
    films:{borderRadius:12,width:'95%', alignSelf:'center', marginBottom:12}
   
  })