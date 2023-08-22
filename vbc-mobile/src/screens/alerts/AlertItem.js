/**
 * Alert Item Component
 */
import React from 'react';
import {View} from 'react-native';
import {AppText, Container} from 'components';
import {Theme} from 'constants';
import {getFormattedDate} from 'utils';
import styles from './styles';

const AlertItem = ({item, handlePressItem}) => {
  return (
    <Container
      style={styles.container}
      customBackgroundColor={item.readDate ? Theme.snow : Theme.darkWhite}
      onPressEvent={() => handlePressItem(item?.id)}>
      <View style={styles.containerInner}>
        <View>
          <AppText style={styles.containerItemText}>{item?.content}</AppText>
          {item.readDate && (
            <AppText style={styles.timeText}>
              {getFormattedDate(item.readDate)}
            </AppText>
          )}
        </View>
      </View>
    </Container>
  );
};

export default AlertItem;
