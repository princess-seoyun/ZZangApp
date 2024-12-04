import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import styles from '../styles/signupStyle'

const SignUpScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    if (!id || !password || !name || !email) {
      console.log('null 값 있음');
      return false;
    } else {
      try {
        const userData = {
          id: id,
          password: password,
          name: name,
          email: email
        };

        const response = await axios.post('http://127.0.0.1:8080/user/insert', userData, {
          headers: {
            'Content-Type': 'application/json', // json 으로 보낸다는 뜻
          },
        });

        if (response.status === 200 && response.data === "success") {
          console.log("회원가입 성공");
           navigation.navigate('Login');
        }
      } catch (error) {
        console.error('회원가입 요청 실패:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.subText}>아이디</Text>
        <TextInput
          style={styles.input}
          keyboardType="default"
          value={id}
          onChangeText={setId}
        />
        <Text style={styles.subText}>비밀번호</Text>
        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        <Text style={styles.subText}>이름</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.subText}>이메일</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnText}>회원가입</Text>
        </TouchableOpacity>

        <View style={styles.appContainer}>
          <Text style={styles.appName}>MeetApp</Text>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
