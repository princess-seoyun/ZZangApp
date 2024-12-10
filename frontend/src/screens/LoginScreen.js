import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert , SafeAreaView, Button } from 'react-native';
import axios from 'axios';
import styles from '../styles/loginStyle'

import { NaverLogin, getProfile } from '@react-native-seoul/naver-login'; // 네이버 로그인

const iosKeys = {
  kConsumerKey: "Xyho5Y98bYLW2GizVv49",
  kConsumerSecret: "nwrNOrxIwy",
  kServiceAppName: "frontend",
  kServiceAppUrlScheme: "org.reactjs.native.example.frontend.Login" // only for iOS
};

const androidKeys = {
//  kConsumerKey: "",
//  kConsumerSecret: "",
//  kServiceAppName: ""
};

/** This key is setup in iOS. So don't touch it */
const serviceUrlSchemeIOS = 'navertest';

const initials = Platform.OS === "ios" ? iosKeys : androidKeys;

const LoginScreen = ({ navigation }) => {

const [naverToken, setNaverToken] = React.useState(null);

//    useEffect(() => {
//        NaverLogin.initialize({
//          kServiceAppName,
//          kConsumerKey,
//          kConsumerSecret,
//          serviceUrlSchemeIOS,
//          disableNaverAppAuthIOS: true,
//        });
//      }, []);

NaverLogin.initialize({
  appName,
  consumerKey,
  consumerSecret,
  serviceUrlSchemeIOS,
  disableNaverAppAuthIOS: true,
});

  const naverLogin = (props) => {
    return new Promise((resolve, reject) => {
      NaverLogin.login(props, (err, token) => {
        if (err) {
          console.log("로그인 에러:", err);
          reject(err);
          return;
        }
        console.log(`로그인 성공, 토큰: ${JSON.stringify(token)}`);
        setNaverToken(token.access_token);  // access_token을 저장하도록 수정
        resolve(token);
      });
    });
  };


    const naverLogout = () => {
      NaverLogin.logout();
      setNaverToken("");
    };

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const idInputRef = useRef(null); // TextInput 참조 생성
  const pwInputRef = useRef(null);

  const handleSubmit = async () => {

  console.log(password);
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

        if (response.status === 200 && response.data === "success") {
          navigation.navigate('Main');
        }
        else {
        Alert.alert("로그인","실패");
        }
      } catch (error) {
//        setId("");
//        setPassword("");
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

        <SafeAreaView>
              <Button
                title="네이버 아이디로 로그인하기"
                onPress={() => naverLogin(initials)}
              />
              {!!naverToken && <Button title="로그아웃하기" onPress={naverLogout} />}

              {!!naverToken && (
                <Button title="회원정보 가져오기" onPress={getUserProfile} />
              )}
            </SafeAreaView>

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



export default LoginScreen;
