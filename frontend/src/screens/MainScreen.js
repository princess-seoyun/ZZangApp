import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import axios from 'axios';
import styles from '../styles/loginStyle'

const MainScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text
          style={styles.title}>
          Main
        </Text>
      </View>
    </View>
  );
};

export default MainScreen;
