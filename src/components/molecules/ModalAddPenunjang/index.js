import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Gap, Input} from '../..';
import {colors, useFormSoul} from '../../../utils';

const ModalAddPenunjang = ({
  onAddImage,
  onSubmit,
  uploadLoading,
  visible,
  onClose,
  form,
  setForm,
}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => onClose && onClose()}
            style={{alignSelf: 'flex-end', marginBottom: 24}}>
            <Text style={{fontSize: 24}}>X</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Tambah Foto Medical Record Anda</Text>
          <Gap height={20} />
          <Input
            value={form.title}
            onChangeText={val => setForm({title: val})}
            label={'Masukkan Judul'}
          />
          {form?.image && (
            <View style={{alignItems: 'center'}}>
              <Gap height={20} />
              <Image style={styles.image} source={{uri: form?.image}} />
            </View>
          )}
          <Gap height={20} />
          <Button
            onPress={() => onAddImage && onAddImage()}
            type={'secondary'}
            title={form?.image ? 'Ubah Gambar' : 'Upload Gambar'}
          />
          <Gap height={20} />
          <Button
            onPress={() => onSubmit && onSubmit()}
            disable={form.title === '' || !form.image}
            loading={uploadLoading}
            title={'Kirim'}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalAddPenunjang;

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 32,
    backgroundColor: colors.loadingBackground,
  },
  container: {
    backgroundColor: '#112340',
    width: '100%',
    padding: 24,
  },
  headerText: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 20,
  },
});