/**
 * Resources sub types screen component
 */
import React from 'react';
import {View, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AppText, Container} from 'components';
import styles from './styles';

const ResourceSubTypes = ({
  route: {
    params: {selectedItem},
  },
}) => {
  const {navigate} = useNavigation();

  /**
   * When a container item is pressed
   */
  const handlePress = (item) => () => {
    navigate('ResourceDetail', {
      item,
    });
  };
  return (
    <ScrollView
      style={styles.scrollViewContainer}
      contentContainerStyle={styles.contentContainer}>
      {selectedItem?.sideData?.map((item, index) => {
        return (
          <Container
            style={styles.container}
            onPressEvent={handlePress(item)}
            key={index}>
            <View style={styles.containerSubTypes}>
              <View style={styles.titleContainer}>
                <AppText
                  style={[styles.containerItemTextHeader, {textAlign: 'auto'}]}>
                  {item.sideDesc}
                </AppText>
              </View>
            </View>
          </Container>
        );
      })}
    </ScrollView>
  );
};

export default ResourceSubTypes;
