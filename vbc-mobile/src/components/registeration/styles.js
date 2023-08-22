import {StyleSheet} from 'react-native';
import ThemeColors from 'constants/Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {height: 100, width: 200},
  loginButtonContainer: {
    flex: 0.25,
    justifyContent: 'center',
  },
  loginButton: {
    borderRadius: 5,
    backgroundColor: ThemeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 50,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 2,
  },
  loginImageContainer: {},
  loginInputContainer: {
    flex: 0.65,
  },
  errorContainer: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
    width: 300,
    height: 50,
    borderColor: ThemeColors.primary,
  },
  loginContainer: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 450,
    width: 400,
    borderRadius: 10,
    borderColor: ThemeColors.primary,
  },
  forgotPasswordContainer: {
    paddingRight: 50,
    flex: 0.15,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  error: {
    color: 'red',
  },
});
