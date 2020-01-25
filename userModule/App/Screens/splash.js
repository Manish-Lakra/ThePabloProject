import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import Utility from '../Utility'
import { StackActions, NavigationActions } from 'react-navigation';

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Login' })],
});

const resetActionForHome = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'DashBoard' })],
});

export default class Splash extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {

    setTimeout(() => {
      Utility.sinstance.getLastUser().then((emailid) => {
        if (emailid != undefined && emailid != null) {
          Utility.sinstance.getSession(emailid).then((isSessionActive) => {
            if (isSessionActive) {
              this.props.navigation.dispatch(resetActionForHome);
            } else {
              this.props.navigation.dispatch(resetAction);
            }
          })
        } else {
          this.props.navigation.dispatch(resetAction);
        }
      })
    }, 3000);
  }

 

  render() {
    return (
      <View style={styles.container}>
       <View>
                                    <Text style={{ fontSize: 35, fontWeight: '400', textAlign: 'center', paddingTop: 30,color: '#192A56' }}>Splash Screen</Text>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ fontSize: 20, paddingTop: 20, color: '#192A56'}}>Loading... </Text>
                                    </View>
                                </View>

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  welcome: {
    fontSize: 40,

    textAlign: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    fontStyle: 'italic',
    margin: 15,
    color: 'white',
    marginTop: 120,
  },
  instructions: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
  }
});