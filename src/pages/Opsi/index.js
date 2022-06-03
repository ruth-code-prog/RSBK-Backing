import React, {Component, useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  Text,
  Image
} from 'react-native';
import IcEye from '../../assets/icons/eye.svg';
import IcEyeSlash from '../../assets/icons/eye-slash.svg';

import FIREBASE from '../../config/FIREBASE';
import {colors, showError, storeData, useForm} from '../../utils';
import {InputData, Button, Header, Gap, Input} from '../../components';
import {useNavigation} from '@react-navigation/native';

const Opsi = () => {
  const navigation = useNavigation();
 
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={40} />
        <Image
              source={require('../../assets/logo.png')}
              style={{
                width: 50,
                height: 50,
              }}
              resizeMode="contain"
            />
        <Text style={styles.title}>
         Make Your Appoitment
        </Text>
        <Gap height={30} />
          <Button
            textColor="white"
            title="Pasien Umum"
            onPress={() => navigation.replace('Appoitment')}
          />

          <Gap height={20} />
          <Button
            type="secondary"
            title="Pasien Asuransi/ Mitra"
            onPress={() => navigation.replace('Am')}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Opsi;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingLeft: 10,
    paddingTop: 12,
  },
  content: {padding: 40, paddingTop: 0},
  searchInput: {
    color: '#00A2E9',
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    color: '#36364A',
    fontSize: 18,
  }
});