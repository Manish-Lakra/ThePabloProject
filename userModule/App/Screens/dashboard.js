import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import Utility from '../Utility'
import { StackActions, NavigationActions } from 'react-navigation';

export default class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
      email: '',
      phone: '',
      userimage: '',
        }
    }


    componentDidMount() {

        var thispage = this
        Utility.sinstance.getLastUser().then((email) => {
            Utility.sinstance.getUser(email).then((mUser) => {
                console.log(mUser)

                thispage.setState({
                    email: mUser.Email,
                    name: mUser.Name,
                    phone: mUser.Phone,
                })
            })
        })
    }




    logoutPressed = () => {
        Utility.sinstance.saveLastUser(null);
        Utility.sinstance.setSession(this.state.email, false);
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
            <View style={styles.container}>
                <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <Image style={{ width: 150, height: 150, borderRadius: 150 / 2, margin: 30, alignSelf: 'flex-start' }}
                            source={
                                this.state.userimage == '' ? require('../Res/icons/user.png') : this.state.userimage
                            }
                        />
                        <Button
                            title="Take Photo"
                            style={{ margin: 20 }}
                            onPress={() => {
                                Alert.alert('Photo liberary open')
                            }}
                        />
                    </View>
                </View>



                <View style={{ flex: 0.4, justifyContent: 'center' }}>
                    <Text style={styles.text}> Name: {this.state.name}.  </Text>
                    <Text style={styles.text}> Email : {this.state.email}.  </Text>
                    <Text style={styles.text}> Phone : {this.state.phone}.  </Text>
                </View>
                <View style={{ paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.logoutPressed();
                        }}
                        style={styles.button}

                    >
                        <Text style={{ fontSize: 20, color: 'white', fontWeight: '500' }} >LOGOUT</Text></TouchableOpacity>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    button: {
        backgroundColor: '#266aef',
        borderRadius: 10,
        width: 200,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
    },
    text: {
        fontSize: 18,
        padding: 5,
        marginTop: 20,
        justifyContent: 'space-between',
        marginTop: 5,
        alignSelf: 'center',


    }


});

