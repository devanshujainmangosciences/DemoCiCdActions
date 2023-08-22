/**
 * Resources screen component
 */
import React from 'react';
import {View, ScrollView, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {AppText, Container} from 'components';
import {resourcesIcon} from 'assets/icons';
import resourcesData from './resourceData.json';
import styles from './styles';

const Resources = () => {
  const {navigate} = useNavigation();
  const {t} = useTranslation(['settings']);

  /**
   * When a container item is pressed
   */
  const handlePress = (selectedItem) => () => {
    navigate('ResourceSubTypes', {
      selectedItem,
    });
  };

  return (
    <ScrollView
      style={styles.scrollViewContainer}
      contentContainerStyle={styles.contentContainer}>
      {resourcesData.map((item, index) => {
        return (
          <Container
            style={styles.container}
            onPressEvent={handlePress(item)}
            key={index}>
            <View style={styles.containerInner}>
              <Image
                source={resourcesIcon}
                style={styles.image}
                resizeMode={'contain'}
              />
              <AppText
                style={[styles.containerItemTextHeader, {textAlign: 'auto'}]}>
                {t(item.main_title)}
              </AppText>
            </View>
          </Container>
        );
      })}
    </ScrollView>
  );
};

export default Resources;
