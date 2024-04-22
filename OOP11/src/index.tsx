import * as React from 'react';
import { Component } from 'react-simplified';
import { View, Text, Button, Alert, TextInput} from 'react-native';
import moji from 'moji-translate';

export class App extends Component {
  name: string = '';
  text: string = ''

  handleDifferentInterpretation = () => {
    this.forceUpdate() //Gives a new interpretation of the emoji (found on accident)
  };

  refresh = () => {
    this.name = ''
    this.forceUpdate()
  }

  render() {
    return (
      <Center>
      <Card title="Mag's Bubble Fish">
      <Text>{moji.translate(this.name)}</Text> <br></br>
      <TextInput style={{borderWidth: 4}} value={this.name} onChangeText={(text) => (this.name = text)}></TextInput>
      <Button title='Refresh' onPress={this.handleDifferentInterpretation}></Button>
      <Button title='Delete' onPress={this.refresh}></Button>
      </Card>
      </Center>
    );
  }
}
export class Center extends Component {
  render() {
    return (
      <View style={{ 
      flex: 10, //I should probably use a stylesheet for this
      justifyContent: 'center',
      alignItems: 'center',
      borderTopLeftRadius: 1, 
      borderBottomRightRadius: 1, 
      borderRadius: 100
      }}>
        {this.props.children}
      </View>
    )
  }
 
}
export class Card extends Component <{title: string}> {
    render() {
    return (
      <View style={{ borderWidth: 1, margin: 2, borderRadius: 5 }}> 
        <Text style={{margin: 5, fontSize: 40}}>{this.props.title}</Text>
        <Text style={{margin: 2, fontSize: 20}}>{this.props.children}</Text>
      </View>
    )
  }
}


