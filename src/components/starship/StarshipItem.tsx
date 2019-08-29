import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { CardItem, Card, Body } from 'native-base';
import Starship from '../../model/entities/Starship';
import font from '../../theme/fonts'
const fontStyle = font.style;

interface StarshipItemProps {
  starship: Starship,
}

export default class StarshipItem extends Component<StarshipItemProps,any> {

  constructor(props: StarshipItemProps) {
    super(props)
  
  }

  render() {
    const {  starship } = this.props
    return (
        <Card style={styles.item}>
            <CardItem style={{alignSelf:'center'}} header bordered>
                <Text  style={fontStyle.h2}>{starship.name}</Text>
            </CardItem>
            <View style={styles.details}>
                <CardItem style={{justifyContent:'center'}} bordered>
                    <Text style={[fontStyle.h3,{textAlign:'center'}]}>
                    Model: {starship.model}
                    </Text>
                </CardItem>

                <CardItem style={styles.manufacturer} bordered>
                    <Text style={[fontStyle.h3,{textAlign:'center'}]}>
                    Manufacturer: {starship.manufacturer}
                    </Text>
                </CardItem>
            </View>
        </Card>
 
    )
  }
}

const styles = StyleSheet.create({
  item: {borderRadius:12,width:'95%', alignSelf:'center'},
  details:{flexDirection:'column', flex:1, justifyContent:'center', width:'95%'},
  manufacturer:{justifyContent:'center', width:'80%', alignSelf:'center'}
})
