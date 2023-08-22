/**
 * Terms of use screen
 */
import React, {useRef, useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AppText, Container} from 'components';
import styles from './styles';

const TermsOfUse = () => {
  const {t} = useTranslation(['termsofuse']);
  const scrollRef = useRef(null);
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 300;

  const renderVerticalSeparator = (marginVertical) => {
    return <View style={{marginTop: marginVertical}} />;
  };

  // when user clicks on bottom button to scroll to top
  const onPressScrollToTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  return (
    <View>
      <ScrollView
        onScroll={(event) => {
          setContentVerticalOffset(event.nativeEvent.contentOffset.y);
        }}
        ref={scrollRef}
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.contentContainer}>
        <Container style={styles.container}>
          <AppText>
            <AppText style={styles.containerItemText}>
              {`${t('para-1-start')} (the `}
            </AppText>
            <AppText style={styles.containerItemTextBold}>{`"${t(
              'terms'
            )}") `}</AppText>
            <AppText style={styles.containerItemText}>{`${t(
              'para-1-middle-1'
            )} `}</AppText>
            <AppText style={styles.containerItemTextBold}>{`("${t(
              'you'
            )}" `}</AppText>
            <AppText style={styles.containerItemText}>{`or `}</AppText>
            <AppText style={styles.containerItemTextBold}>{`"${t(
              'your'
            )}" `}</AppText>
            <AppText style={styles.containerItemText}>{`or `}</AppText>
            <AppText style={styles.containerItemTextBold}>{`"${t(
              'yourself'
            )}" `}</AppText>
            <AppText style={styles.containerItemText}>{`or `}</AppText>
            <AppText style={styles.containerItemTextBold}>{`"${t(
              'user'
            )}") `}</AppText>
            <AppText style={styles.containerItemText}>{`${t(
              'para-1-middle-2'
            )} `}</AppText>
            <AppText style={styles.containerItemTextBold}>{`"${t(
              'platform'
            )}"`}</AppText>
            <AppText style={styles.containerItemText}>{`${t(
              'para-1-middle-3'
            )} `}</AppText>
            <AppText style={styles.containerItemTextBold}>{`("${t(
              'mango-sciences'
            )}") `}</AppText>
            <AppText style={styles.containerItemText}>{`${t(
              'para-1-contd'
            )} `}</AppText>
            <AppText style={styles.containerItemTextBold}>{`(the "${t(
              'mango-cancer-care'
            )}") `}</AppText>
          </AppText>

          {renderVerticalSeparator(15)}
          <AppText style={styles.containerItemText}>{`${t('para-2')}`}</AppText>
          {renderVerticalSeparator(15)}

          <AppText style={styles.containerItemText}>{`${t('para-3')}`}</AppText>
          {renderVerticalSeparator(15)}

          <AppText style={styles.containerItemText}>{`${t('para-4')}`}</AppText>
        </Container>
        <Container style={styles.container}>
          <AppText style={styles.containerHeaderText}>{`1. ${t(
            'services-title'
          )}`}</AppText>
          <View style={styles.marginFromLeft}>
            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`1.1`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('services-sub-head')}`}
              </AppText>
            </View>

            {renderVerticalSeparator(15)}
            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(i)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText>
                  <AppText style={styles.containerItemText}>
                    {t('services-sub-1-start')}
                  </AppText>
                  <AppText style={styles.containerItemTextBold}>
                    {`(${t('partnered-institutions')})`}
                  </AppText>
                  <AppText style={styles.containerItemText}>
                    {t('services-sub-1-contd')}
                  </AppText>
                </AppText>
              </View>
            </View>
            {renderVerticalSeparator(15)}
            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(ii)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('services-sub-2')}
                </AppText>
              </View>
            </View>

            {renderVerticalSeparator(15)}
            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(iii)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('services-sub-3')}
                </AppText>
              </View>
            </View>
            {renderVerticalSeparator(15)}

            <View style={styles.marginFromLeftDouble}>
              <AppText>
                <AppText style={styles.containerItemText}>
                  {t('services-sub-data-start')}
                </AppText>
                <AppText style={styles.containerItemTextBold}>
                  {`"${t('services')}" `}
                </AppText>
                <AppText style={styles.containerItemText}>
                  {t('services-sub-data-contd')}
                </AppText>
              </AppText>
            </View>
          </View>
        </Container>

        <Container style={styles.container}>
          <AppText style={styles.containerHeaderText}>{`2. ${t(
            'eligibility-title'
          )}`}</AppText>
          <View style={styles.marginFromLeft}>
            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`2.1`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('eligibility-sub')}`}
              </AppText>
            </View>
          </View>
        </Container>

        <Container style={styles.container}>
          <AppText style={styles.containerHeaderText}>{`3. ${t(
            'user-account-title'
          )}`}</AppText>
          <View style={styles.marginFromLeft}>
            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`3.1`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText>
                <AppText style={styles.containerItemText}>
                  {`${t('user-account-sub-1-start')} `}
                </AppText>
                <AppText style={styles.containerItemTextBold}>
                  {`("${t('patient')}") `}
                </AppText>
                <AppText style={styles.containerItemText}>
                  {`${t('user-account-sub-1-middle-1')} `}
                </AppText>
                <AppText style={styles.containerItemTextBold}>
                  {`("${t('patient-caregiver')}") `}
                </AppText>
                <AppText style={styles.containerItemText}>
                  {`${t('user-account-sub-1-middle-2')} `}
                </AppText>
                <AppText style={styles.containerItemTextBold}>
                  {`("${t('account')}") `}
                </AppText>
                <AppText style={styles.containerItemText}>
                  {`${t('user-account-sub-1-contd')}`}
                </AppText>
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`3.2`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('user-account-sub-2')}`}
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`3.3`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('user-account-sub-3')}`}
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`3.4`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('user-account-sub-4')}`}
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`3.5`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('user-account-sub-5')}`}
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`3.6`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('user-account-sub-6')}`}
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`3.7`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('user-account-sub-7')}`}
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`3.8`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('user-account-sub-8')}`}
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`3.9`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('user-account-sub-9')}`}
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`3.10`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('user-account-sub-10')}`}
              </AppText>
            </View>
          </View>
        </Container>

        <Container style={styles.container}>
          <AppText style={styles.containerHeaderText}>{`4. ${t(
            'use-of-service-title'
          )}`}</AppText>
          <View style={styles.marginFromLeft}>
            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`4.1`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('use-of-service-sub-1')}`}
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`4.2`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('use-of-service-sub-2')}`}
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`4.3`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('use-of-service-sub-3')}`}
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`4.4`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('use-of-service-sub-4')}`}
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`4.5`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('use-of-service-sub-5')}`}
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`4.6`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('use-of-service-sub-6')}`}
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`4.7`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('use-of-service-sub-7')}`}
              </AppText>
            </View>
          </View>
        </Container>

        <Container style={styles.container}>
          <AppText style={styles.containerHeaderText}>{`5. ${t(
            'use-of-platform-title'
          )}`}</AppText>
          <View style={styles.marginFromLeft}>
            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`5.1`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('use-of-platform-sub-1')}`}
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`5.2`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('use-of-platform-sub-2')}`}
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`5.3`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('use-of-platform-sub-3')}`}
              </AppText>
            </View>

            {renderVerticalSeparator(15)}
            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(i)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('use-of-platform-sub-3-1')}
                </AppText>
              </View>
            </View>
            {renderVerticalSeparator(15)}
            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(ii)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('use-of-platform-sub-3-2')}
                </AppText>
              </View>
            </View>

            {renderVerticalSeparator(15)}
            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(iii)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('use-of-platform-sub-3-3')}
                </AppText>
              </View>
            </View>

            {renderVerticalSeparator(15)}
            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(iv)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('use-of-platform-sub-3-4')}
                </AppText>
              </View>
            </View>

            {renderVerticalSeparator(15)}
            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(v)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('use-of-platform-sub-3-5')}
                </AppText>
              </View>
            </View>

            {renderVerticalSeparator(15)}
            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(vi)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('use-of-platform-sub-3-6')}
                </AppText>
              </View>
            </View>

            {renderVerticalSeparator(15)}
            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(vii)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('use-of-platform-sub-3-7')}
                </AppText>
              </View>
            </View>

            {renderVerticalSeparator(15)}
            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(viii)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('use-of-platform-sub-3-8')}
                </AppText>
              </View>
            </View>

            {renderVerticalSeparator(15)}
            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(ix)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('use-of-platform-sub-3-9')}
                </AppText>
              </View>
            </View>

            {renderVerticalSeparator(15)}
            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(x)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('use-of-platform-sub-3-10')}
                </AppText>
              </View>
            </View>

            {renderVerticalSeparator(15)}
            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(xi)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('use-of-platform-sub-3-11')}
                </AppText>
              </View>
            </View>

            {renderVerticalSeparator(15)}
            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(xii)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('use-of-platform-sub-3-12')}
                </AppText>
              </View>
            </View>
            {renderVerticalSeparator(15)}
            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(xiii)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('use-of-platform-sub-3-13')}
                </AppText>
              </View>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`5.4`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {t('use-of-platform-sub-5')}
              </AppText>
            </View>
          </View>
        </Container>

        <Container style={styles.container}>
          <AppText style={styles.containerHeaderText}>{`6. ${t(
            'intellectual-title'
          )}`}</AppText>
          <View style={styles.marginFromLeft}>
            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`6.1`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText>
                <AppText style={styles.containerItemText}>
                  {`${t('intellectual-sub-1-start')} `}
                </AppText>
                <AppText style={styles.containerItemTextBold}>
                  {`"${t('content')}" `}
                </AppText>
                <AppText style={styles.containerItemText}>
                  {`${t('intellectual-sub-1-contd')}`}
                </AppText>
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`6.2`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText>
                <AppText style={styles.containerItemText}>
                  {`${t('intellectual-sub-2-start')} `}
                </AppText>
                <AppText style={styles.containerItemTextBold}>
                  {`"${t('marks')}" `}
                </AppText>
                <AppText style={styles.containerItemText}>
                  {`${t('intellectual-sub-2-contd')}`}
                </AppText>
              </AppText>
            </View>
          </View>
        </Container>

        <Container style={styles.container}>
          <AppText style={styles.containerHeaderText}>{`7. ${t(
            'disclaimer-title'
          )}`}</AppText>
          <View style={styles.marginFromLeft}>
            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`7.1`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('disclaimer-sub-1')}`}
              </AppText>
            </View>

            {renderVerticalSeparator(15)}
            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(i)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('disclaimer-sub-1-1')}
                </AppText>
              </View>
            </View>
            {renderVerticalSeparator(15)}

            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(ii)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('disclaimer-sub-1-2')}
                </AppText>
              </View>
            </View>
            {renderVerticalSeparator(15)}

            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(iii)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('disclaimer-sub-1-3')}
                </AppText>
              </View>
            </View>
            {renderVerticalSeparator(15)}

            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(iv)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('disclaimer-sub-1-4')}
                </AppText>
              </View>
            </View>
          </View>
        </Container>

        <Container style={styles.container}>
          <AppText style={styles.containerHeaderText}>{`8. ${t(
            'limitation-title'
          )}`}</AppText>
          <View style={styles.marginFromLeft}>
            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`8.1`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText>
                <AppText style={styles.containerItemText}>
                  {`${t('limitation-sub-1-start')} `}
                </AppText>
                <AppText style={styles.containerItemTextBold}>
                  {`"${t('indemnitees')}" `}
                </AppText>
                <AppText style={styles.containerItemText}>
                  {`${t('limitation-sub-1-contd')}`}
                </AppText>
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`8.2`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('limitation-sub-2')}`}
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`8.3`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('limitation-sub-3')}`}
              </AppText>
            </View>
          </View>
        </Container>

        <Container style={styles.container}>
          <AppText style={styles.containerHeaderText}>{`9. ${t(
            'violation-title'
          )}`}</AppText>
          <View style={styles.marginFromLeft}>
            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`9.1`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('violation-sub-1')}`}
              </AppText>
            </View>
          </View>
        </Container>

        <Container style={styles.container}>
          <AppText style={styles.containerHeaderText}>{`10. ${t(
            'suspension-title'
          )}`}</AppText>
          <View style={styles.marginFromLeft}>
            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`10.1`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('suspension-sub-1')}`}
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`10.2`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('suspension-sub-2')}`}
              </AppText>
            </View>
          </View>
        </Container>

        <Container style={styles.container}>
          <AppText style={styles.containerHeaderText}>{`11. ${t(
            'juri-title'
          )}`}</AppText>
          <View style={styles.marginFromLeft}>
            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`11.1`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('juri-sub-1')}`}
              </AppText>
            </View>
          </View>
        </Container>

        <Container style={styles.container}>
          <AppText style={styles.containerHeaderText}>{`12. ${t(
            'grievance-title'
          )}`}</AppText>
          <View style={styles.marginFromLeft}>
            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`12.1`}</AppText>
              <AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemSubHeader}>
                  {`${t('grievance-sub-1-title')}`}
                </AppText>
                <AppText style={styles.containerItemSubData}>
                  {`${t('grievance-sub-1-data')}`}
                </AppText>
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`12.2`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('grievance-sub-2')}`}
              </AppText>
            </View>
          </View>
        </Container>

        <Container style={styles.container}>
          <AppText style={styles.containerHeaderText}>{`13. ${t(
            'communication-title'
          )}`}</AppText>
          <View style={styles.marginFromLeft}>
            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`13.1`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('communication-sub-1')}`}
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`13.2`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('communication-sub-2')}`}
              </AppText>
            </View>
          </View>
        </Container>

        <Container style={styles.container}>
          <AppText style={styles.containerHeaderText}>{`14. ${t(
            'general-title'
          )}`}</AppText>
          <View style={styles.marginFromLeft}>
            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`14.1`}</AppText>
              <AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemSubHeader}>
                  {`${t('general-sub-1-title')}`}
                </AppText>
                <AppText style={styles.containerItemSubData}>
                  {`${t('general-sub-1-data')}`}
                </AppText>
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`14.2`}</AppText>
              <AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemSubHeader}>
                  {`${t('general-sub-2-title')}`}
                </AppText>
                <AppText style={styles.containerItemSubData}>
                  {`${t('general-sub-2-data')}`}
                </AppText>
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`14.3`}</AppText>
              <AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemSubHeader}>
                  {`${t('general-sub-3-title')}`}
                </AppText>
                <AppText style={styles.containerItemSubData}>
                  {`${t('general-sub-3-data')}`}
                </AppText>
              </AppText>
            </View>
            {renderVerticalSeparator(15)}

            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`14.4`}</AppText>
              <AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemSubHeader}>
                  {`${t('general-sub-4-title')}`}
                </AppText>
                <AppText style={styles.containerItemSubData}>
                  {`${t('general-sub-4-data')}`}
                </AppText>
              </AppText>
            </View>
          </View>
        </Container>

        <Container style={styles.container}>
          <AppText style={styles.containerHeaderText}>{`15. ${t(
            'ip-title'
          )}`}</AppText>
          <View style={styles.marginFromLeft}>
            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.containerItemText}>{`15.1`}</AppText>
              <AppText style={styles.containerItemText}>{` `}</AppText>
              <AppText style={styles.containerItemText}>
                {`${t('ip-sub-1')}`}
              </AppText>
            </View>

            {renderVerticalSeparator(15)}
            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(i)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('ip-sub-1-1')}
                </AppText>
              </View>
            </View>
            {renderVerticalSeparator(15)}
            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(ii)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('ip-sub-1-2')}
                </AppText>
              </View>
            </View>

            {renderVerticalSeparator(15)}
            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(iii)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('ip-sub-1-3')}
                </AppText>
              </View>
            </View>
            {renderVerticalSeparator(15)}
            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(iv)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('ip-sub-1-4')}
                </AppText>
              </View>
            </View>

            {renderVerticalSeparator(15)}
            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(v)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('ip-sub-1-5')}
                </AppText>
              </View>
            </View>
            {renderVerticalSeparator(15)}
            <View style={styles.marginFromLeftDouble}>
              <View style={{flexDirection: 'row'}}>
                <AppText style={styles.containerItemText}>{'(vi)'}</AppText>
                <AppText style={styles.containerItemText}>{` `}</AppText>
                <AppText style={styles.containerItemText}>
                  {t('ip-sub-1-6')}
                </AppText>
              </View>
            </View>
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

export default TermsOfUse;
