import React, {Component, useCallback, useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FIREBASE from '../../config/FIREBASE';
import {BannerSlider} from '../../components';
import {useDispatch} from 'react-redux';

const Carousel = props => {
  const [banners, setBanners] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = () => {
    dispatch({type: 'SET_LOADING', value: true});
    FIREBASE.database()
      .ref('desain_banner')
      .once('value')
      .then(res => {
        const arr = [...res.val()];
        const filteredArr = arr.filter(val => val !== null);
        const newArr = filteredArr?.map(val => val?.image);
        setBanners(newArr);
        dispatch({type: 'SET_LOADING', value: false});
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