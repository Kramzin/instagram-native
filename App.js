import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase/app';
import LandingScreen from './components/auth/landing';
import RegisterScreen from './components/auth/register';
import LoginScreen from './components/auth/login';
import MainScreen from './components/main';
import AddScreen from './components/main/add';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';


const store = createStore(rootReducer, applyMiddleware(thunk))


const Stack = createStackNavigator();


export class App extends Component {
  constructor(props) {
    super()
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer >
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}
const firebaseConfig = {
  apiKey: "AIzaSyCsgBNMVFxxt3WO3FFo6HGSiLohrP6jFnU",
  authDomain: "instagram-native-170d8.firebaseapp.com",
  projectId: "instagram-native-170d8",
  storageBucket: "instagram-native-170d8.appspot.com",
  messagingSenderId: "778813947865",
  appId: "1:778813947865:web:77b9751e2d7ac7355923c8"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

export default App