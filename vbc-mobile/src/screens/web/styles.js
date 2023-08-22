/**
 * TODO. Needs to be removed.
 */
import {Platform, StyleSheet} from 'react-native';
import Theme from 'constants/Theme';
import {dynamicSizeByOs} from 'utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: dynamicSizeByOs(40),
  },
  logoutContainer: {
    height: 40,
    width: 100,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: Platform.OS === 'ios' ? 50 : 30,
    marginBottom: 20,
    marginRight: 20,
  },
});
