import React, { Component } from 'react'
import {FlatList, StyleSheet, TouchableOpacity,RefreshControl  } from 'react-native'
import {View,} from 'react-native-animatable'
import PersonItem from '../components/person/PersonItem'
import PersonDetails from '../components/person/PersonDetails'

import apiService from '../service/api'
import VehicleItem from '../components/vehicle/VehicleItem';
import StarshipItem from '../components/starship/StarshipItem';
import StarshipDetails from '../components/starship/StarshipDetails';
import VehicleDetails from '../components/vehicle/VehicleDetails';
import Person from '../model/entities/Person';
import Vehicle from '../model/entities/Vehicle';
import Starship from '../model/entities/Starship';
import {VEHICLES, PEOPLE, STARSHIPS} from '../service/constants'
import { Spinner } from 'native-base';

const api = apiService.create()

interface EntityScreenProps {
 entity: String 
 
}

interface EntityScreenState {
  people: Person[]
  vehicles:Vehicle[],
  starships:Starship[],
  
  page:number,
  isPersonDetailsModalVisible:boolean,
  isVehicleDetailsModalVisible:boolean,
  isStarshipDetailsModalVisible:boolean,

  selectedPerson:Person,
  selectedVehicle:Vehicle,
  selectedStarship:Starship,

  loading:boolean
 
 }

 export default class EntityScreen extends Component<EntityScreenProps, EntityScreenState> {

  constructor(props: EntityScreenProps) {
    super(props)
    this.state={
      people:null,
      vehicles:null,
      starships:null,
      
      page:1,
      isPersonDetailsModalVisible:false,
      isVehicleDetailsModalVisible:false,
      isStarshipDetailsModalVisible:false,

      selectedPerson:null,
      selectedVehicle:null,
      selectedStarship:null,

      loading:false
    }
  }

  
  componentDidMount() {
    this.props.entity && this.fetchData()
  }

  fetchData():void {
    this.state.loading ===false && this.setState({loading:true})
    switch(this.props.entity){
     case PEOPLE: api.getPeople(this.state.page).then(res=> this.setResults(PEOPLE, res))
     case VEHICLES: api.getVehicles(this.state.page).then(res=>this.setResults(VEHICLES, res))
     case STARSHIPS: api.getStarships(this.state.page).then(res=>this.setResults(STARSHIPS, res))
    }
    
  }


  setResults(entity: string, res:any): void {
    
      if(res.status===200){
        switch(entity){
            case PEOPLE: this.setState({loading:false, people: this.state.people?[...this.state.people,...res.data.results] : res.data.results  })
            case VEHICLES:  this.setState({loading:false, vehicles: this.state.vehicles?[...this.state.vehicles,...res.data.results] : res.data.results  })
            case STARSHIPS:  this.setState({loading:false, starships: this.state.starships?[...this.state.starships,...res.data.results] : res.data.results  })
          }
      }
      else{
        this.setState({loading:false})
        throw new Error("Error retrieving data");
      }
  }
   

  render() {

    return (
      <View style={styles.list}>
            {this.state.loading   &&
              <View style={{backgroundColor: '#00000000'}}>
                <Spinner/>
              </View>
            }
            <View>
              {this.state.isPersonDetailsModalVisible && <PersonDetails person={this.state.selectedPerson} closeModal={()=>{this.setState({isPersonDetailsModalVisible:false, selectedPerson:null})}}/>}
              {this.state.isVehicleDetailsModalVisible && <VehicleDetails vehicle={this.state.selectedVehicle} closeModal={()=>{this.setState({isVehicleDetailsModalVisible:false, selectedVehicle:null})}}/>}
              {this.state.isStarshipDetailsModalVisible && <StarshipDetails starship={this.state.selectedStarship} closeModal={()=>{this.setState({isStarshipDetailsModalVisible:false, selectedStarship:null})}}/>}

              {this.renderPeople()}
              {this.renderVehicles()}
              {this.renderStarships()}
           </View>
      
      </View>
    )
  }

  
  renderPeople(): React.ReactNode {
    var delay=1
      return(
          <View>
            {this.props.entity==='PEOPLE' &&
              <FlatList
               refreshControl={
                <RefreshControl
                  refreshing={this.state.loading}
                  onRefresh={()=>this.refresh()}
                />
               }
                data={this.state.people? this.state.people:[] }
                onEndReached={() => this.fetchNextPage()}
                onEndReachedThreshold={0.01}
                renderItem={({ item }) => {
                  delay+=1
                  return (
                  <TouchableOpacity onPress={()=>{this.setState({isPersonDetailsModalVisible:true, selectedPerson:item})}}>
                      <View animation='slideInRight' delay={delay*140}>
                         <PersonItem person={item} />
                      </View>
                  </TouchableOpacity>
                  )
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            }
          </View>
      )
   }
   refresh(): any {
     this.setState({people:null, vehicles:null, starships:null})
     this.fetchData()
   }
   
   renderVehicles(): React.ReactNode {
      var delay = 1
      return(
          <View>
            {this.props.entity==='VEHICLES' &&
                <FlatList
                  data={this.state.vehicles? this.state.vehicles:[] }
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.loading}
                      onRefresh={()=>this.refresh()}
                    />
                   }
                  onEndReached={() => this.fetchNextPage()}
                  onEndReachedThreshold={0.01}
                  renderItem={({ item }) => {
                    delay+=1
                    return(
                    <TouchableOpacity onPress={()=>{this.setState({isVehicleDetailsModalVisible:true, selectedVehicle:item})}}>
                       <View animation='slideInRight' delay={delay*140}>
                          <VehicleItem vehicle={item} />
                       </View>
                    </TouchableOpacity>
                    )
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
            }
          </View>
      )
   }

   renderStarships(): React.ReactNode {
      var delay = 1
      return(
          <View>
            {this.props.entity==='STARSHIPS' &&
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.loading}
                    onRefresh={()=>this.refresh()}
                  />
                }
                data={this.state.starships? this.state.starships:[] }
                onEndReached={() => this.fetchNextPage()}
                onEndReachedThreshold={0.01}
                renderItem={({ item, }) => { delay+=1
                  return(
                  <TouchableOpacity onPress={()=>{this.setState({isStarshipDetailsModalVisible:true, selectedStarship:item})}}>
                    <View animation='slideInRight' delay={delay*140}>
                        <StarshipItem starship={item} />
                    </View>
                  </TouchableOpacity>
                  )
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            }
          </View>
      )
   }

  fetchNextPage(): void {
    this.setState({page:this.state.page+1})
    setTimeout(() => {
      this.fetchData()
    }, 150);
  }

}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eee'
  },
})


