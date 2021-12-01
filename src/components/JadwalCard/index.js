import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const JadwalCard = ({
  item,
  type,
  onRemove,
  onPress,
  uid,
  jadwal,
  onAdd,
}) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <View
      style={[
        {
          width: 310,
          height: 520,
          borderRadius: 10,
          marginRight: 10,
          marginBottom: 24,
          marginTop: 20,
          backgroundColor: "#FFFFFF",
        },
        styles.shadow,
      ]}
    >
      <Image
        source={{
          uri: item?.image || "",
        }}
        style={{
          width: 310,
          height: 320,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <View
        style={{
          padding: 20,
          backgroundColor: "white",
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#2d3436",
            marginTop: 8,
          }}
        >
          {item?.title}
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode={"tail"}
          style={{
            fontWeight: "bold",
            fontSize: 14,
            color: "#27AE60",
          }}
        >
          {item?.senin}
        </Text>

        <Text
          numberOfLines={3}
          ellipsizeMode={"tail"}
          style={{
            fontWeight: "bold",
            fontSize: 14,
            color: "#27AE60",
          }}
        >
          {item?.selasa}
        </Text>

        <Text
          numberOfLines={4}
          ellipsizeMode={"tail"}
          style={{
            fontWeight: "bold",
            fontSize: 14,
            color: "#27AE60",
          }}
        >
          {item?.rabu}
        </Text>

        <Text
          numberOfLines={5}
          ellipsizeMode={"tail"}
          style={{
            fontWeight: "bold",
            fontSize: 14,
            color: "#27AE60",
          }}
        >
          {item?.kamis}
        </Text>

        <Text
          numberOfLines={6}
          ellipsizeMode={"tail"}
          style={{
            fontWeight: "bold",
            fontSize: 14,
            color: "#27AE60",
          }}
        >
          {item?.jumat}
        </Text>

        <Text
          numberOfLines={7}
          ellipsizeMode={"tail"}
          style={{
            fontWeight: "bold",
            fontSize: 14,
            color: "#27AE60",
          }}
        >
          {item?.sabtu}
        </Text>
      </View>
    </View>
  );
};

export default JadwalCard;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  rowBetweenCenter: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});