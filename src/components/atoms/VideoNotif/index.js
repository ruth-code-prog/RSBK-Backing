import React, {useState, useCallback, useRef, } from 'react';
import {StyleSheet, Modal, Text, View, ScrollView} from 'react-native';
import {Button, Alert} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { WebView } from 'react-native-webview';

const VideoNotif = ({link, visible, onClose}) => {
const GOOLGE = 'https://google.com';
    return (
      <View style={{flex: 1}}>
       <WebView
        style={{ marginTop: 20, width: "100%", height: 230 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ uri: "https://www.youtube.com/embed/IB_pdEHZIsc?rel=0&autoplay=1" }}
      />
      </View>
    );
  };

export default VideoNotif;

const styles = StyleSheet.create({
  tube: {},
});