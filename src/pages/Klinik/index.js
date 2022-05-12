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
        setData(arr);
        setAllData(arr);
      })
      .catch((err) => {
        console.error(err);
      });
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

  return (
    <View style={styles.pages}>
      <View style={{ padding: 20, paddingTop: 8 }}>
        <Input
          onChangeText={(val) => handleFilter(val)}
          label="Cari Klinik"
          placeholder="Masukkan judul atau Nama Meeting Room"
        />
      </View>
      {loading ? (
        <ActivityIndicator size={24} color={colors.primary} />
      ) : (
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={data}
          contentContainerStyle={styles.listContentContainer}
          renderItem={({ item }) => (
            <TouchableOpacity>
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
    padding: 40,
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
    height: 140,
    width: "100%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },
  body: {
    fontSize: 12,
    color: colors.secondary,
  },
});