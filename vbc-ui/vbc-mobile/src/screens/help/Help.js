/**
 * Help screen component
 */
import React, {useState} from 'react';
import {View, Image, ScrollView, Linking} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Config from 'react-native-config';
import {
  ExpandableItem,
  AppText,
  Button,
  Container,
  TextInput,
  Loader,
  SearchInput,
} from 'components';
import {help} from 'assets/icons';
import {Theme} from 'constants';
import {helpData} from './helpData';
import {helpDataApplicant} from './helpDataApplicant';
import {contactSupportApiCall} from 'apis';
import {getUserRole} from 'utils';
import styles from './styles';

const Help = () => {
  const {t} = useTranslation(['mobileHelp', 'validationMessages']);
  const {loginData, userPermissions} = useSelector((state) => state.login);
  const {access_token} = loginData;

  const initialFormFieldsState = {subject: '', message: ''};
  const {navigate} = useNavigation();
  const [loading, setLoading] = useState(false);
  const [contactSupportError, setContactSupportError] = useState('');
  const [searchKey, setSearchKey] = useState('');

  const [formFields, setFormFields] = useState(initialFormFieldsState);

  const loggedInUserRole = getUserRole(userPermissions?.data);
  const isApplicant = loggedInUserRole === 'applicant';

  const handleChangeText = (type) => (value) => {
    setFormFields({...formFields, [type]: value});
  };

  /** contact support service */
  const callContactSupportService = async (formFields) => {
    let apiBody = {
      body: formFields.message,
      subject: formFields.subject,
    };
    const data = await contactSupportApiCall(apiBody, access_token);
    return data;
  };

  // when user clicks on send contact us inquiry
  const handlePressSend = async () => {
    setLoading(true);
    const {apiError} = await callContactSupportService(formFields);
    if (apiError) {
      setLoading(false);
      setContactSupportError(t('validationMessages:somethingWentWrong'));
    } else {
      setLoading(false);
      navigate('OthersScreen');
    }
  };

  // when user types in search input to search for a help topic
  const onSearchChange = (value) => {
    setSearchKey(value);
  };

  // filters data of questions based on user typed search string
  const filterData = (helpData) => {
    let filteredData = [];
    helpData &&
      helpData.map((data) => {
        const questionsList = data.questionList;
        const filterDataInQuestion = questionsList.filter((question) => {
          return (
            question.question.toLowerCase().includes(searchKey.toLowerCase()) ||
            question.answer.toLowerCase().includes(searchKey.toLowerCase())
          );
        });
        if (filterDataInQuestion && filterDataInQuestion.length > 0) {
          let recievedData = {...data};
          recievedData['questionList'] = filterDataInQuestion;

          filteredData.push(recievedData);
        }
      });

    return filteredData;
  };

  const handleUrl = () => {
    Linking.openURL(Config.MANGO_CANCER_CARE_URL);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContentContainer}
      style={styles.scrollContainer}>
      <Container style={styles.containerContainer}>
        <View style={styles.containerHeadingContainer}>
          <Image
            source={help}
            resizeMode={'center'}
            style={styles.headingIcon}
          />
          <AppText style={styles.containerHeading}>{t('help')}</AppText>
        </View>
        <SearchInput handleOnChangeText={onSearchChange} />
        {filterData(isApplicant ? helpDataApplicant : helpData).map(
          (item, index) => {
            if (item) {
              return (
                <View style={styles.expandableItemContainer} key={index}>
                  <ExpandableItem
                    heading={item.header}
                    headingBgColor={Theme.blueGreen}>
                    <View style={styles.expandableItemChildContainer}>
                      {item.questionList.map((question, index) => {
                        return (
                          <View style={styles.innerItem} key={index}>
                            <ExpandableItem
                              heading={question.question}
                              headingBgColor={Theme.blueGreen}>
                              <View
                                style={[
                                  styles.innerExpandableItemChildContainer,
                                ]}>
                                <AppText style={styles.answerStyles}>
                                  {question.answer}
                                </AppText>
                              </View>
                            </ExpandableItem>
                          </View>
                        );
                      })}
                    </View>
                  </ExpandableItem>
                </View>
              );
            }
          }
        )}
      </Container>
      <Container style={styles.containerContainer}>
        <View style={{alignItems: 'center'}}>
          <AppText style={styles.needMore}>{t('needMoreInformation')}</AppText>
          <AppText style={styles.cantFind}>{t('cantFind')}</AppText>
          <AppText style={styles.callUs}>{t('callUs')}</AppText>
          <AppText>
            <AppText style={styles.visitUs}>{t('visitUs')}</AppText>
            <AppText style={styles.visitUs}>{` `}</AppText>
            <AppText onPress={handleUrl} style={styles.url}>
              {t('url')}
            </AppText>
          </AppText>
        </View>
        <View style={styles.separator} />
        <View style={{alignItems: 'center'}}>
          <AppText style={styles.needMore}>{t('dropUs')}</AppText>
        </View>
        <TextInput
          value={formFields.subject}
          placeholder={t('subject')}
          style={styles.textInputContainer}
          onChangeText={handleChangeText('subject')}
        />
        <TextInput
          value={formFields.message}
          placeholder={t('message')}
          style={styles.textInputContainerMessage}
          onChangeText={handleChangeText('message')}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
        />

        <AppText style={styles.apiErrorText}>{contactSupportError}</AppText>
      </Container>

      <Button
        disabled={!formFields.subject.trim() || !formFields.message.trim()}
        style={styles.buttonContainer}
        onPressEvent={handlePressSend}
        label={t('send')}
        isLoading={loading}
      />
    </ScrollView>
  );
};

export default Help;
