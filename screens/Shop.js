import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity,  TextInput,  Alert, ScrollView} from 'react-native';

export default class Shop extends Component {
    constructor(props) {
    super(props);
    this.state = {
      valLastFirstName   : '',
      valphone   : '',
    }
  }
static navigationOptions= ({navigation}) =>({
          title: 'Products',
        headerRight:<TouchableOpacity onPress={() => navigation.navigate("Home")}
        style={{backgroundColor:'#00BFFF', margin:10,padding:10}}>
        <Text style={{color:'#fff'}}>Home</Text></TouchableOpacity>
        });


functionNewAddPost = () =>{
 const { valLastFirstName }  = this.state ;
 const { valphone }  = this.state ;
 
  if(valLastFirstName == '' || valphone == '')
{
  Alert.alert("Please Enter All the Values");
}
else{
fetch('https://shop-database.000webhostapp.com/insert_Shop.php', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nameShop: this.props.navigation.state.params.idTrans.namePost,
    priceShop: this.props.navigation.state.params.idTrans.pricePost,
    LastFirstName: valLastFirstName,
    Phone: valphone
 
  })
 
}).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson);
      }).catch((error) => {
        console.error(error);
      });
    Alert.alert("Added");
this.props.navigation.navigate('Home');
 }

 
  }

  render() {

    return (
      <ScrollView>
        <View style={styles.container}>
       

          <View style={styles.postContent}>  
              <Text style={styles.postTitle}>
            Contact Form
              </Text>

       
                <View style={styles.inputContainer}>
        
          <TextInput style={styles.inputs}
              placeholder="Full name"
              keyboardType="default"
              underlineColorAndroid='transparent'
              onChangeText={(valLastFirstName) => this.setState({valLastFirstName})}/>
        </View>


        <View style={styles.inputContainer}>
    
          <TextInput style={styles.inputs}
              placeholder="Phone (+375)"
             keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={(valphone) => this.setState({valphone})}/>
        </View>
           

              <Text style={styles.tags}>
                 {this.props.navigation.state.params.idTrans.namePost}
              </Text>

            

              <View style={styles.profile}>
                <Image style={styles.avatar}
                  source={{uri:this.props.navigation.state.params.idTrans.imagePost}}/>

                <Text style={styles.name}>
                   {this.props.navigation.state.params.idTrans.pricePost} $
                </Text>
              </View>
              <TouchableOpacity style={styles.shareButton}  onPress={this.functionNewAddPost}>
                <Text style={styles.shareButtonText}>Submit</Text>  
              </TouchableOpacity> 
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  header:{
    padding:30,
    alignItems: 'center',
    backgroundColor: "#fff",

  },
  headerTitle:{
    fontSize:30,
    color:"#FFFFFF",
    marginTop:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
   inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
 
  postContent: {
    flex: 1,
    padding:30,
  },
  postTitle:{
    fontSize:26,
    fontWeight:'600',
  },

  tags:{
    color: '#00BFFF',
    marginTop:10,
  },
  date:{
    color: '#696969',
    marginTop:10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#00BFFF",
  },
  profile:{
    flexDirection: 'row',
    marginTop:20
  },
  name:{
    fontSize:22,
    color:"#00BFFF",
    fontWeight:'600',
    alignSelf:'center',
    marginLeft:10
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
  }
});
  