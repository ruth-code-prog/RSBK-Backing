import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from '@react-navigation/core';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';
import CurrencyFormatter from 'react-native-currency-formatter';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Button, Gap, HomeProfile,  PopUp, ModalPenunjang} from '../../components';
import FIREBASE from '../../config/FIREBASE';
import {getData} from '../../utils';
import TextUser from '../TextUser';

const Sukses = () => {
  const navigation = useNavigation();
  const [userHomeData, setUserHomeData] = useState({});
  const [videoData, setVideoData] = useState([]);
  const [profile, setProfile] = useState({
    fullName: '',
  });
  const [modalImage, setModalImage] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [indexActive, setIndexActive] = useState(0);
  const [popUp, setPopUp] = useState(false);

  const [penunjangModal, setPenunjangModal] = useState(false);

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

  useEffect(() => {
    getImage();
    getUserData();
  }, []);

  const getUserData = () => {
    getData('user').then(res => {
      const data = res;
      let arr = [];
      data?.image?.filter(val => val).map(val => arr.push({url: val}));
      setImageData(arr);
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

  const getImage = () => {
    if (!popUp) {
      setPopUp(true);
    }
  };

  return (
    <ImageBackground source={require('../../assets/ILprivacyBackground.png')} style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 40,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.point}> Sampurasun</Text>
        <HomeProfile profile={profile} />
        <Text style={styles.point}>
          {' '}
          Estimasi Biaya Rawat Anda:
          {CurrencyFormatter(userHomeData !== null ? userHomeData.estimasi : 0)}
        </Text>
        {imageData?.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setModalImage(true);
              setIndexActive(index);
            }}>
            <Image source={{uri: item?.url}} style={styles.imageBox} />
          </TouchableOpacity>
        ))}
        <Gap height={20} />
        <Button
          onPress={() =>
            navigation.navigate('Video', {
              profile,
            })
          }
          title="TeleMedicine Berbayar"
          style={{width: '100%'}}
        />
        <Gap height={20} />
        <Button
          onPress={() => setPenunjangModal(true)}
          title="User Input Image"
          style={{width: '100%'}}
        />
        <View style={styles.image}>
          <TouchableOpacity onPress={() => navigation.navigate('MainApp')}>
            <Image
              source={require('../../assets/logOut.png')}
              style={styles.chat}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>
        <TextUser />
        <Modal visible={modalImage} transparent>
          <ImageViewer
            index={indexActive}
            enableSwipeDown
            onSwipeDown={() => setModalImage(false)}
            imageUrls={imageData}
          />
        </Modal>
      </ScrollView>
      <PopUp visible={popUp} onClose={() => setPopUp(false)} />
      <ModalPenunjang
        visible={penunjangModal}
        profile={userHomeData}
        onSubmit={() => setPenunjangModal(false)}
        onClose={() => setPenunjangModal(false)}
      />
     </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#34495E',
  },
  chat: {
    width: 100,
    height: 100,
  },
  imageBox: {
    height: 200,
    width: 200,
    marginVertical: 20,
    borderRadius: 20,
  },
  //url: {marginTop: 6}
  point: {
    fontSize: 14,
    color: '#E5B654',
    marginTop: 12,
    fontWeight: 'bold'
  },
  name: {
    fontSize: 14,
    color: '#E5B654',
    marginTop: 12,
  },
});

export default Sukses;







  




 
      
  