import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  RefreshControl,
} from "react-native";
import {
  Gap,
  Header,
  Input,
  VideoPlayer,
} from "../../components";
import FIREBASE from '../../config/FIREBASE';
import { colors } from "../../utils";

const Klinik = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    FIREBASE.database()
      .ref("cardSolved")
      .once("value")
      .then((res) => {
        const snapshotVal = res.val();
        const arr = snapshotVal.filter((val) => val);
        setRefreshing(true);
        setData(arr);
        setAllData(arr);
        wait(2000).then(() => setRefreshing(false));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const handleFilter = (val) => {
    setLoading(true);
    let arr = [...allData];
    var searchRegex = new RegExp(val, "i");
    arr = arr.filter((item) => searchRegex?.test(item?.title));
    setData(arr);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const openKlinik = url => {
    Linking.openURL('https://' + url);
  };

  return (
    <View style={styles.pages}>
      <View style={{ padding: 20, paddingTop: 8 }}>
        <Input
          onChangeText={(val) => handleFilter(val)}
          label="Cari Klinik"
          placeholder="Masukkan Klinik"
        />
      </View>
      {loading ? (
        <ActivityIndicator size={24} color={colors.primary} />
      ) : (
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getData} />
          }
          data={data}
          contentContainerStyle={styles.listContentContainer}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openKlinik(item.link)} key={item.id}>
              <Image source={{ uri: item?.image }} style={styles.thumbnail} />
              <Gap height={8} />
              <View>
                <Text style={styles.title}>{item?.title}</Text>
                <Gap height={4} />
                <Text
                  numberOfLines={2}
                  lineBreakMode="tail"
                  style={styles.title}
                >
                  Pasien Terlayani= {item?.body}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapperStyle}
        />
      )}
    </View>
  );
};

export default Klinik;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: '#112340',
  },
  listContentContainer: {
    padding: 14,
    // justifyContent: "space-between",
  },
  columnWrapperStyle: {
    justifyContent: "space-between",
  },
  videoContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 8,
    borderRadius: 5,
    width: Dimensions.get("screen").width / 2 - 28,
  },
  thumbnail: {
    height: 180,
    width: "100%",
    borderRadius: 14,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary,
  },
  body: {
    fontSize: 12,
    color: colors.secondary,
  },
});