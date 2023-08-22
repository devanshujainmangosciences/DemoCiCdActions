import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {MangoSciencesIcon} from 'assets/images';
import * as actions from 'actions';
import ThemeColors from 'constants/Theme';
import styles from './styles';

const ForgotPassword = ({
  resetPasswordAction,
  getApiAdminTokenAction,
  loginData: {loading, isError, errorMessage, isSuccessful, successMessage},
}) => {
  const [username, setUsername] = useState(null);
  const [isLocalError, setIsLocalError] = useState(false);

  /**
   * Is called when user clicks on reset password
   * Calling resetPasswordAction to invoke apis.
   */
  const handleResetPassword = () => {
    if (username) {
      setIsLocalError(false);
      resetPasswordAction(username);
    } else {
      setIsLocalError(true);
    }
  };

  // text input text change
  const handleChangeText = (text) => {
    setIsLocalError(false);
    setUsername(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <View style={styles.loginImageContainer}>
          <Image
            source={MangoSciencesIcon}
            resizeMode={'contain'}
            style={styles.image}
          />
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput
            onChangeText={(text) => handleChangeText(text)}
            style={[
              styles.textInput,
              isLocalError && {borderColor: ThemeColors.error},
            ]}
            placeholder={'Enter your username'}
          />
        </View>

        <View style={styles.errorContainer}>
          {isError && <Text style={styles.error}>{errorMessage}</Text>}
          {isSuccessful && <Text style={styles.error}>{successMessage}</Text>}
        </View>

        <View style={styles.loginButtonContainer}>
          <TouchableOpacity
            onPress={handleResetPassword}
            style={styles.loginButton}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.loginButtonText}>Reset Password</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  loginData: state.login,
});

export default connect(mapStateToProps, actions)(ForgotPassword);
