import React, {Component} from "react";
import { StyleSheet, Platform, View, ActivityIndicator, FlatList,Card, TouchableOpacity, Text, Image, Alert, YellowBox } from 'react-native';

export default class Home extends React.Component {

 constructor(props) 
 {
  super(props);
   this.state = { isLoading: true }
   YellowBox.ignoreWarnings(['Warning: componentWillMount is deprecated','Warning: componentWillReceiveProps is deprecated',]);
}
 
static navigationOptions= ({navigation}) =>({
    title: 'Home',
 headerStyle: {
      backgroundColor: '#03A9F4',
    },
 headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
 
  }); 

FlatListItemSeparator = () => { return ( <View style={styles.separator}/>);}
 componentDidMount(){

  return fetch('https://shop-database.000webhostapp.com/all_tovar.php').then((response) => response.json()).then((responseJson) => {
 this.setState({isLoading: false,dataSource: responseJson.arrserver}
  , function() {});}).catch((error) => { console.error(error);});}
 
 render() {
const { navigate } = this.props.navigation;
   if (this.state.isLoading) {
     return (

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

         <ActivityIndicator size="large" />

       </View>
       
     );

   }
 
   return (
 
     <View style={styles.container}>
        <FlatList 

        style={styles.list} 
        data={ this.state.dataSource }
         
        keyExtractor={(item, index) =>index.toString()} 

        ItemSeparatorComponent = {this.FlatListItemSeparator} 

        renderItem={({item}) => 
                <View style={styles.card} >
<TouchableOpacity onPress={() =>navigate('Detail', {idTrans:item.idPost,
            })
          }>
                            <Image style={styles.cardImage} source={{uri:item.imagePost}}/>
                       </TouchableOpacity>
                  <View style={styles.cardFooter}>
                       <View style={styles.socialBarContainer}  >
                           <View>
                                  <Text style={styles.title}>Pice: {item.pricePost} $</Text>
                           </View>
                       </View>
                  </View>
                </View>
          }

        />
     </View>
   );
 }
 
}


const styles = StyleSheet.create({
 
container:{
    flex:1,
  
  },
  list: {
    paddingHorizontal: 8,
    backgroundColor:"#E6E6E6",
  },
  separator: {
    marginTop: 10,
  },
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    marginVertical: 4,
    backgroundColor:"white"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    flex: 1,
    height: 150,
    width: null,
  },
  title:{
    fontSize:24,
    flex:1,
    color:'#333',
  }
 
});







