import React, {Component, useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import IcEye from '../../assets/icons/eye.svg';
import IcEyeSlash from '../../assets/icons/eye-slash.svg';

import FIREBASE from '../../config/FIREBASE';
import {colors, showError, storeData, useForm} from '../../utils';
import {InputData, Button, Header, Gap, Input} from '../../components';

const Appoitment = ({navigation}) => {
  const [form, setForm] = useForm({
    fullName: '',
    wetone: '',
    mobileNumber: '',
    klinik: '',
    doctor: '',
    date: '',
  });

  const onContinue = () => {
    FIREBASE.database()
    .pushData(klinik)
      .then(success => {
        setForm('reset');
        const data = {
          fullName: form.fullName,
          wetone: form.wetone,
          mobileNumber: form.mobileNumber,
          klinik: form.klinik,
          doctor: form.doctor,
          date: form.date,
          uid: success.user.uid,
        };

        storeData('user');
        navigation.replace('MainApp');
      })
      .catch(err => {
        showError(err.message);
      });
  };
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={16} />
          <Input
            label="Nama Pasien"
            value={form.fullName}
            placeholder="MASUKAN NAMA LENGKAP PASIEN"
            placeholderTextColor="#00A2E9"
            onChangeText={value => setForm('fullName', value)}
          />
          <Gap height={16} />
          <Input
            label="Tanggal Lahir"
            value={form.wetone}
            keyboardType="numeric"
            onChangeText={value => setForm('wetone', value)}
            keyboardType="numeric"
            placeholder="MASUKAN Tanggal Lahir"
            placeholderTextColor="#00A2E9"
          />
          <Gap height={16} />
          <Input
            label="No Whatsapp"
            value={form.mobileNumber}
            keyboardType="numeric"
            onChangeText={value => setForm('mobileNumber', value)}
            keyboardType="numeric"
            placeholder="MASUKAN NOMOR HANDHPONE"
            placeholderTextColor="#00A2E9"
          />
          <Gap height={16} />
          <Input
            label="Tujuan Klinik"
            value={form.klinik}
            placeholder="MASUKAN Tujuan Klinik"
            placeholderTextColor="#00A2E9"
            onChangeText={value => setForm('klinik', value)}
          />
          <Gap height={16} />
          <Input
            label="Tujuan Dokter"
            value={form.doctor}
            placeholder="MASUKAN Tujuan Dokter"
            placeholderTextColor="#00A2E9"
            onChangeText={value => setForm('doctor', value)}
          />
          <Gap height={16} />
          <Input
            label="Tanggal & Jam Kedatangan"
            value={form.date}
            placeholder="MASUKAN Tanggal dan jam kedatangan"
            placeholderTextColor="#00A2E9"
            onChangeText={value => setForm('date', value)}
          />
          <Gap height={16} />
          <Button title="(Kirim)" textColor="white" onPress={onContinue} />

          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Appoitment;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#112340',
    paddingLeft: 10,
    paddingTop: 12,
  },
  content: {padding: 40, paddingTop: 0},
  searchInput: {
    color: '#00A2E9',
    fontWeight: 'bold',
  },
});
