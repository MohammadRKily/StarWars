import React, { Component } from "react";
import { Button, Text,  TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { CardItem, Card, Body } from 'native-base';
import apiService from '../../service/baseUrlApi'
const api =apiService.create('')
import Vehicle from '../../model/entities/Vehicle';
import {View} from 'react-native-animatable'
import font from '../../theme/fonts'
const fontStyle = font.style;


interface VehicleItemProps {
  vehicle: Vehicle
  closeModal:any
}

export default class VehicleDetails extends Component<VehicleItemProps, any> {
  state = {
    isModalVisible: true,
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  getVehicleAttributes(vehicle:Vehicle){
    return (
      <View animation="fadeInRight"  duration={1200} delay={300}>
          <Card style={styles.vehicleCard}>
              <CardItem style={{alignSelf:'center'}} header bordered>
                  <Text style={fontStyle.h2}> {vehicle.name} </Text>
              </CardItem>
              <CardItem bordered>
                  <Text  style={fontStyle.h3}>
                  Model: {vehicle.model}
                  </Text>
              </CardItem>
              <CardItem bordered>
                  <Text style={fontStyle.h3}>
                  Length: {vehicle.length}
                  </Text>
              </CardItem>
              <CardItem bordered>
                  <Text style={fontStyle.h3}>
                  Speed: {vehicle.max_atmosphering_speed}
                  </Text>
              </CardItem>
              <CardItem bordered>
                  <Text style={fontStyle.h3}>
                  Crew: {vehicle.crew}
                  </Text>
              </CardItem>
              <CardItem bordered>
                  <Text style={fontStyle.h3}>
                  Passengers: {vehicle.passengers}
                  </Text>
              </CardItem>
              <CardItem bordered>
                  <Text style={fontStyle.h3}>
                  Vehicle class: {vehicle.vehicle_class}
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
       const {vehicle} = this.props
       return(
         <ScrollView>
           <Card style={styles.modalCard}>
                {vehicle && 
                    this.getVehicleAttributes(vehicle)
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
    modalCard:{flex:1, height:'100%', width:'100%', borderRadius:12},
    vehicleCard: {borderRadius:12,width:'95%', alignSelf:'center', marginBottom:12}
  })