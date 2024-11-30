import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

import axios from 'axios';
import styles from '../styles/signupStyle'

const SignUpScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    if(!id || !password || !name || !email) {
      console.log('null  값 있음');
      return false;
    } else {
      try {
        const response  = await axios.post('http://127.0.0.1:8080/users/signup', {
          id,
          password,
          name,
          email,
        });

        if (response.status === 200) {
          console.log("success");
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text
          style={styles.subText}>
          아이디
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="default"
          value={id}
          onChangeText={setId}
        />
        <Text
          style={styles.subText}>
          비밀번호
        </Text>
        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        <Text
          style={styles.subText}>
          이름
        </Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <Text
          style={styles.subText}>
          이메일
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnText}>회원가입</Text>
        </TouchableOpacity>

        <View
          style={styles.appContainer}>
          <Text
            style={styles.appName}>
            MeetApp
          </Text>
        </View>
      </View>
      {/* 회원가입하는 API 생성 후 보내야 함 */}
    </View>
  );
};



export default SignUpScreen;
