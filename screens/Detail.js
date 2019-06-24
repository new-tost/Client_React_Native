
import React, { Component } from 'react';
import {StyleSheet,Text,View, TouchableOpacity,ActivityIndicator,RefreshControl, Image, Alert, ScrollView, FlatList, Button,} from 'react-native';

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      refreshing: false 
    }
  }

webCalls = async() =>{
  return fetch('https://shop-database.000webhostapp.com/Detail.php?idPost=' + this.props.navigation.state.params.idTrans).then((response) => response.json()).then((responseJson) => {
           this.setState({
             isLoading: false,
             dataSource: responseJson.arrserver
           }, function() {
           });
         })
         .catch((error) => {
           console.error(error);
         });
 };

componentDidMount(){
    this.webCalls();
  };
 
static navigationOptions= ({navigation}) =>({
    title: 'Detail',
     headerStyle: 
     {
     backgroundColor: '#03A9F4',
     },
     headerTintColor: '#fff',
     headerTitleStyle: {
     fontWeight: 'bold',
    },
 
  }); 
   _onRefresh(){
    this.setState({refreshing: true});
    this.webCalls().then(() =>{
      this.setState({refreshing: false})
    });
  }

  render() {
       if (this.state.isLoading) 
       {
     return (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>  <ActivityIndicator size="large" /> </View>);
   }
    return (
      <View style={styles.container}>
         <FlatList 
        style={styles.list} 
        data={ this.state.dataSource } 
        keyExtractor={(item, index) =>index.toString()} 
        renderItem={({item}) => 
        <ScrollView>
          <View style={{alignItems:'center', marginHorizontal:30}}>
            <Image style={styles.productImg} source={{uri:item.imagePost}}/>
            <Text style={styles.name}>{item.namePost}</Text>
            <Text style={styles.price}>{item.pricePost} $</Text>
            <Text style={styles.description}>{item.descPost}</Text>
          </View>
         
          <View style={styles.separator} ></View>
          <View style={styles.addToCarContainer}>
            <TouchableOpacity style={styles.shareButton} onPress={() => this.props.navigation.navigate('Shop',{idTrans:item
            })}>
              <Text style={styles.shareButtonText} >Add To Cart</Text>  
            </TouchableOpacity>
          </View> 
        </ScrollView>
        }refreshControl={
        <RefreshControl
        refreshing = {this.state.refreshing}
        onRefresh={this._onRefresh.bind(this)}
        />
      }/>
      </View>
        
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:24,
  },
  productImg:{
    width:400,
    height:200,
  },
  name:{
    fontSize:28,
    color:"#696969",
    fontWeight:'bold'
  },
  price:{
    marginTop:10,
    fontSize:18,
    color:"green",
    fontWeight:'bold'
  },
  description:{
    textAlign:'center',
    marginTop:10,
    color:"#696969",
  },
  star:{
    width:40,
    height:40,
  },
  btnColor: {
    height:30,
    width:30,
    borderRadius:30,
    marginHorizontal:3
  },
  btnSize: {
    height:40,
    width:40,
    borderRadius:40,
    borderColor:'#778899',
    borderWidth:1,
    marginHorizontal:3,
    backgroundColor:'white',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentColors:{ 
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  separator:{
    height:2,
    backgroundColor:"#eeeeee",
    marginTop:20,
    marginHorizontal:30
  },
  shareButton: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  shareButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
  addToCarContainer:{
    marginHorizontal:30
  }
});     