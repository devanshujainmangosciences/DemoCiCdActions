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
import * as actions from 'actions/appActions';
import styles from './styles';

const Registeration = ({
  handleUserRegisterationAction,
  loginData: {loading, isError, errorMessage, isSuccessful, successMessage},
}) => {
  const [registerationDetails, setRegisterationDetails] = useState({
    userName: null,
    email: null,
    mobile: null,
  });
  const [isLocalError, setIsLocalError] = useState(false);

  const handleRegisteration = () => {
    // const {userName, email, mobile} = registerationDetails;
    // if (!userName || !email || !mobile) {
    //   setIsLocalError(true);
    // } else {
    //   setIsLocalError(false);
    //   handleUserRegisterationAction(registerationDetails);
    // }
  };

  const handleChangeText = (type, text) => {
    setIsLocalError(false);
    if (type === 'username') {
      setRegisterationDetails({...registerationDetails, userName: text});
    } else if (type === 'email') {
      setRegisterationDetails({...registerationDetails, email: text});
    } else {
      setRegisterationDetails({...registerationDetails, mobile: text});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <View>
          <Image
            source={MangoSciencesIcon}
            resizeMode={'contain'}
            style={styles.image}
          />
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput
            onChangeText={(text) => handleChangeText('username', text)}
            style={styles.textInput}
            placeholder={'Enter your username'}
          />

          <TextInput
            onChangeText={(text) => handleChangeText('email', text)}
            style={styles.textInput}
            placeholder={'Enter your email'}
          />

          <TextInput
            onChangeText={(text) => handleChangeText('mobile', text)}
            style={styles.textInput}
            placeholder={'Enter your mobile number'}
            keyboardType={'numeric'}
          />
        </View>

        <View style={styles.errorContainer}>
          {isError && <Text style={styles.error}>{errorMessage}</Text>}
          {isSuccessful && <Text style={styles.error}>{successMessage}</Text>}
        </View>

        <View style={styles.loginButtonContainer}>
          <TouchableOpacity
            onPress={() => handleRegisteration()}
            style={[
              styles.loginButton,
              isLocalError && {borderWidth: 2, borderColor: 'red'},
            ]}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.loginButtonText}>Create new user</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {loginData: state.login};
};

export default connect(mapStateToProps, actions)(Registeration);
