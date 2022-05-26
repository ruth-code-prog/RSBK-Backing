import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Info from '../Info';
import CardAntrian from '../CardAntrian';
import {Gap} from '../../components';

const Informasi = () => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
        <Gap height={10} />
          <Text style={styles.news}>About You (Akun & Antrian & Appoitment)</Text>
          <CardAntrian />
          <Gap height={20} />
          <Text style={styles.news}>Bayukarta TeleVision Channel</Text>
          <Info />
        </View>
      </ScrollView>
    </View>
  );
};

export default Informasi;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#112340',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 0,
    marginTop: 10,
    color: '#FBFCFC',
  },
  news: {
    paddingLeft: 10,
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FBFCFC',
  },
});
