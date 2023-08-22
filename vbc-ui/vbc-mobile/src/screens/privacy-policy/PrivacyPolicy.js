/**
 * Privacy Policy screen
 */
import React, {useRef, useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AppText, Container} from 'components';
import styles from './styles';

const PrivacyPolicy = () => {
  const {t} = useTranslation(['privacyPolicy']);
  const scrollRef = useRef(null);
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 300;

  const onPressScrollToTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const renderVerticalSeparator = (marginVertical) => {
    return <View style={{marginTop: marginVertical}} />;
  };

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        onScroll={(event) => {
          setContentVerticalOffset(event.nativeEvent.contentOffset.y);
        }}
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.contentContainer}>
        <Container style={styles.container}>
          <AppText>
            <AppText style={styles.containerItemText}>{`${t(
              'para-1-line-1'
            )}`}</AppText>
            <AppText
              style={
                styles.containerItemTextBold
              }>{`(“Mango, "We", "Us", or "Our"), `}</AppText>
            <AppText style={styles.containerItemText}>{`${t(
              'para-1-line-2-start'
            )} `}</AppText>
            <AppText style={styles.containerItemTextBold}>{`"${t(
              'platform'
            )}") `}</AppText>
            <AppText style={styles.containerItemText}>{`${t(
              'para-1-line-2-contd'
            )}`}</AppText>
          </AppText>
          {renderVerticalSeparator(15)}
          <AppText>
            <AppText style={styles.containerItemText}>{`${t(
              'para-2-start'
            )}`}</AppText>
            <AppText style={styles.containerItemTextBold}>{`("${t(
              'privacyPolicy-bold'
            )}") `}</AppText>
            <AppText style={styles.containerItemText}>{`${t(
              'para-2-contd'
            )}`}</AppText>
          </AppText>
          {renderVerticalSeparator(15)}
          <AppText>
            <AppText style={styles.containerItemText}>{`${t(
              'para-3-start'
            )}`}</AppText>
            <AppText style={styles.containerItemTextBold}>{` ("${t(
              'partnered-institutions'
            )}")`}</AppText>
            <AppText style={styles.containerItemText}>{`${t(
              'para-3-contd'
            )}`}</AppText>
            <AppText style={styles.containerItemTextBold}>{`("${t(
              'services'
            )}").`}</AppText>
          </AppText>
          {renderVerticalSeparator(15)}
          <AppText>
            <AppText style={styles.containerItemText}>{`${t(
              'para-4-start'
            )} `}</AppText>
            <AppText style={styles.containerItemTextBold}>{`("${t(
              'you'
            )}", `}</AppText>
            <AppText style={styles.containerItemTextBold}>{`"${t(
              'your'
            )}" `}</AppText>
            <AppText style={styles.containerItemTextItalics}>{`${t(
              'as-applicable'
            )}) `}</AppText>
            <AppText style={styles.containerItemText}>{`${t(
              'para-4-middle'
            )}`}</AppText>
            <AppText style={styles.containerItemTextBold}>{`("${t(
              'terms'
            )}") `}</AppText>
            <AppText style={styles.containerItemText}>{`${t(
              'para-4-contd'
            )}`}</AppText>
          </AppText>
        </Container>
        <Container style={styles.container}>
          <AppText style={styles.containerHeaderText}>{`1. ${t(
            'collection-of-info'
          )}`}</AppText>
          <View style={styles.marginFromLeft}>
            <AppText style={styles.containerItemText}>{`${t(
              'collection-of-info-data-1'
            )}`}</AppText>
            <AppText style={styles.containerItemTitle}>{`${t(
              'collection-info-desc'
            )}`}</AppText>

            <AppText>
              <AppText style={styles.containerItemText}>{`(i)`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemTextUnderline}>
                {`${t('collection-info-1-title')}`}
              </AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={[styles.containerItemText]}>
                {t('collection-info-1-data')}
              </AppText>
            </AppText>

            <AppText style={styles.containerItemTitle}>{`${t(
              'collection-info-1-sub-desc'
            )}`}</AppText>
            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{'(a)'}</AppText>
              <AppText>
                <AppText style={styles.containerItemSubText}>{`${t(
                  'collection-info-1-sub-1-start'
                )} `}</AppText>
                <AppText style={styles.containerItemSubTextBold}>{`("${t(
                  'medical-info'
                )}"); `}</AppText>
                <AppText style={styles.containerItemSubText}>{`${t(
                  'collection-info-1-sub-1-contd'
                )} `}</AppText>
              </AppText>
            </View>
            {renderVerticalSeparator(15)}
            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{'(b)'}</AppText>
              <AppText style={styles.containerItemSubText}>{`${t(
                'collection-info-1-sub-2-b'
              )}`}</AppText>
            </View>
            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{'(c)'}</AppText>
              <AppText style={styles.containerItemSubText}>{`${t(
                'collection-info-1-sub-2-c'
              )}`}</AppText>
            </View>
            <View style={{flexDirection: 'row'}}>
              <AppText>
                <AppText style={styles.containerItemSubText}>{`${t(
                  'collection-info-1-sub-2-desc-start'
                )} `}</AppText>
                <AppText style={styles.containerItemSubTextBold}>{`("${t(
                  'personal-info'
                )}") `}</AppText>
                <AppText style={styles.containerItemSubText}>{`${t(
                  'collection-info-1-sub-2-desc-contd'
                )}`}</AppText>
              </AppText>
            </View>
            {renderVerticalSeparator(15)}
            <View style={{flexDirection: 'row'}}>
              <AppText>
                <AppText style={[styles.containerItemText]}>
                  {t('collection-info-1-sub-2-last')}
                </AppText>
              </AppText>
            </View>
            {renderVerticalSeparator(15)}
            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{'(ii)'}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText>
                <AppText style={styles.containerItemTextUnderline}>
                  {`${t('collection-info-2-title')}`}
                </AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('collection-info-2-data')}
                </AppText>
              </AppText>
            </View>

            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{'(iii)'}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText>
                <AppText style={styles.containerItemTextUnderline}>
                  {`${t('collection-info-3-title')}`}
                </AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('collection-info-3-data')}
                </AppText>
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{'(iv)'}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText>
                <AppText style={styles.containerItemTextUnderline}>
                  {`${t('collection-info-4-title')}`}
                </AppText>
                <AppText>
                  <AppText style={styles.containerItemText}>
                    {t('collection-info-4-data-start')}
                  </AppText>
                  <AppText style={styles.containerItemText}>{` `}</AppText>
                  <AppText style={styles.containerItemTextBold}>
                    {`("${t('non-personal-info')}"), `}
                  </AppText>
                  <AppText style={styles.containerItemText}>
                    {t('collection-info-4-data-contd')}
                  </AppText>
                </AppText>
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{'(v)'}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText>
                <AppText style={styles.containerItemTextUnderline}>
                  {`${t('collection-info-5-title')}`}
                </AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('collection-info-5-data')}
                </AppText>
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <AppText style={styles.containerItemText}>
              {t('collection-of-info-data-2')}
            </AppText>
            {renderVerticalSeparator(15)}

            <AppText style={styles.containerItemText}>
              {t('collection-of-info-data-3')}
            </AppText>
            {renderVerticalSeparator(15)}

            <AppText style={styles.containerItemText}>
              {t('collection-of-info-data-4')}
            </AppText>
            {renderVerticalSeparator(15)}

            <AppText style={styles.containerItemText}>
              {t('collection-of-info-data-5')}
            </AppText>
            {renderVerticalSeparator(15)}

            <AppText style={styles.containerItemText}>
              {t('collection-of-info-data-6')}
            </AppText>
          </View>
        </Container>

        <Container style={styles.container}>
          <AppText style={styles.containerHeaderText}>{`2. ${t(
            'use-of-info-title'
          )}`}</AppText>
          <View style={styles.marginFromLeft}>
            <AppText style={styles.containerItemText}>{`${t(
              'use-of-info-data-1'
            )}`}</AppText>
            {renderVerticalSeparator(15)}

            <AppText style={styles.containerItemText}>{`${t(
              'use-of-info-data-2'
            )}`}</AppText>
            {renderVerticalSeparator(15)}

            <AppText style={styles.containerItemText}>{`${t(
              'use-of-info-data-3'
            )}`}</AppText>
            {renderVerticalSeparator(15)}

            <AppText style={styles.containerItemText}>{`${t(
              'use-of-info-data-4'
            )}`}</AppText>
            {renderVerticalSeparator(15)}

            <AppText style={styles.containerItemText}>{`${t(
              'use-of-info-data-5'
            )}`}</AppText>
          </View>
        </Container>

        <Container style={styles.container}>
          <AppText style={styles.containerHeaderText}>{`3. ${t(
            'share-of-info-title'
          )}`}</AppText>
          <View style={styles.marginFromLeft}>
            <AppText style={styles.containerItemText}>{`${t(
              'share-of-info-data-1'
            )}`}</AppText>
            {renderVerticalSeparator(15)}

            <AppText style={styles.containerItemText}>{`${t(
              'share-of-info-data-2'
            )}`}</AppText>
            {renderVerticalSeparator(15)}

            <AppText style={styles.containerItemText}>{`${t(
              'share-of-info-data-3'
            )}`}</AppText>
          </View>
        </Container>

        <Container style={styles.container}>
          <AppText style={styles.containerHeaderText}>{`4. ${t(
            'security-info-title'
          )}`}</AppText>
          <View style={styles.marginFromLeft}>
            <AppText style={styles.containerItemText}>{`${t(
              'security-info-data-1'
            )}`}</AppText>
            {renderVerticalSeparator(15)}

            <AppText style={styles.containerItemText}>{`${t(
              'security-info-data-2'
            )}`}</AppText>
          </View>
        </Container>

        <Container style={styles.container}>
          <AppText style={styles.containerHeaderText}>{`5. ${t(
            'third-party-title'
          )}`}</AppText>
          <View style={styles.marginFromLeft}>
            <AppText>
              <AppText style={styles.containerItemText}>{`${t(
                'third-party-data-start'
              )} `}</AppText>
              <AppText style={styles.containerItemTextBold}>{`"${t(
                'third-party-sites'
              )}" `}</AppText>
              <AppText style={styles.containerItemText}>{`${t(
                'third-party-data-contd'
              )}`}</AppText>
            </AppText>
          </View>
        </Container>

        <Container style={styles.container}>
          <AppText style={styles.containerHeaderText}>{`6. ${t(
            'public-title'
          )}`}</AppText>
          <View style={styles.marginFromLeft}>
            <AppText>
              <AppText style={styles.containerItemText}>{`${t(
                'public-data-start'
              )} `}</AppText>
              <AppText style={styles.containerItemTextBold}>{`("${t(
                'posts'
              )}") `}</AppText>
              <AppText style={styles.containerItemText}>{`${t(
                'public-data-contd'
              )}`}</AppText>
            </AppText>
          </View>
        </Container>

        <Container style={styles.container}>
          <AppText style={styles.containerHeaderText}>{`7. ${t(
            'consent-title'
          )}`}</AppText>
          <View style={styles.marginFromLeft}>
            <AppText style={styles.containerItemText}>{`${t(
              'consent-para-1'
            )}`}</AppText>
            {renderVerticalSeparator(15)}
            <AppText>
              <AppText style={styles.containerItemSubHeader}>{`${t(
                'consent-sub-title-1'
              )}`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemSubData}>{`${t(
                'consent-sub-data-1'
              )}`}</AppText>
            </AppText>
            {renderVerticalSeparator(15)}
            <AppText>
              <AppText style={styles.containerItemSubHeader}>{`${t(
                'consent-sub-title-2'
              )}`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemSubData}>{`${t(
                'consent-sub-data-2'
              )}`}</AppText>
            </AppText>
          </View>
        </Container>

        <Container style={styles.container}>
          <AppText style={styles.containerHeaderText}>{`8. ${t(
            'grievance-title'
          )}`}</AppText>
          <View style={styles.marginFromLeft}>
            <AppText style={styles.containerItemText}>{`${t(
              'grievance-para-1'
            )}`}</AppText>
            {renderVerticalSeparator(15)}
            <AppText style={styles.containerItemText}>{`${t(
              'grievance-data'
            )}`}</AppText>
          </View>
        </Container>

        <Container style={styles.container}>
          <AppText style={styles.containerHeaderText}>{`9. ${t(
            'question-title'
          )}`}</AppText>
          <View style={styles.marginFromLeft}>
            <AppText style={styles.containerItemText}>{`${t(
              'question-data'
            )}`}</AppText>
          </View>
        </Container>
      </ScrollView>
      {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
        <TouchableOpacity onPress={onPressScrollToTop} style={styles.fabButton}>
          <Icon name="up" as={AntDesign} style={styles.fabIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PrivacyPolicy;
