import React, { Component } from "react";
import { Button, Text,  TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { CardItem, Card, Body } from 'native-base';
import apiService from '../../service/baseUrlApi'
import Starship from '../../model/entities/Starship';
import {View} from 'react-native-animatable'
import font from '../../theme/fonts'
const fontStyle = font.style;
const api =apiService.create('')

interface StarshipItemProps {
  starship: Starship,
  closeModal: any
}

interface StarshipItemState {
 isModalVisible:boolean
}

export default class StarshipDetails extends Component<StarshipItemProps, StarshipItemState> {
  state = {
    isModalVisible: true,
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  
  getStarshipAttributes(starship:Starship){
    return (
      <View animation="fadeInRight"  duration={1200} delay={500}>
          <Card style={styles.starship}>
              <CardItem style={{alignSelf:'center'}} header bordered>
                  <Text style={fontStyle.h3}>{starship.name}</Text>
              </CardItem>
              <CardItem bordered>
                  <Text style={fontStyle.h3}>
                  Model: {starship.model}
                  </Text>
              </CardItem>
              <CardItem bordered>
                  <Text style={fontStyle.h3}>
                  Manufacturer: {starship.manufacturer}
                  </Text>
              </CardItem>
              <CardItem bordered>
                  <Text style={fontStyle.h3}>
                  Crew: {starship.crew}
                  </Text>
              </CardItem>
              <CardItem bordered>
                  <Text style={fontStyle.h3}>
                  Cargo_capacity: {starship.cargo_capacity}
                  </Text>
              </CardItem>
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
      const {starship} = this.props
       return(
         <ScrollView>
            <Card style={styles.container}>
        
                  {this.props.starship && 
                      this.getStarshipAttributes(starship)
                  }
                  <View style={{ flex: 1 }}>
                        <Button title="Close" onPress={this.props.closeModal} />
                  </View>
              </Card>
          </ScrollView>
       )
    }
}

const styles = StyleSheet.create({
   starship:{borderRadius:12,width:'95%', alignSelf:'center', marginBottom:12},
   container:{flex:1, height:'100%', width:'100%', borderRadius:12}
  })