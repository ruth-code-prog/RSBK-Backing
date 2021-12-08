import React, {Component, useEffect, useState, useCallback} from 'react';
import { useFocusEffect } from "@react-navigation/core";
import {
  Alert,
  Button,
  Dimensions,
  Linking,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import FIREBASE from '../../config/FIREBASE';
import CurrencyFormatter from "react-native-currency-formatter";
import {colors, showError, storeData, useForm,  getData} from '../../utils';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Profile, HomeProfile,} from '../../components';
import TextUser from '../TextUser'

const Sukses = () => {
  const navigation = useNavigation();
  const [userHomeData, setUserHomeData] = useState({});
  const [profile, setProfile] = useState({
    fullName: "",
  });

  useFocusEffect(
    useCallback(() => {
      FIREBASE.auth().onAuthStateChanged(async (data) => {
        if (data) {
          getUserHomeData(data.uid);
        } else {
          AsyncStorage.clear();
        }
      });
    }, [])
  );

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    getData("user").then((res) => {
      const data = res;
      setProfile(res);
    });
  };

  const getUserHomeData = uid => {
    FIREBASE.database()
      .ref('users/' + uid)
      .on('value', snapshot => {
        if (snapshot.val()) {
          setUserHomeData(snapshot.val());
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.point}> Hello </Text>
      <HomeProfile
                profile={profile}
              />
      <Text style={styles.point}> Estimasi Biaya Rawat Anda:  
        {CurrencyFormatter(userHomeData !== null ? userHomeData.estimasi : 0)}
      </Text>
      <View style={styles.image}>
        <TouchableOpacity onPress={() => navigation.navigate('MainApp')}>
          <Image
            source={require('../../assets/success.png')}
            style={styles.chat}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
      <TextUser />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {alignItems: 'center', flex: 1, backgroundColor: '#34495E'},
  chat: {
    marginTop: 200,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //url: {marginTop: 6}
  point: {
    fontSize: 14,
    color: "#E5B654",
    marginTop: 12,
  },
  name: {
    fontSize: 14,
    color: "#E5B654",
    marginTop: 12,
  },
});

export default Sukses;
