import * as types from './../action/actionTypes';

const initialstate = {
  user: undefined,
  loading: false,
  successAck: null,
  errorMessage: null
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case `${types.SET_LOGIN}_PENDING`:
      return {
        ...state,
        successAck: null,
        loading: true,
        errorMessage: null
      }
    case `${types.SET_LOGIN}_FULFILLED`:
      return {
        ...state,
        loading: false,
        user: action.payload,
      }
    case `${types.SET_LOGIN}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      }


    case `${types.LOGIN}_PENDING`:
      return {
        ...state,
        successAck: null,
        loading: true,
        errorMessage: null
      }
    case `${types.LOGIN}_FULFILLED`:
      return {
        ...state,
        successAck: action.payload.successAck,
        loading: false,
        user: action.payload,
      }
    case `${types.LOGIN}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      }

    case `${types.LOGOUT}_PENDING`:
      return {
        ...state,
        errorMessage: null
      }
    case `${types.LOGOUT}_FULFILLED`:
      return {
        ...state,
        user: undefined,
      }
    case `${types.LOGOUT}_REJECTED`:
      return {
        ...state,
      }
    default:
      return state;
  }
};
