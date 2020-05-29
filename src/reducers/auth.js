const initialState = {
  isLogged: false,
  deviceID: '',
  model: '',
  systemVersion: '',
  token: '',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_AUTH_TOKEN':
      return {...state, ...action.payload};
  }

  return state;
}
