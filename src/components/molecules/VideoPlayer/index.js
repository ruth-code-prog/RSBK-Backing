import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import FIREBASE from '../../../config/FIREBASE';

const VideoPlayer = ({ link, visible, onClose }) => {
  const scrollRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  let listener;

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("Video Parantos Beres!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <Modal animationType="fade" visible={visible} transparent>
      <View style={styles.container}>
        <YoutubePlayer
          height={Dimensions.get("screen").height / 4}
          play={playing}
          videoId={link}
          onChangeState={onStateChange}
        />

        <Button title={playing ? "Pause" : "Play"} onPress={togglePlaying}/>
        <TouchableOpacity
          onPress={() => {
            setPlaying(false);
            FIREBASE.database()
              .ref("video/" + link)
              .off("value", listener);
            onClose && onClose();
          }}
          style={styles.btnClose}
        >
          <Text style={styles.btnCloseText}>Tutup</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#a4f9ef7F",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  content: {
    height: Dimensions.get("screen").height / 3,
    backgroundColor: "#FFFFFF",
  },
  btnClose: {
    height: 42,
    borderRadius: 10,
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  btnPlay: {
    height: 42,
    borderRadius: 10,
    backgroundColor: "#008000",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  btnCloseText: {
    fontSize: 18,
    textAlign: "center",
    color: "#FFFFFF",
  },
});