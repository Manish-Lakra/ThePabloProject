import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Image, TouchableOpacity,Alert, TextInput, ScrollView } from 'react-native';
import Utility from '../Utility'
import { StackActions, NavigationActions } from 'react-navigation';


export default class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            Uid: '',
            Name: '',
            Email: '',
            Password: '',
            Phone: '',
        }
    }

    checkValidation = () => {
        const { Name, Email, Password, Phone } = this.state
        if (!Name || !Email || !Password || !Phone) {
          return false;
        } else
          return true;
      }

      registerUser = () => {
        Utility.sinstance.saveUser(this.state.Email, this.state);
        Utility.sinstance.setSession(this.state.Email, true);
        Utility.sinstance.saveLastUser(this.state.Email);
        this.resetStack()
      }

      resetStack=()=>{
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],
          });
          this.props.navigation.dispatch(resetAction);
    }


    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps='handled'
    >      
        
          
    
          <View style={styles.container}>

          <View style={{ flex: 0.8 }}>
            <TextInput style={styles.textinput}
              placeholder='Name '
              onChangeText={(Name) => this.setState({ Name })} />

            <TextInput style={styles.textinput}
              placeholder='Email '
              onChangeText={(Email) => this.setState({ Email })} />


            <TextInput secureTextEntry={true} style={styles.textinput}
              placeholder='Password '
              onChangeText={(Password) => this.setState({ Password })} />

            <TextInput style={styles.textinput}
              placeholder='Phone '
              onChangeText={(Phone) => this.setState({ Phone })} />




            <View style={{ flex: 0.2, justifyContent:'center', alignItems:'center' }}>
              <TouchableOpacity style={styles.button}
                onPress={() => {

                  if (!this.checkValidation()) {
                    Alert.alert('All Fields are Mandatory')
                    return
                  }
                  this.registerUser();
                //   this.props.navigation.navigate('SecurityQuestions', {
                //     Name: this.state.Name,
                //     Email: this.state.Email,
                //     Password: this.state.Password,
                //     Phone: this.state.Phone
                //   })
                }}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>SignUp</Text>
              </TouchableOpacity>

            </View>

          </View>
          </View>
     
        
   
      </ScrollView>
   
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    textinput: {
    padding: 15,
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: 'gray',
    marginTop: 30,
    margin: 20,
    borderRadius: 10,
},

    button: {
        backgroundColor: '#266aef',
        borderRadius: 10,
        width: 200,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
    }


});

