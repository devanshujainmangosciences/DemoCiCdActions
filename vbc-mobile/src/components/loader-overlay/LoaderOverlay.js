/**
 * Module that helps to define component for
 * Loader overlay.
 * It helps to have a transparent overlay on top of screen
 * with loader on it.
 */
import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import Loader from '../loader/Loader';
import styles from './styles';

const LoaderOverlay = ({isVisible}) => {
  return (
    <View>
      <Modal
        style={styles.modalContainer}
        backdropOpacity={0.5}
        isVisible={isVisible}
      >
        <Loader />
      </Modal>
    </View>
  );
};

export default LoaderOverlay;
