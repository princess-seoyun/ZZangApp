import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, SafeAreaView, Image, Platform } from 'react-native';
import axios from 'axios';
import styles from '../styles/loginStyle';
import NaverLogin from '@react-native-seoul/naver-login';

const iosKeys = {
  kConsumerKey: "Xyho5Y98bYLW2GizVv49",
  kConsumerSecret: "A7koS2rbb4",
  kServiceAppName: "frontend",
  kServiceAppUrlScheme: "org.reactjs.native.example.frontend.Login", // only for iOS
};

const androidKeys = {
  // Add your Android keys here if necessary
};

const initials = Platform.OS === "ios" ? iosKeys : androidKeys;

const LoginScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const idInputRef = useRef(null);
  const pwInputRef = useRef(null);
  const [naverToken, setNaverToken] = useState(null);

  useEffect(() => {
    try {
      // Initialize Naver Login SDK
      NaverLogin.initialize({
        appName: iosKeys.kServiceAppName,
        consumerKey: iosKeys.kConsumerKey,
        consumerSecret: iosKeys.kConsumerSecret,
        serviceUrlSchemeIOS: iosKeys.kServiceAppUrlScheme,
        disableNaverAppAuthIOS: true,
      });
      console.log("네이버 로그인 초기화 성공");
    } catch (error) {
      console.error("네이버 로그인 초기화 실패 :", error);
    }
  }, []);

  const naverLogin = async (props) => {
    try {
      const token = await new Promise((resolve, reject) => {
        NaverLogin.login(props, (err, token) => {
          if (err) {
            console.error("Naver login 에러: ", err);
            reject(err);
            return;
          }
          resolve(token);
        });
      });

      if (token && token.access_token) {
        console.log("Naver login 성공, token: ", token);
        setNaverToken(token.access_token);
        navigation.navigate('Main');
      }
    } catch (error) {
      console.error("Error during Naver login:", error);
      Alert.alert("Login failed", "An error occurred during the login process.");
    }
  };

  const naverLogout = () => {
    NaverLogin.logout();  // Naver logout
    setNaverToken(null);   // Reset Naver token
    Alert.alert('로그아웃', '로그아웃이 완료되었습니다.');
    deleteToken();
  };

  const deleteToken = async () => {
      try {
        await NaverLogin.deleteToken();
//        setSuccessResponse(undefined);
//        setFailureResponse(undefined);
//        setGetProfileRes(undefined);
      } catch (e) {
        console.error(e);
      }
    };

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

        <View style={{ marginVertical: 25 }}></View>
        <View style={styles.line}></View>

        <SafeAreaView style={styles.row}>
          <TouchableOpacity onPress={() => naverLogin(initials)} style={{ alignItems: 'center', marginVertical: 10 }}>
            <Image
              source={require('../assets/images/login_naver/btnG_아이콘원형.png')}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={deleteToken} style={{ marginTop: 20, alignItems: 'center' }}>
            <Image
              source={require('../assets/images/login_naver/btnG_아이콘원형.png')}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.appContainer}>
          <Text style={styles.appName}>MeetApp</Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
