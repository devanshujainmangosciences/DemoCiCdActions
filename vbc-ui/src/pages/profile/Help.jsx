/*
Help component is used for patient to display question and answer

SubComponents:-  Search=> used to filter accordationData
                  CustomAccordation+> Display Accordation Data
                    ContactUs=> Display and record contact form data
*/

import {HelpIcon} from '@/assets/icons';
import CustomAccordation from '@/components/CustomAccordation';
import Search from '@/components/Search';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import HelpDataPatient from '../../assets/json/helpDataPatient.json';
import HelpDataApplicant from '../../assets/json/helpDataApplicant.json';
import ContactUs from './children/ContactUs';
import {SELECTED_ROLE_NAME} from '../../constants';
import {secureLocalStorage} from '@/services/web.storage';

const Help = () => {
  const {t} = useTranslation(['help']);
  const [searchKey, setSearchKey] = useState('');
  const [HelpData, sethelpData] = useState([]);
  const userSelectedRole = secureLocalStorage.getItem(SELECTED_ROLE_NAME);

  useEffect(() => {
    // console.log('userSelectedRole=>', userSelectedRole);
    if (userSelectedRole === 'applicant') sethelpData(HelpDataApplicant);
    else sethelpData(HelpDataPatient);
  }, []);

  /**
   * The function sets the search key to the provided value.
   */
  const onSearchChange = (value) => {
    setSearchKey(value);
  };

  /**
   * This function filters data based on a search key by searching through the question, answer, and
   * header properties of each object in an array.
   * @returns The function `filterData` is returning an array of objects that match the search criteria.
   * The objects in the array are filtered based on whether their `questionList` property contains any
   * questions or answers that match the `searchKey` provided. If a match is found, the object is added
   * to the `filteredData` array.
   * @param {Array} HelpData
   */
  const filterData = (HelpData) => {
    let filteredData = [];
    HelpData &&
      HelpData.map((data) => {
        const questionsList = data.questionList;
        const header = data?.header;
        const filterDataInQuestion = questionsList.filter((question) => {
          const dataToSearchIn = question.question + question.answer + header;
          return dataToSearchIn.toLowerCase().includes(searchKey.toLowerCase());
        });

        if (filterDataInQuestion && filterDataInQuestion.length > 0) {
          let recievedData = {...data};
          recievedData['questionList'] = filterDataInQuestion;

          filteredData.push(recievedData);
        }
      });

    return filteredData;
  };

  return (
    <>
      <div className="title-container">
        <div className="page-icon bg-patient">
          <HelpIcon fill={'#FFFFFF'} />
        </div>
        <div className="page-title text-capitalize">{t('help')}</div>
      </div>
      <div className="patient-help row">
        <div className="questions-area col col-lg-8 col-md-12">
          <div className="search-bar-help mb-3">
            <Search
              searchKey={t('search')}
              placeHolder={t('search')}
              searchCallback={onSearchChange}
              value={searchKey}
            />
          </div>
          <div>
            <CustomAccordation accordationData={filterData(HelpData)} />
          </div>
        </div>
        <div className="contact-us col">
          <ContactUs />
        </div>
      </div>
    </>
  );
};

export default Help;
