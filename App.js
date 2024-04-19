import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/reducers/PostReducer';
import { NavigationContainer } from '@react-navigation/native';
import TabBar from './src/components/TabBar';
import { composeWithDevTools } from 'remote-redux-devtools';


const composeEnhancers = composeWithDevTools({
  realtime: true,
  name: 'Your Instance Name',
  hostname: 'localhost',
  port: 1024 // the port your remotedev server is running at
})

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabBar />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
