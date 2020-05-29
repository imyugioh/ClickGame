import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import {connect, Provider} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {createStore} from 'redux';

import {reducers} from './src/reducers';

import Main from './src/scenes/Main';
import Home from './src/scenes/Home';
import LevelSelect from './src/scenes/LevelSelect';
import SplashScreen from './src/scenes/Splash';
import Record from './src/scenes/Record';
import HowToPlay from './src/scenes/HowToPlay';
import commonStyles from './src/styles/common';
const store = createStore(reducers);
const RouterWithRedux = connect()(Router);

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //AsyncStorage.clear();
    AsyncStorage.getItem('@Sequent:hiscore')
      .then((stores) => {
        const hiscore = JSON.parse(stores);
        if (hiscore !== null) {
          store.dispatch({
            type: 'LOAD_SCORE',
            payload: hiscore,
          });
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root" hideNavBar style={commonStyles.rootScene}>
            <Scene
              key="splash"
              component={SplashScreen}
              initial
              panHandlers={null}
              duration="0"
            />
            <Scene
              key="home"
              component={Home}
              panHandlers={null}
              duration="0"
            />
            <Scene
              key="level"
              component={LevelSelect}
              panHandlers={null}
              duration="0"
            />
            <Scene
              key="main"
              component={Main}
              panHandlers={null}
              duration="0"
            />
            <Scene
              key="hiscore"
              component={Record}
              panHandlers={null}
              duration="0"
            />
            <Scene
              key="about"
              component={HowToPlay}
              panHandlers={null}
              duration="0"
            />
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}

export default App;
