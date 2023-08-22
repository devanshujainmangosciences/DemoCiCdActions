/**
 * Component that -
 * when pressed expands and
 * renders the passed children.
 * Used in:
 * - AddApplicants screen - added applicants section
 */
import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AppText} from '../appText';
import styles from './styles';

const ExpandableItem = (props) => {
  const [show, setShow] = useState(false);
  const {heading, headingBgColor, children} = props;
  const handleShowHide = () => {
    setShow(!show);
  };
  const iconName = show ? 'up' : 'down';
  return (
    <>
      {typeof heading === 'string' ? (
        <Pressable
          style={[
            styles.headingContainer,
            {backgroundColor: headingBgColor},
            show && {borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
          ]}
          onPress={handleShowHide}>
          <AppText style={styles.heading}>{heading}</AppText>
          <Icon name={iconName} as={AntDesign} style={styles.headingIcon} />
        </Pressable>
      ) : (
        <Pressable
          style={[
            styles.headingContainerBig,
            {backgroundColor: headingBgColor},
            show && {borderRadius: 0},
          ]}
          onPress={handleShowHide}>
          <View style={styles.multilineContainer}>
            <View
              style={[
                styles.headingTextContainer,
                props.children
                  ? {
                      flex: 0.95,
                    }
                  : {flex: 1},
              ]}>
              {heading()}
            </View>
            {props.children && (
              <View style={styles.iconContainer}>
                <Icon
                  name={iconName}
                  as={AntDesign}
                  style={styles.headingIcon}
                />
              </View>
            )}
          </View>
        </Pressable>
      )}

      {show && <View>{children}</View>}
    </>
  );
};

export default ExpandableItem;
