import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Utility from '../Utility'


export default class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            Email: '',
            Password: ''
        }
    }


    loginPressed(thisPage) {
        if (this.state.Email != '') {
            if (this.state.Password != '') {
                Utility.sinstance.getUser(thisPage.state.Email).then((mUser) => {
                    if (mUser != undefined && mUser != null) {
                        Utility.sinstance.setSession(this.state.Email, true);
                        Utility.sinstance.saveLastUser(this.state.Email);
                        this.props.navigation.navigate('DashBoard');
                    } else {
                        alert("Please enter correct user name and password.")
                    }

                })
            } else {
                alert("Please enter password")
            }
        } else {
            alert("Please enter email id.")
        }
    }



    render() {
        return (
            <View style={styles.container}>

                <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps='handled'
                >
                    <View style={styles.container}>
                        <View style={{ flex: 0.4 }}></View>
                        <View style={styles.lumoScreen}>
                            <TextInput onChangeText={(Email) => this.setState({ Email })}
                                placeholderTextColor="#266aef"
                                style={styles.textinput}
                                placeholder='Email'
                            />

                            <TextInput onChangeText={(Password) => this.setState({ Password })}
                                placeholderTextColor="#266aef"
                                style={styles.textinput}
                                placeholder='Password' />
                        </View>
                        <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={styles.button}
                                onPress={async () => {
                                    this.loginPressed(this);
                                }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>
                                    Login</Text>
                            </TouchableOpacity>
                            <Button
                                title='Signup'
                                onPress={() => { this.props.navigation.navigate('Signup') }}
                            />
                        </View>
                        <View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',

    },
    text: {
        padding: 20,
        fontSize: 20,
        paddingHorizontal: 40,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center'
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
        color: 'white'
    }

});

