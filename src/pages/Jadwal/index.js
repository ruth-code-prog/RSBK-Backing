import React, {Component, useCallback, useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, Linking, ScrollView, TouchableOpacity,  TextInput, ActivityIndicator} from 'react-native'
import FIREBASE from '../../config/FIREBASE';
import JadwalCard from '../../components/JadwalCard';

const Jadwal = props => {
    const [jadwals, setJadwals] = useState([]);
    const [jadwalsAll, setJadwalsAll] = useState([]);
    const [searchJadwalLoading, setSearchJadwalLoading] = useState(false);

    useEffect(() => {
        getJadwals();
      }, []);

      const getJadwals = () => {
        FIREBASE.database()
        .ref('jadwal')
        .on('value', res => {
          const arr = [...res.val()];
          setJadwals(arr.filter(val => val !== null));
          setJadwalsAll(arr.filter(val => val !== null));
        });
      
      setSearchJadwalLoading(false);
      };
      
      const handleJadwalsFilter = (val) => {
        setSearchJadwalLoading(true);
        let arr = [...jadwalsAll];
        var searchRegex = new RegExp(val, 'i');
        arr = arr.filter(item => searchRegex?.test(item?.title));
        setJadwals(arr);
        setTimeout(() => {
          setSearchJadwalLoading(false);
        }, 1500);
      };

      return (
        <View style={styles.page}>
          <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <Text
                  style={{
                    marginTop: 30,
                    marginBottom: 10,
                    fontWeight: 'bold',
                    color: '#000000',
                    marginHorizontal: 2,
                  }}>
                  CARI JADWAL PRAKTEK DOKTER
                </Text>
    
                <View style={styles.cariObat}>
                  <TextInput
                    onChangeText={val => handleJadwalsFilter(val, jadwals)}
                    selectTextOnFocus
                    style={styles.searchInput}
                    placeholder="MASUKAN NAMA DOKTER/ KLINIK YANG DI TUJU"
                    placeholderTextColor="#000" 
                  />
                </View>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{marginTop: 10, paddingHorizontal: 2}}>
                {searchJadwalLoading ? (
                  <ActivityIndicator
                    size={40}
                    color="#FFFFFF"
                    style={{marginVertical: 40, marginLeft: 40}}
                  />
                ) : (
                  jadwals?.map((item, index) => (
                    <JadwalCard
                      onRemove={() => handleRemoveFavorite(item, jadwals)}
                      onAdd={() => handleAddFavorite(item, jadwals)}
                      onPress={() => handleBuy(item)}
                      type="jadwal"
                      key={index}
                      item={item}
                    />
                  ))
                )}
              </ScrollView>
              </ScrollView>
        </View>
       );
      };
      export default Jadwal;
    
    const styles = StyleSheet.create({
      page: {
        flex: 1,
        backgroundColor: '#00FFFF',
      },
      cariObat: {
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
      },
      searchInput: {
        color: "#000000",
        fontWeight: 'bold',
      }
    });
    
    
    