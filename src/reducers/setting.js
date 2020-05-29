const initialState = {
  lang: 'English',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return {...state, lang: action.payload};
  }

  return state;
}
