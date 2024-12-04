import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import axios from 'axios';
import styles from '../styles/loginStyle'

const SignUpScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const idInputRef = useRef(null); // TextInput 참조 생성
  const pwInputRef = useRef(null);

  const handleSubmit = async () => {
    if (!id) {
      Alert.alert('입력 오류', '아이디를 입력하세요',
        [
          {
            text:'확인',
            onPress: () => idInputRef.current?.focus(), // 커셔 이동
          },
          { cancelable: false }
        ]);
      focus(id);
      return false;
    } else if(!password) {
      Alert.alert('입력 오류', '비밀번호를 입력하세요',
        [
          {
            text:'확인',
            onPress: () => pwInputRef.current?.focus(), // 커셔 이동
          },
          { cancelable: false }
        ]);
      focus(id);
      return false;
    } else {
      try {
        const loginData = {
          id: id,
          password: password,
        };

        const response = await axios.post('http://127.0.0.1:8080/user/login', loginData, {
          headers: {
            'Content-Type': 'application/json', // json 으로 보낸다는 뜻
          },
        });

        if (response.status === 200) {
          console.log("로그인 성공 성공");
          console.log(response.data);
          navigation.navigate('Main');
        }
      } catch (error) {
        setId("");
        setPassword("");
        console.error('로그인 요청 실패:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text
          style={styles.title}>
          LOGIN
        </Text>
        <Text
          style={styles.text}>
          Welcome to the MeetApp
        </Text>
        <TextInput
          ref={idInputRef} // TextInput에 ref 연결
          style={styles.input}
          placeholder="아이디를 입력하세요"
          keyboardType="default"
          value={id}
          onChangeText={setId}
        />
        <TextInput
          ref={pwInputRef} // TextInput에 ref 연결
          style={styles.input}
          placeholder="비밀번호를 입력하세요"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View
          style={styles.row}>
          <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.btnText}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.btnText2}>회원가입</Text>
          </TouchableOpacity>
        </View>
        
        <View
          style={styles.appContainer}>
          <Text
            style={styles.appName}>
            MeetApp
          </Text>
        </View>
      </View>
    </View>
  );
};



export default SignUpScreen;
