/**
 * TODO. Needs to be removed.
 */
import React from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
import Config from 'react-native-config';
import styles from './styles';

const Web = () => {
  return (
    <View style={styles.container}>
      <WebView source={{uri: Config.MANGO_SCIENCES_URL}} onLoad={() => {}} />
    </View>
  );
};

export default Web;
