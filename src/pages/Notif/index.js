/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, {Component} from 'react';
 import {
   TextInput,
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   Alert,
 } from 'react-native';
 import NotifService from '../../../NotifService';
 
 export default class App extends Component {
   constructor(props) {
     super(props);
     this.state = {};
 
     this.notif = new NotifService(
       this.onRegister.bind(this),
       this.onNotif.bind(this),
     );
   }
 
   render() {
     return (
       <View style={styles.container}>
         <View style={styles.spacer}></View>
 
         <TouchableOpacity
           style={styles.button}
           onPress={() => {
             this.notif.localNotif();
           }}>
           <Text style={styles.title}>Local Notification (now)</Text>
         </TouchableOpacity>
 
         <View style={styles.spacer}></View>
 
         {this.state.fcmRegistered && (
           <Text>Developer: https://ekosetiaji.my.id</Text>
         )}
 
         <View style={styles.spacer}></View>
       </View>
     );
   }
 
   onRegister(token) {
     this.setState({registerToken: token.token, fcmRegistered: true});
   }
 
   onNotif(notif) {
     Alert.alert(notif.title, notif.message);
   }
 
   handlePerm(perms) {
     Alert.alert('Permissions', JSON.stringify(perms));
   }
 }
 
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
  },
   welcome: {
     fontSize: 20,
     textAlign: 'center',
     margin: 10,
   },
   button: {
     borderWidth: 1,
     borderColor: '#F8F8F8',
     margin: 5,
     padding: 5,
     width: '70%',
     backgroundColor: '#F8F8F8',
     borderRadius: 5,
   },
   textField: {
     borderWidth: 1,
     borderColor: '#F8F8F8',
     margin: 5,
     padding: 5,
     width: '70%',
   },
   spacer: {
     height: 10,
   },
   title: {
     fontWeight: 'bold',
     fontSize: 8,
     textAlign: 'center',
     color: '#F8F8F8',
   },
 });