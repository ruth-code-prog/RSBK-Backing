import React, {Component, useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Alert,
  Image,
} from 'react-native';
import IcEye from '../../assets/icons/eye.svg';
import IcEyeSlash from '../../assets/icons/eye-slash.svg';

import FIREBASE from '../../config/FIREBASE';
import {colors, showError, storeData, useForm} from '../../utils';
import {InputData, Button, Header, Gap, Input} from '../../components';

export default class Appoitement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      namaAkun: '',
      nama: '',
      tanggalLahir: '',
      noWa: '',
      penjamin: '',
      klinik: '',
      dokter: '',
      tanggalKehadiran: '',
    };
  }

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    });
  };

  onSubmit = () => {
    if (
      this.state.namaAkun &&
      this.state.nama &&
      this.state.tanggalLahir &&
      this.state.noWa &&
      this.state.penjamin &&
      this.state.klinik &&
      this.state.dokter &&
      this.state.tanggalKehadiran
    ) {
      const appoitmentReferensi = FIREBASE.database().ref('appoitment');
      const appoitment = {
        namaAkun: this.state.namaAkun,
        nama: this.state.nama,
        tanggalLahir: this.state.tanggalLahir,
        noWa: this.state.noWa,
        penjamin: this.state.penjamin,
        klinik: this.state.klinik,
        dokter: this.state.dokter,
        tanggalKehadiran: this.state.tanggalKehadiran,
      };

      appoitmentReferensi
        .push(appoitment)
        .then(data => {
          Alert.alert(
            'Sukses',
            'Appoitment berhasil di simpan, Our Staff `ll send you a confirmation via whatsapp',
          );
          this.props.navigation.replace('MainApp');
        })
        .catch(error => {
          console.log('Error : ', error);
        });
    } else {
      Alert.alert('Error', 'Form wajib di isi semua');
    }
  };

  render() {
    return (
      <View>
        <View
          style={{
            paddingHorizontal: 16,
            backgroundColor: '#112340',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 10,
            }}>
            <Image
              source={require('../../assets/logo.png')}
              style={{
                width: 50,
                height: 50,
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 20,
                alignItems: 'center',
                justifyContent: 'center',
                alignText: 'center',
                paddingRight: 40,
              }}>
              Appoitment Rawat Jalan
            </Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <ScrollView style={styles.pages}>
              <InputData
                label="Nama Akun"
                placeholder="Masukkan Nama Akun"
                onChangeText={this.onChangeText}
                value={this.state.namaAkun}
                namaState="namaAkun"
              />
              <Gap height={10} />
              <InputData
                label="Nama Pasien"
                placeholder="Masukkan Nama Pasien (Nama Anda/ Nama keluarga Anda)"
                isTextArea={true}
                onChangeText={this.onChangeText}
                value={this.state.nama}
                namaState="nama"
              />
              <Gap height={10} />
              <InputData
                label="Tanggal Lahir Pasien"
                placeholder="Masukkan Tanggal Lahir Pasien"
                onChangeText={this.onChangeText}
                value={this.state.tanggalLahir}
                namaState="tanggalLahir"
              />
              <Gap height={10} />
              <InputData
                label="No WhatsApp yang bisa di hubungi"
                placeholder="Masukkan No Whatsapp"
                keyboardType="number-pad"
                onChangeText={this.onChangeText}
                value={this.state.noWa}
                namaState="noWa"
              />
              <Gap height={10} />
              <InputData
                label="Penjamin"
                placeholder="Umum/ Asuransi/ Mitra (Untuk Asuransi & Mitra Optional: Nomor Kartu Asuransi/ Mitra)"
                isTextArea={true}
                onChangeText={this.onChangeText}
                value={this.state.penjamin}
                namaState="penjamin"
              />
              <Gap height={10} />
              <InputData
                label="Klinik Yang di tuju"
                placeholder="Masukkan klinik yang di tuju"
                isTextArea={true}
                onChangeText={this.onChangeText}
                value={this.state.klinik}
                namaState="klinik"
              />
              <Gap height={10} />
              <InputData
                label="Dokter yang di tuju"
                placeholder="Masukkan Dokter yang di tuju"
                isTextArea={true}
                onChangeText={this.onChangeText}
                value={this.state.dokter}
                namaState="dokter"
              />
              <Gap height={10} />
              <InputData
                label="Tanggal & Waktu (Jam) Kehadiran"
                placeholder="Masukkan Tanggal dan Jam kehadiran"
                isTextArea={true}
                onChangeText={this.onChangeText}
                value={this.state.tanggalKehadiran}
                namaState="tanggalKehadiran"
              />
              <Gap height={10} />
              <TouchableOpacity
                style={styles.tombol}
                onPress={() => this.onSubmit()}>
                <Text style={styles.textTombol}>KIRIM</Text>
              </TouchableOpacity>
              <Gap height={100} />
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#112340',
    flex: 1,
  },
  pages: {
    margin: 10,
    flex: 1,
    padding: 20,
    backgroundColor: '#112340',
    borderRadius: 10,
  },
  tombol: {
    backgroundColor: '#0BCAD4',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  textTombol: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
