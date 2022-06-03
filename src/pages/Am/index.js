import React, {Component} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ImageCropPicker from 'react-native-image-crop-picker';
import {Gap, InputData} from '../../components';
import FIREBASE from '../../config/FIREBASE';
import {getData} from '../../utils';

export default class Am extends Component {
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
      photoForDB: '',
      photo: '',
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    });
  };

  getUserData = async () => {
    const userData = await getData('user');
    this.setState({
      ...this.state,
      namaAkun: userData?.fullName,
    });
  };

  uploadPhoto = () => {
    ImageCropPicker.openCamera({
      width: 400,
      height: 300,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        const source = {uri: image.path};
        console.log(source);
        this.setState({
          ...this.state,
          photoForDB: `data:${image.mime};base64,${image.data}`,
          photo: source,
        });
        Alert.alert(
          'Berhasil Uploud Kartu Jaminan Asuransi/ Mitra. Silahkan melanjutkan proses pengisian form',
        );
      })
      .catch(err => {
        console.log(err);
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
      this.state.tanggalKehadiran &&
      this.state.photoForDB
    ) {
      const amReferensi = FIREBASE.database().ref('assMit');
      const am = {
        namaAkun: this.state.namaAkun,
        nama: this.state.nama,
        tanggalLahir: this.state.tanggalLahir,
        noWa: this.state.noWa,
        penjamin: this.state.penjamin,
        klinik: this.state.klinik,
        dokter: this.state.dokter,
        tanggalKehadiran: this.state.tanggalKehadiran,
        photo: this.state.photoForDB,
      };

      amReferensi
        .push(am)
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
    console.log(this.state.photo);
    return (
      <View>
        <Gap height={40} />
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
              Appoitment Pasien Asuransi/ Mitra
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
                placeholder="Asuransi/ Mitra (Isi Nama Asuransi/ Nama Perusahaan Mitra)"
                isTextArea={true}
                onChangeText={this.onChangeText}
                value={this.state.penjamin}
                namaState="penjamin"
              />
              {this.state.photo ? (
                <Image source={this.state.photo} style={styles.photo} />
              ) : (
                <View />
              )}
              <TouchableOpacity
                style={styles.tombol}
                onPress={() => this.uploadPhoto()}>
                <Text style={styles.textTombol}>
                  Upload Kartu Asuransi/Mitra
                </Text>
              </TouchableOpacity>
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
    backgroundColor: '#F8F8F8',
    flex: 1,
  },
  pages: {
    margin: 10,
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
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
  photo: {
    height: 200,
    width: '100%',
    borderRadius: 8,
  },
});

