/* eslint-disable react/no-string-refs */
import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  BackHandler,
  Image,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';
import Layout from '../../../constants/Layout';
import validate from '../../../util/validationWrapper';
import Toast, { DURATION } from 'react-native-easy-toast';
import { appImages } from '../../../assets/images';
import PasswordIcon from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../../constants/Colors'
import Colors from '../../../constants/Colors';


export default class LoginScreen extends React.Component {

  state = {
    email: 'admin@gmail.com',
    password: 'Simform.123',
    emailError: false,
    passwordError: false,
    errorMessage: null,
    showPassword: true
  }


  componentDidMount() {
    Keyboard.dismiss();
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    BackHandler.exitApp();
    return true;
  }


  componentDidUpdate(prevProps) {
    if (prevProps.successAck && !this.props.successAck) {
      this.refs.toast.show(this.props.successAck);
    }
  }

  //validate and set the value of text field  
  onChangeText = (field, value) => {
    this.setState({ [`${field}`]: value });
    const error = validate(field, value);
    this.setState({ [`${field}Error`]: error });
  }

  //visible password as a text field
  showPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  onLogin = () => {
    Keyboard.dismiss();
    const { email, password } = this.state;
    const emailError = validate("email", email);
    if (emailError) {
      this.emailRef.focus()
      this.setState({
        emailError,
        passwordError: false
      });
      return;
    }
    const passwordError = validate("password", password);
    if (passwordError) {
      this.passwordRef.focus();
      this.setState({
        password: null,
        emailError: false,
        passwordError
      });
      return;
    }
    this.setState({ emailError: false, passwordError: false, error: "" });
    this.props.onLogin(email, password);
  }

  render() {
    const {
      email,
      password,
      emailError,
      passwordError,
      showPassword } = this.state

    this.emailRef = React.createRef()
    this.passwordRef = React.createRef()
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ backgroundColor: '#ffff', flex: 1 }}>
          <View style={styles.square} />
          <View style={styles.triangleCornerTopRight} />
          <Image
            style={styles.avtar}
            source={appImages.profile}
          />
          <Text style={styles.loginText}>Login</Text>
          <View style={{ marginHorizontal: 30, marginTop: 30 }}>
            <Text style={[styles.fieldLabel, { color: emailError ? colors.red : colors.dividerColor }]}>Username</Text>
            <TextInput
              value={email}
              ref={ref => this.emailRef = ref}
              blurOnSubmit={false}
              returnKeyType='next'
              style={[styles.fieldValue, { borderBottomColor: emailError ? colors.red : colors.dividerColor }]}
              onChangeText={email => this.onChangeText('email', email)}
              onSubmitEditing={() => this.passwordRef.focus()}
            />
            {emailError && <Text style={styles.validationText}>{emailError}</Text>}
            <View style={{ marginTop: 12 }}>
              <Text style={[styles.fieldLabel, { color: passwordError ? colors.red : colors.dividerColor }]}>Password</Text>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  value={password}
                  ref={ref => this.passwordRef = ref}
                  secureTextEntry={showPassword}
                  style={[{ width: '90%', borderBottomColor: passwordError ? colors.red : colors.dividerColor }, styles.fieldValue]}
                  onChangeText={password => this.onChangeText('password', password)}
                  onSubmitEditing={this.onLogin}
                />
                {showPassword ?
                  <Image
                    style={styles.passwordEye}
                    source={appImages.hideEye}
                  /> :
                  <Image
                    style={styles.passwordEye}
                    source={appImages.eyeIcon}
                  />}
              </View>
              {passwordError && <Text style={styles.validationText}>{passwordError}</Text>}
            </View>
          </View>

          {this.props.errorMessage && <Text style={[styles.validationText, { textAlign: 'center', padding: 5 }]}>{this.props.errorMessage}</Text>}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={this.onLogin}
          >
            <Text style={styles.loginButtonText}>
              Login
              </Text>
          </TouchableOpacity>
          <Image
            style={styles.loginFooter}
            source={appImages.loginFooter}
          />
          <Toast
            ref="toast"
            style={{ backgroundColor: '#404040', borderRadius: 18 }}
            opacity={0.8}
            textStyle={{ color: 'white', paddingHorizontal: 10 }}
          />
        </View>
      </TouchableWithoutFeedback >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  square: {
    height: 130,
    backgroundColor: colors.primary,
  },
  triangleCornerTopRight: {
    width: '100%',
    borderTopWidth: 150,
    borderBottomWidth: 0,
    borderLeftWidth: Layout.window.width,
    borderLeftColor: 'transparent',
    borderStyle: 'solid',
    borderTopColor: colors.primary
  },
  avtar: {
    resizeMode: 'contain',
    position: 'absolute',
    top: 35,
    left: 10,
    width: 160,
  },
  loginText: {
    fontSize: 30,
    color: colors.black,
    fontWeight: 'bold',
    position: 'absolute',
    top: 250,
    left: 30
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '500'
  },
  fieldValue: {
    borderBottomWidth: 1,
    paddingLeft: 10,
    borderBottomColor: colors.dividerColor,
    fontSize: 16
  },
  loginFooter: {
    resizeMode: 'stretch',
    height: 100,
    width: Layout.window.width,
    position: 'absolute',
    bottom: 3
  },
  passwordEye: {
    height: 10,
    width: 10,
  },
  loginButton: {
    backgroundColor: colors.primary,
    width: '30%',
    alignSelf: 'flex-end',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginTop: 30
  },
  loginButtonText: {
    color: 'rgba(255,255,255, 0.7)',
    padding: 12,
    textAlign: 'center',
    fontSize: 15
  },
  validationText: {
    color: Colors.red,
    padding: 5
  }
});
