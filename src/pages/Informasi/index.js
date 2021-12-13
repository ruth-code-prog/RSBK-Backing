import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Info from '../Info';

const Informasi = () => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
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
