import {Linking, Alert} from 'react-native';
export function setAuthToken(payload) {
  return {
    type: 'SET_AUTH_TOKEN',
    payload,
  };
}
