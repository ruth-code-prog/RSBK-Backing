import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import IcEye from '../../assets/icons/eye.svg';
import IcEyeSlash from '../../assets/icons/eye-slash.svg';
import {Button, Gap, Input, Link} from '../../components';
import FIREBASE from '../../config/FIREBASE';
import {colors, fonts, showError, storeData, useForm} from '../../utils';

const Login = ({navigation}) => {
  const [form, setForm] = useForm({email: '', password: ''});
  const [showPassword, setShowPassword] = useState(false);

  const login = () => {
    FIREBASE.auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then(res => {
        FIREBASE.database()
          .ref(`users/${res.user.uid}/`)
          .once('value')
          .then(resDB => {
            if (resDB.val()) {
              storeData('user', resDB.val());
              navigation.replace('MainApp');
            }
          });
      })
      .catch(err => {
        showError(err.message);
      });
  };

  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={20} />
        <Image
              source={require('../../assets/logo.png')}
              style={{
                width: 50,
                height: 50,
              }}
              resizeMode="contain"
            />
        <Text style={styles.title}>Login Bayukarta Mobile App</Text>
        <Gap height={22} />
        <Input
          label="Email Address"
          value={form.email}
          onChangeText={value => setForm('email', value)}
        />
        <Gap height={24} />
        <Input
          label="Password"
          value={form.password}
          onChangeText={value => setForm('password', value)}
          secureTextEntry={!showPassword}
          right={!showPassword ? <IcEye /> : <IcEyeSlash />}
          onPressRight={() => setShowPassword(!showPassword)}
        />
        <Gap height={10} />
        <Link
          title="Forgot My Password"
          size={12}
          onPress={() => navigation.navigate('ForgotPass')}
        />
        <Gap height={40} />
        <Button title="Masuk" onPress={login} />
        <Gap height={30} />
        <Link
          title="buat Akun Baru"
          size={16}
          align="center"
          onPress={() => navigation.navigate('Register')}
        />
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {paddingHorizontal: 40, backgroundColor: '#112340', flex: 1},
  title: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 18,
  }
});