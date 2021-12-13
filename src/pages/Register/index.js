import React, {Component, useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, TextInput,  ActivityIndicator} from 'react-native';
import FIREBASE from '../../config/FIREBASE';
import {colors, showError, storeData, useForm} from '../../utils';
import {InputData, Button, Header, Gap, Input} from '../../components';

const Register = ({navigation}) => {
  const [form, setForm] = useForm({
    fullName: '',
    mobileNumber: '',
    email: '',
    password: '',
  });

  const onContinue = () => {
    FIREBASE.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(success => {
        setForm('reset');
        const data = {
          fullName: form.fullName,
          mobileNumber: form.mobileNumber,
          email: form.email,
          password: form.password,
          uid: success.user.uid,
        };

        FIREBASE.database()
          .ref('users/' + success.user.uid + '/')
          .set(data);

        storeData('user', data);
        navigation.replace('Sukses', data);
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
            label="Nama Lengkap"
            value={form.fullName}
            placeholder="MASUKAN NAMA LENGKAP"
            placeholderTextColor="#00A2E9"
            onChangeText={value => setForm('fullName', value)}
          />
          <Gap height={16} />
          <Input
            label="Nomor Handphone"
            value={form.mobileNumber}
            keyboardType='numeric'
            onChangeText={value => setForm('mobileNumber', value)}
            keyboardType='numeric'
            placeholder="MASUKAN NOMOR HANDHPONE"
            placeholderTextColor="#00A2E9"
          />
          <Gap height={16} />
          <Input
            label="Email"
            value={form.email}
            placeholder="MASUKAN EMAIL ANDA"
            placeholderTextColor="#00A2E9"
            onChangeText={value => setForm('email', value)}
          />
         <Gap height={16} />
          <Input
            label="Password"
            value={form.password}
            placeholder="MASUKAN PASSWORD"
            placeholderTextColor="#00A2E9"
            onChangeText={value => setForm('password', value)}
            secureTextEntry
          />
          <Gap height={16} />
          <Button title="(REGISTER)" textColor="white" onPress={onContinue} />

          <Gap height={30} />
        <Button
          type="secondary"
          title="Sudah punya Akun (LOGIN)"
          onPress={() => navigation.replace('Login')}
        />
        </ScrollView>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: { flex: 1,
        backgroundColor: '#112340',
        borderRadius: 10,
        paddingLeft: 10,
        paddingTop: 12,
      },
  content: {padding: 40, paddingTop: 0},
  searchInput: {
        color: "#00A2E9",
        fontWeight: 'bold',
      },
});