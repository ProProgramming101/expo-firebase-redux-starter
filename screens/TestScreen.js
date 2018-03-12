import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from 'react-native';
import { TestComponent } from './../components/AppComponents';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { setFavoriteAnimal, watchPersonData } from './../redux/app-redux';

const mapStateToProps = (state) => {
  return {
    favoriteAnimal: state.favoriteAnimal,
    personData: state.personData,
  };
}

const mapDispatchToProps = (dispatch) => {
  return { 
    setFavoriteAnimal: (text) => { dispatch(setFavoriteAnimal(text)) },
    watchPersonData: () => { dispatch(watchPersonData()) },
  };
}

class TestScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      favoriteAnimal: this.props.favoriteAnimal,
    }

    this.props.watchPersonData();
  }

  onSignoutPress = () => {
    firebase.auth().signOut();
  }

  onSetFavoriteAnimalPress = () => {
    this.props.setFavoriteAnimal(this.state.favoriteAnimal);
  }

  render() {
    return (
      <View style={{paddingTop:20}}>
        <Button title="Signout" onPress={this.onSignoutPress} />
        <Text>{this.props.favoriteAnimal}</Text>

        <TextInput style={{borderWidth:1, width: 200, height: 40}}
          value={this.state.favoriteAnimal}
          onChangeText={(text) => { this.setState({favoriteAnimal: text}) }}
        />
        <Button title="Set Favorite Animal" onPress={this.onSetFavoriteAnimalPress} />

        <Text>{this.props.personData.firstName}</Text>
        <Text>{this.props.personData.lastName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(TestScreen);
