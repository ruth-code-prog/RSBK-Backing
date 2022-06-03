import React, {Component, useEffect, useState, useCallback} from 'react';
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
import Swiper from 'react-native-swiper';

const Voucher = ({data}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{marginLeft: 4}} />

      <Swiper
        style={styles.wrapper}
        horizontal={false}
        autoplay
        showsVerticalScrollIndicator
        loop
        dotStyle={{
          height: 12,
          width: 3,
          backgroundColor: 'white',
        }}
        activeDotStyle={{
          height: 12,
          width: 3,
          backgroundColor: 'royalblue',
        }}
        paginationStyle={{
          left: -Dimensions.get('screen').width / 2 - 14,
        }}>
        {data.map(val => (
          <Bonus key={val?.id} url={val?.image} link={val?.link} />
        ))}
      </Swiper>
      <View style={{marginLeft: 20}} />
      <View style={styles.rowCenter}>
        <TouchableOpacity onPress={() => navigation.navigate('Jadwal')}>
          <Image
            source={require('../../assets/btnDok.png')}
            style={styles.user}
            resizeMode={'contain'}
          />
          <Text style={styles.member}>Jadwal</Text>
          <Text style={styles.member}>Praktek Dokter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: Dimensions.get('screen').height / 4,
    // width: Dimensions.get('screen').width - 2,
    marginTop: 4,
    padding: 10,
    backgroundColor: '#DFF5FE',
    borderRadius: 20,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 200,
  },
  wrapper: {
    // flex: 1,
    paddingTop: 2,
  },
  background: {},
  user: {
    height: 120,
    width: 120,
    // width: Dimensions.get('screen').width - 40,
    borderRadius: 20,
    marginBottom: 10,
    // paddingLeft: 200,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  member: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wrapperSection: {
    paddingHorizontal: 16,
  },
});

export default Voucher;