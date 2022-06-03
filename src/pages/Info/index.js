import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, ScrollView} from 'react-native'
import FIREBASE from '../../config/FIREBASE';
import {NewsItem} from '../../components';
import PaidVideo from '../PaidVideo';

const Info = () => {

  const openNews = (url) => {
    Linking.openURL('https://' + url)
  }

    return (
    <View style={styles.container}>
      <PaidVideo />         
    </View>
    )}    
    

export default Info
const styles = StyleSheet.create({
    container: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 80,
    }
});
