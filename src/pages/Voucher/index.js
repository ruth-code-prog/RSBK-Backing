import React, {Component,  useEffect, useState, useCallback } from 'react'
import {
  Dimensions,
  Alert,
  Button,
  Linking,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Bonus} from '../../components';

const Voucher = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <Bonus />

      <View style={styles.rowCenter}>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Image
            source={require('../../assets/user.png')}
            style={styles.user}
            resizeMode={'contain'}
          />
          <Text style={styles.member}>Daftar Member</Text>
          <Text style={styles.member}> RS.Bayukarta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height / 4,
    width: Dimensions.get('screen').width - 2,
    marginTop: 20,
    padding: 10,
    backgroundColor: '#F8C471',
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  background: {},
  user: {
    height: Dimensions.get('screen').height / 8,
    width: Dimensions.get('screen').width - 40,
    borderRadius: 20,
    marginBottom: 20,
    paddingLeft: 200,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 130,
  },
  member: {
    color: '#000000',
    fontWeight: 'bold',
    alignItems: 'center',
    paddingLeft: 110,
  },
  wrapperSection: {
    paddingHorizontal: 16
},
});

export default Voucher;
