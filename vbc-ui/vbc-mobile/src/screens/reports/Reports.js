/**
 * Screen component for Reports
 */
import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Button, TextInput, Loader, Container } from 'components';
import NoData from 'components/no-data/NoData';

import { downArrorIcon } from 'assets/icons';
import { getReportsApiCall } from 'apis';
import { setDropdownSelectedValue } from 'actions';
import styles from './styles';
import ReportItem from './ReportItem';
import { REPORT_TYPES } from 'constants/appConstants';

const categoryTypes = {
  radiologies: 'Radiology',
  notes: 'Clinical Notes',
  'radiation-therapy': 'Radiation Therapy',
  'other-treatment': 'Other Treatments',
  surgery: 'Surgery',
  'other-tests': 'OtherTests',
};

const staticMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const Reports = ({
  route: {
    params: { reportType },
  },
  navigation,
}) => {
  const initialFormFieldsState = {
    year: null,
    month: null,
  };
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state.login);
  const { syncStatus } = useSelector((state) => state.reports);

  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState(initialFormFieldsState);
  const [reportsData, setReportsData] = useState({});
  const { t } = useTranslation(['labReports']);

  const [years, setYears] = useState([]);

  const [months, setMonths] = useState([]);

  const [categories, setCategories] = useState([]);

  /** calling api to fetch reports */
  const fetchReportsService = async () => {
    setLoading(true);
    const { access_token } = loginData;

    const { apiResponse, apiError } = await getReportsApiCall(
      reportType,
      access_token
    );
    if (apiResponse) {
      setReportsData(apiResponse.data);
      setLoading(false);
    } else if (apiError) {
      setLoading(false);
    }
  };

  // set header title at runtime based on report type
  const setHeaderTitle = () => {
    switch (reportType) {
      case REPORT_TYPES.LAB: {
        navigation.setOptions({ headerTitle: 'Lab Reports' });
        break;
      }
      case REPORT_TYPES.RADIOLOGIES: {
        navigation.setOptions({ headerTitle: 'Radiology' });
        break;
      }
      case REPORT_TYPES.SURGERY: {
        navigation.setOptions({ headerTitle: 'Surgery' });
        break;
      }
      case REPORT_TYPES.MEDICATION: {
        navigation.setOptions({ headerTitle: 'Medications' });
        break;
      }
      case REPORT_TYPES.OTHER_TESTS: {
        navigation.setOptions({ headerTitle: 'Other Tests' });
        break;
      }
      case REPORT_TYPES.RADIATION_THERAPY: {
        navigation.setOptions({ headerTitle: 'Radiation Therapy' });
        break;
      }
      case REPORT_TYPES.OTHER_TREATMENT: {
        navigation.setOptions({ headerTitle: 'Other Treatments' });
        break;
      }
      case REPORT_TYPES.CLINICAL_NOTES: {
        navigation.setOptions({ headerTitle: 'Clinical Notes' });
        break;
      }
      default: {
        return '';
      }
    }
  };

  useEffect(() => {
    setHeaderTitle();
  }, []);

  /** call api service to fetch reports data */
  useEffect(() => {
    if (loginData) {
      dispatch(setDropdownSelectedValue(null));
      fetchReportsService();
    }
  }, [loginData]);

  /**
   * Sort array of categories alphabatically
   * @param {Array} categories
   * @returns {Array}
   */
  const sortArrayOfCategoriesAlphabatically = (arrayOfCategories) => {
    arrayOfCategories.sort(function (a, b) {
      var textA = a.title.toUpperCase();
      var textB = b.title.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    return arrayOfCategories;
  };

  // fetch years, and then fetch months respective to each years and their respective categories
  useEffect(() => {
    if (
      reportsData &&
      Object.keys(reportsData).length > 0 &&
      reportsData['years']
    ) {
      let allYears = [];
      let allMonths = [];
      let allCategories = [];
      let values;
      Object.keys(reportsData['years']).map((item) => {
        allYears.push({
          id: item,
          value: item,
          total: reportsData['years'][item]['total'],
          name: `${item} (${reportsData['years'][item]['total']})`,
        });
      });
      if (allYears.length > 0) {
        values = {
          ...formFields,
          ['year']: allYears[0].value,
          ['year' + 'Name']: allYears[0].name,
        };
        setFormFields(values);
        setYears(allYears);
        Object.keys(reportsData['years'][allYears[0].value].months).map(
          (item) => {
            allMonths.push({
              id: item,
              value: item,
              name: `${item} (${reportsData['years'][allYears[0].value].months[item]['total']
                })`,
              total:
                reportsData['years'][allYears[0].value].months[item]['total'],
            });
            allMonths.sort(function (a, b) {
              return (
                staticMonths.indexOf(b.value) - staticMonths.indexOf(a.value)
              );
            });
          }
        );
        if (allMonths.length > 0) {
          values = {
            ...values,
            ['month']: allMonths.filter((item) => item.total > 0)[0].value,
            ['month' + 'Name']: allMonths.filter((item) => item.total > 0)[0]
              .name,
          };
          setFormFields(values);
          setMonths(allMonths);
          if (
            reportType === 'radiologies' ||
            reportType === 'notes' ||
            reportType === 'radiation-therapy' ||
            reportType === 'other-treatment' ||
            reportType === 'surgery' ||
            reportType === 'other-tests'
          ) {
            const totalReports =
              reportsData['years'][
                allYears.filter((item) => item.total > 0)[0].value
              ].months[allMonths.filter((item) => item.total > 0)[0].value]
                .total;
            setCategories([
              {
                title: categoryTypes[reportType],
                totalReports: totalReports,
              },
            ]);
          } else {
            let categories;
            for (var key in reportsData['years'][allYears[0].value].months) {
              if (
                reportsData['years'][allYears[0].value].months[key].total > 0
              ) {
                categories =
                  reportsData['years'][allYears[0].value].months[key]
                    .categories;
              }
            }

            //KEPT DELIBERATELY, MIGHT BE REQUIRED IN FUTURE
            // const categories =
            //   reportsData['years'][allYears[0].value].months[allMonths[0].value]
            //     .categories;

            Object.keys(categories).map((item) => {
              allCategories.push({
                title: item,
                totalReports: categories[item],
              });
            });
            setCategories(sortArrayOfCategoriesAlphabatically(allCategories));
          }
        }
      }
    }
  }, [reportsData]);

  /* when user changes year and month to filter reports, get month from respective years
   and then their respective reports */
  const handleChangeText = (type, inputType) => (value) => {
    let values;
    if (inputType === 'dropdown' && type === 'year') {
      let allMonths = [];
      Object.keys(reportsData['years'][value.id].months).map((item) => {
        allMonths.push({
          id: item,
          value: item,
          name: `${item} (${reportsData['years'][value.id].months[item]['total']
            })`,
          total: reportsData['years'][value.id].months[item]['total'],
        });
      });

      //Filtering based on year and month and setting respective data
      if (allMonths.length > 0) {
        allMonths.sort(function (a, b) {
          return staticMonths.indexOf(b.value) - staticMonths.indexOf(a.value);
        });
        values = {
          ...values,
          ['year']: value.id,
          ['year' + 'Name']: value.name,
          ['month']: allMonths.filter((item) => item.total > 0)[0].value,
          ['month' + 'Name']: allMonths.filter((item) => item.total > 0)[0]
            .name,
        };
        setFormFields(values);
        setMonths(allMonths);
      }
      setFormFields(values);
    } else if (inputType === 'dropdown' && type === 'month') {
      values = {
        ...formFields,
        [type]: value?.id,
        [type + 'Name']: value?.name,
      };
      setFormFields(values);
    }
  };

  // when user clicks on filter button
  const handlePressFilter = () => {
    if (
      reportType === 'radiologies' ||
      reportType === 'notes' ||
      reportType === 'radiation-therapy' ||
      reportType === 'other-treatment' ||
      reportType === 'surgery' ||
      reportType === 'other-tests'
    ) {
      const totalReports =
        reportsData['years'][formFields['year']]?.months[formFields['month']]
          ?.total;
      setCategories([
        {
          title: categoryTypes[reportType],
          totalReports: totalReports,
        },
      ]);
    } else {
      let allCategories = [];
      const categories =
        reportsData['years'][formFields['year']].months[formFields['month']]
          .categories;

      Object.keys(categories).map((item) => {
        allCategories.push({
          title: item,
          totalReports: categories[item],
        });
      });
      setCategories(sortArrayOfCategoriesAlphabatically(allCategories));
    }
  };

  // when user clicks on particular report item, navigate to report detail page
  const handlePressReportItem = (categoryName) => {
    navigate('ReportDetail', {
      month: formFields.month,
      year: formFields.year,
      category: categoryName,
      reportType: reportType,
    });
  };

  if (loading) {
    return (
      <View style={styles.fullPageLoadingContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContentContainer}
      style={styles.scrollContainer}>
      {syncStatus ? (
        <>
          {reportsData['years'] ? (
            <View style={styles.container}>
              <Container style={styles.containerContainer}>
                <TextInput
                  inputType={'dropdown'}
                  value={formFields.yearName}
                  dropdownValue={formFields.yearName}
                  dropdownItems={years}
                  required={true}
                  rightInputIcon={downArrorIcon}
                  placeholder={'Year'}
                  style={styles.textInputContainer}
                  onChangeText={handleChangeText('year', 'dropdown')}
                />
                <TextInput
                  inputType={'dropdown'}
                  value={formFields.monthName}
                  dropdownValue={formFields.monthName}
                  dropdownItems={months}
                  required={true}
                  rightInputIcon={downArrorIcon}
                  placeholder={'Month'}
                  style={styles.textInputContainer}
                  onChangeText={handleChangeText('month', 'dropdown')}
                />
                <Button
                  disabled={loading}
                  style={styles.buttonContainer}
                  onPressEvent={handlePressFilter}
                  label={t('filterNow')}
                />
              </Container>

              {categories?.length > 0 ? (
                categories.map((item, index) => {
                  if (item?.totalReports > 0) {
                    return (
                      <ReportItem
                        key={index}
                        item={item}
                        onPressReportItem={handlePressReportItem}
                        reportType={reportType}
                      />
                    );
                  } else {
                    return (
                      <NoData
                        showCompleteApplicationButton={false}
                        title={t('noReportsFound')}
                      />
                    );
                  }
                })
              ) : (
                <NoData
                  showCompleteApplicationButton={false}
                  title={t('noReportsFound')}
                />
              )}
            </View>
          ) : (
            <View style={styles.container}>
              <NoData
                showCompleteApplicationButton={false}
                title={t('informationNotAvailable')}
              />
            </View>
          )}
        </>
      ) : (
        <View style={styles.container}>
          <NoData
            showCompleteApplicationButton={false}
            title={t('noYearNote')}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Reports;
