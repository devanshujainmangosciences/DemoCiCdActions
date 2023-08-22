/**
 * Applicant Overview screen styles definition.
 */

import {StyleSheet} from 'react-native';
import {dynamicSize, fontSizes, fontFamily, dynamicSizeByOs} from 'utils';
import {Theme} from 'constants';

export default StyleSheet.create({
  container: {
    backgroundColor: Theme.snow,
    paddingHorizontal: dynamicSize(20),
    paddingTop: dynamicSizeByOs(60),
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: Theme.snow,
  },
  fullPageLoaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerOne: {
    height: dynamicSize(260),
    // marginVertical: dynamicSize(10),
  },
  containerOneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerOneHeading: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamily.medium,
    color: Theme.lightTextColor,
  },
  heading: {
    fontSize: fontSizes.small,
    fontFamily: fontFamily.medium,
    color: Theme.lightTextColor,
    marginTop: dynamicSize(20),
  },
  value: {
    fontSize: fontSizes.small,
    fontFamily: fontFamily.regular,
    color: Theme.lightTextColor,
    marginTop: dynamicSize(3),
  },
  valuesContainer: {
    marginTop: dynamicSize(10),
  },
  buttonContainer: {
    height: dynamicSize(45),
    width: dynamicSize(290),
    alignItems: 'center',
    marginVertical: dynamicSize(40),
    borderRadius: 5,
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  buttonIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    width: 24,
    borderRadius: 14,
    backgroundColor: Theme.snow,
    position: 'absolute',
    right: 20,
  },
  buttonIcon: {
    fontSize: fontSizes.small,
    color: Theme.currentStatusColor,
  },
  buttonText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.snow,
    alignSelf: 'center',
  },
  applicantContainer: {
    marginBottom: dynamicSize(30),
    width: '100%',
  },
});
