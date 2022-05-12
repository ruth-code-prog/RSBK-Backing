import React, {useCallback, useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  FlatList,
} from 'react-native';
import {HomeProfile, Loading} from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import FIREBASE from '../../config/FIREBASE';
import {colors, fonts, getData, numberWithCommas} from '../../utils';
import {ILNullPhoto} from '../../assets';
import {useFocusEffect} from '@react-navigation/core';
import CurrencyFormatter from 'react-native-currency-formatter';

const CardAntrian = () => {
  const [userHomeData, setUserHomeData] = useState({});
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    avatar: ILNullPhoto,
    nama: '',
  });

  useEffect(() => {
    getUserData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      FIREBASE.auth().onAuthStateChanged(async data => {
        if (data) {
          getUserHomeData(data.uid);
        } else {
          AsyncStorage.clear();
        }
      });
    }, []),
  );

  const getUserData = () => {
    getData('user')
      .then(res => {
        const data = res;
        let arr = [];
        data?.image?.filter(val => val).map(val => arr.push({url: val}));
        setProfile(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
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
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{borderRadius: 15, marginTop: 20}}
      colors={['#12c2e9', '#c471ed', '#f64f59']}>
      {loading && <Loading />}
      <View
        style={{
          padding: 20,
          borderRadius: 15,
        }}>
        <Text style={{color: '#FFFFFF'}}>Card Owner</Text>
        <HomeProfile profile={profile} />
        <Text style={{color: '#FFFFFF'}}>No.Antrian</Text>
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 4,
          }}>
          {(userHomeData !== null ? userHomeData.appo1 : 0)}
        </Text>
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 4,
          }}>
          {(userHomeData !== null ? userHomeData.appo2 : 0)}
        </Text>
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 4,
          }}>
          {(userHomeData !== null ? userHomeData.appo3 : 0)}
        </Text>
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 4,
          }}>
          {(userHomeData !== null ? userHomeData.appo4 : 0)}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginTop: 10}}>
            <Text style={{color: '#FFFFFF'}}>(Privilege Card) Pastikan Sudah Mendaftar Akun Premium</Text>
            <Text style={{color: '#FFFFFF'}}>(Pasien Umum, Mitra & Assuransi)</Text>
          </View>

          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              flex: 1,
            }}>
            <Image
              source={require('../../assets/logo.png')}
              style={{width: 50, height: 50}}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default CardAntrian;
