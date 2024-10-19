import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Header } from '../../components/atoms';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Header title='Profile' subtitle='Profile Page'/>
      <Text>Welcome to the Profile Screen!</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
