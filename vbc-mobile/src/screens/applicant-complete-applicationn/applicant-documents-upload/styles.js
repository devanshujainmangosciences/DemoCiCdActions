/**
 * Applicant document upload screen styles definition.
 */
import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {fontFamily, fontSizes} from 'utils';
import {dynamicSize} from 'utils/Resize';

export default StyleSheet.create({
  view: {
    paddingTop: dynamicSize(40),
    paddingHorizontal: dynamicSize(20),
    alignItems: 'center',
  },
  viewStyle: {
    backgroundColor: Theme.snow,
  },
  button: {
    height: dynamicSize(45),
    width: dynamicSize(130),
    alignItems: 'center',
    marginTop: dynamicSize(10),
    borderRadius: 5,
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonCancel: {
    height: dynamicSize(45),
    width: dynamicSize(130),
    alignItems: 'center',
    marginTop: dynamicSize(10),
    borderRadius: 5,
    backgroundColor: Theme.darkPrimary,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    height: dynamicSize(600),
    marginVertical: dynamicSize(10),
  },
  textInputContainer: {
    marginTop: dynamicSize(20),
    width: dynamicSize(291),
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // marginTop: dynamicSize(30),
  },
  documentListContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: dynamicSize(30),
  },
  buttonText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.snow,
  },
  expandableItemContainer: {
    marginVertical: dynamicSize(10),
  },
  expandableItemChildContainer: {
    backgroundColor: Theme.lightBlueGreen,
    borderWidth: 1,
    borderColor: Theme.blueGreen,
    paddingHorizontal: dynamicSize(10),
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  detailsContainer: {
    marginVertical: dynamicSize(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  details: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
  },

  expandableChildrenButton: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.snow,
  },

  apiErrorText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.error,
    textAlign: 'center',
    marginTop: dynamicSize(3),
    marginBottom: dynamicSize(20),
    fontStyle: 'italic',
  },
  documentsContainer: {
    marginBottom: dynamicSize(20),
    borderColor: Theme.clinicalHomescreenBorder,
    borderWidth: 0.5,
    padding: dynamicSize(20),
    borderRadius: dynamicSize(24),
  },
  expandableChildrenButtonContainer: {
    height: dynamicSize(35),
    width: dynamicSize(80),
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Theme.darkPrimary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  expandableChildrenButtonContainerDelete: {
    height: dynamicSize(35),
    width: dynamicSize(80),
    alignItems: 'center',
    marginLeft: dynamicSize(20),
    borderRadius: 5,
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: dynamicSize(20),
    marginTop: dynamicSize(10),
  },
  financialDocumentText: {
    marginLeft: dynamicSize(10),
  },
  fullPageLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  note: {
    fontSize: fontSizes.small,
    fontFamily: fontFamily.light,
    color: Theme.lightTextColor,
    marginVertical: dynamicSize(10),
  },
  requiredDocumentContainer: {marginVertical: dynamicSize(10)},
  requiredDocumentItemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginVertical: dynamicSize(10),
    borderColor: Theme.grey,
    borderWidth: dynamicSize(0.5),
    borderRadius: dynamicSize(5),
    paddingVertical: dynamicSize(10),
    paddingHorizontal: dynamicSize(15),
  },
  headerLeftIcon: {
    width: dynamicSize(25),
    height: dynamicSize(25),
  },
  rightMarkIcon: {
    width: dynamicSize(19),
    height: dynamicSize(19),
  },
  imageView: {flex: 0.3, alignItems: 'flex-end'},
  documentName: {flex: 0.7},
  requiredDocumentText: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamily.regular,
    color: Theme.lightTextColor,
  },
  requiredDocumentStatusText: {
    fontSize: fontSizes.mini,
    fontFamily: fontFamily.regular,
    color: Theme.snow,
  },
  requiredDocumentStatusContainer: {
    backgroundColor: Theme.pendingStatus,
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  requiredDocumentStatusContainerUploaded: {
    backgroundColor: Theme.uploadedStatus,
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
    flex: 0.4,
  },
  requiredDocumentsHeadingText: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamily.medium,
    color: Theme.lightTextColor,
    flex: 0.4,
  },
  startApplicationButton: {
    flexDirection: 'row',
    backgroundColor: Theme.primary,
    height: dynamicSize(40),
    width: dynamicSize(260),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: dynamicSize(30),
    marginBottom: dynamicSize(10),
  },
  startApplication: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.snow,
  },
  buttonIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    width: 24,
    borderRadius: 14,
    backgroundColor: Theme.snow,
    position: 'absolute',
    right: 10,
  },
  buttonIcon: {
    fontSize: fontSizes.small,
    color: Theme.currentStatusColor,
  },
});
