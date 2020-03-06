import { connect } from 'react-redux';
import LoginScreen from './LoginScreen';
import * as authenticationActions from '../../../redux/action/authenticationActions'
import { navigate } from '../../../util/navigationServices';

export default connect(
    ({ user }) => ({
        successAck: user.successAck,
        errorMessage: user.errorMessage,
    }),
    dispatch => ({
        onLogin: (email, password) => {
            dispatch(authenticationActions.login(email, password))
                .then(() => navigate('App'))
                .catch(() => { });
        },
    }),
)(LoginScreen);
