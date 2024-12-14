import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, SafeAreaView, Image, Platform } from 'react-native';
import axios from 'axios';
import styles from '../styles/loginStyle';
import NaverLogin from '@react-native-seoul/naver-login';

const LoginScreen = ({ navigation }) => {

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const idInputRef = useRef(null);
  const pwInputRef = useRef(null);

  const handleSubmit = async () => {
    if (!id) {
      Alert.alert('입력 오류', '아이디를 입력하세요', [
        { text: '확인', onPress: () => idInputRef.current?.focus() },
      ]);
      return false;
    } else if (!password) {
      Alert.alert('입력 오류', '비밀번호를 입력하세요', [
        { text: '확인', onPress: () => pwInputRef.current?.focus() },
      ]);
      return false;
    } else {
      try {
        const loginData = { id, password };
        const response = await axios.post('http://127.0.0.1:8080/user/login', loginData, {
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200 && response.data === "success") {
          navigation.navigate('Main');
        } else {
          Alert.alert("로그인 실패", "아이디나 비밀번호를 확인해주세요.");
        }
      } catch (error) {
        console.error('로그인 요청 실패:', error);
        Alert.alert("로그인 요청 실패", "서버와의 연결이 실패했습니다.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.title}>LOGIN</Text>
        <Text style={styles.text}>Welcome to the MeetApp</Text>

        <TextInput
          ref={idInputRef}
          style={styles.input}
          placeholder="아이디를 입력하세요"
          keyboardType="default"
          value={id}
          onChangeText={setId}
        />
        <TextInput
          ref={pwInputRef}
          style={styles.input}
          placeholder="비밀번호를 입력하세요"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.row}>
          <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.btnText}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.btnText2}>회원가입</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.appContainer}>
          <Text style={styles.appName}>MeetApp</Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
