/**
 * Resources Detail screen component
 */
import React from 'react';
import {View, ScrollView, Linking} from 'react-native';
import {AppText, Container} from 'components';
import {dynamicSize} from 'utils';
import styles from './styles';

const ResourceDetail = ({
  route: {
    params: {item},
  },
}) => {
  return (
    <ScrollView
      style={styles.scrollViewContainer}
      contentContainerStyle={styles.contentContainer}>
      {item?.subs?.map((item, index) => {
        return (
          <Container style={styles.container} key={index}>
            {item?.sub_head != '' && (
              <View style={styles.containerInner}>
                <AppText style={styles.heading}>{item.sub_head}</AppText>
              </View>
            )}

            {item?.init_para?.map((paraItem, index) => {
              return (
                <View style={styles.verticalMargin} key={index}>
                  <AppText style={styles.containerItemText}>{paraItem}</AppText>
                </View>
              );
            })}
            {item?.sub_head_types?.map((subHeadTypes, index) => {
              return (
                <>
                  <View style={styles.verticalMargin} key={index}>
                    <AppText style={styles.heading}>
                      {subHeadTypes.sub_head}
                    </AppText>
                  </View>
                  {subHeadTypes?.init_para?.map(
                    (subHeadTypesParaItem, index) => {
                      return (
                        <View style={styles.verticalMargin} key={index}>
                          <AppText style={styles.containerItemText}>
                            {subHeadTypesParaItem}
                          </AppText>
                        </View>
                      );
                    }
                  )}
                  {subHeadTypes.highlights.map((highlights, index) => {
                    return (
                      <View style={styles.highlightsContainer} key={index}>
                        <View
                          style={[
                            styles.bulletPoint,
                            {marginTop: dynamicSize(9)},
                          ]}
                        />
                        <AppText>
                          <AppText style={styles.highlightTitle}>
                            {`${highlights.title}:`}
                          </AppText>
                          <AppText>{` `}</AppText>
                          <AppText style={styles.highlightDesc}>
                            {highlights.desc}
                          </AppText>
                        </AppText>
                      </View>
                    );
                  })}
                </>
              );
            })}
            {item?.highlights?.map((highlights, index) => {
              return (
                <>
                  <View style={styles.highlightsContainer} key={index}>
                    <View
                      style={[styles.bulletPoint, {marginTop: dynamicSize(9)}]}
                    />
                    <AppText>
                      <AppText style={styles.highlightTitle}>
                        {`${highlights.title}:`}
                      </AppText>
                      <AppText>{` `}</AppText>
                      <AppText style={styles.highlightDesc}>
                        {highlights.desc}
                      </AppText>
                    </AppText>
                  </View>
                  {highlights?.bullets?.map((bullets, index) => {
                    return (
                      <View
                        style={styles.highlightsBulletContainer}
                        key={index}>
                        <View style={styles.bulletPoint} />
                        <AppText>
                          <AppText style={styles.highlightTitle}>
                            {bullets?.desc}
                          </AppText>
                        </AppText>
                      </View>
                    );
                  })}
                </>
              );
            })}
            {item?.last_para?.map((paraItem, index) => {
              return (
                <View style={styles.verticalMargin} key={index}>
                  <AppText style={styles.containerItemText}>{paraItem}</AppText>
                </View>
              );
            })}
            {item?.bullets?.map((bullets, index) => {
              return (
                <View style={styles.highlightsContainer} key={index}>
                  <View style={styles.bulletPoint} />
                  <AppText>
                    <AppText style={styles.highlightTitle}>{bullets}</AppText>
                  </AppText>
                </View>
              );
            })}
            {item?.last_para?.map((paraItem, index) => {
              return (
                <View style={styles.verticalMargin} key={index}>
                  <AppText style={styles.containerItemText}>{paraItem}</AppText>
                </View>
              );
            })}
            {item?.links?.map((link, index) => {
              return (
                <View style={styles.verticalMargin} key={index}>
                  <AppText
                    style={styles.containerItemTextLink}
                    onPress={() => Linking.openURL(link)}>
                    {link}
                  </AppText>
                </View>
              );
            })}
            {item?.numbered_order?.map((numberText, index) => {
              return (
                <View style={styles.verticalMargin} key={index}>
                  <AppText>
                    <AppText style={styles.containerItemTextBold}>{`${
                      index + 1
                    }. `}</AppText>
                    <AppText style={styles.containerItemTextBold}>
                      {numberText.title}
                    </AppText>
                  </AppText>
                  {numberText?.para?.map((paraItem, index) => {
                    return (
                      <AppText style={styles.containerItemText} key={index}>
                        {paraItem}
                      </AppText>
                    );
                  })}
                  {numberText?.bullets?.map((bullets, index) => {
                    return (
                      <View style={styles.highlightsContainer} key={index}>
                        <View style={styles.bulletPoint} />
                        <AppText>
                          <AppText style={styles.highlightTitle}>
                            {bullets.desc}
                          </AppText>
                        </AppText>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </Container>
        );
      })}
      {item?.subs?.length === 0 && (
        <Container style={styles.dummyHeight}>
          <AppText style={styles.dummyText}>
            Right now, we are updating the content. Please bear us for some
            time.
          </AppText>
        </Container>
      )}
    </ScrollView>
  );
};

export default ResourceDetail;
