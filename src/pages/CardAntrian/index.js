import React, {useCallback, useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
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
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import CurrencyFormatter from 'react-native-currency-formatter';

const CardAntrian = () => {
  const navigation = useNavigation();
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
      style={{borderRadius: 15, marginTop: 10}}
      colors={['#F8C471', '#F8C471', '#F8C471']}>
      {loading && <Loading />}
      <View
        style={{
          padding: 10,
          borderRadius: 15,
        }}>
        <Image
          source={require('../../assets/logo.png')}
          style={{width: 50, height: 50}}
          resizeMode="contain"
        />
        <Text style={{color:'#1908DD', fontWeight: 'bold'}}>Nama Akun: {profile?.fullName}</Text>
        <Text style={{color: '#000000'}}>Nomor Antrian Appoitment Anda:</Text>
        <Text
          style={{
            color: '#000000',
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 4,
          }}>
          {userHomeData !== null ? userHomeData.appo1 : 0}
        </Text>
        <Text
          style={{
            color: '#000000',
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 4,
          }}>
          {userHomeData !== null ? userHomeData.appo2 : 0}
        </Text>
        <Text
          style={{
            color: '#000000',
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 4,
          }}>
          {userHomeData !== null ? userHomeData.appo3 : 0}
        </Text>
        <Text
          style={{
            color: '#000000',
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 4,
          }}>
          {userHomeData !== null ? userHomeData.appo4 : 0}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginTop: 4}}>
            <Text style={{color: '#1908DD', fontStyle: 'italic', fontSize: 12}}>
            <TouchableOpacity onPress={() => navigation.navigate('Sukses')}>
              <Image
                source={require('../../assets/user.png')}
                style={styles.user}
                resizeMode={'contain'}
              />
              <Text style={styles.member}>Akun Premium</Text>
            </TouchableOpacity>
            </Text>
          </View>

          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              flex: 1,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Opsi')}>
          <Image
            source={require('../../assets/Appo.png')}
            style={styles.chat}
            resizeMode={'contain'}
          />
          <Text style={styles.keluar}>Appoitment Klinik</Text>
        </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  user: {
    height: 70,
    width: 70,
    // width: Dimensions.get('screen').width - 40,
    borderRadius: 20,
    marginBottom: 2,
    alignItems: "center"
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
  chat: {
    width: 68,
    height: 68,
    resizeMode: 'contain',
    marginBottom: 2,
    borderRadius: 20,
  },
  keluar: {
    textAlign: 'center',
    color: '#000000',
    fontWeight: 'bold',
  },
});


export default CardAntrian;
