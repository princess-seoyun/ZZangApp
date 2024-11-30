import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/loginStyle'

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          style={styles.input}
          placeholder="아이디를 입력하세요"
          keyboardType="default"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호를 입력하세요"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View
          style={styles.row}>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
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
      {/* 회원가입하는 API 생성 후 보내야 함 */}
    </View>
  );
};



export default SignUpScreen;
