import React, {Component} from 'react';
import "./TextInput.css";
import TextField from 'react-native-md-textinput';

class App extends React.Component {
  render() {
    return (
      <ScrollView>
        <TextField label={'Product Name'} highlightColor={'#00BCD4'} />
      </ScrollView>
      <ScrollView>
        <TextField label={'Product Description'} highlightColor={'#00BCD4'} />
      </ScrollView>
    );
  }
}