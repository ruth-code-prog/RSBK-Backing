import React, {Component, useCallback, useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FIREBASE from '../../config/FIREBASE';
import {BannerSlider} from '../../components';

const Carousel = props => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = () => {
    FIREBASE.database()
      .ref('desain_banner')
      .once('value')
      .then(res => {
        const arr = [...res.val()];
        const filteredArr = arr.filter(val => val !== null);
        const newArr = filteredArr?.map(val => val?.image);
        console.log('bannerss', newArr);
        setBanners(newArr);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <View>
       {banners?.length > 0 ? <BannerSlider data={banners} /> : null}
    </View>
  )
}

export default Carousel

const styles = StyleSheet.create({})
