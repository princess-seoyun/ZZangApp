import React, { useState, useEffect , useRef} from 'react';
import { ScrollView, View, TextInput, TouchableOpacity, Text , Alert, SafeAreaView, Image, Platform } from 'react-native';
import axios from 'axios';
import styles from '../styles/signupStyle'

import NaverLogin from '@react-native-seoul/naver-login';

const SignUpScreen = ({ navigation }) => {
useEffect(() => {
  if (age !== '') {
    console.log("Age updated:", age); // 나이 값이 업데이트될 때마다 콘솔에 찍기
  }
}, [age]); // age가 변경될 때마다 실행
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender , setGender] =  useState('');
    const [age, setAge] = useState('');
    const [authPath , setAuthPath] = useState('');

    const idInputRef = useRef(null);
    const pwInputRef = useRef(null);
    const nameInputRef = useRef(null);
    const emailInputRef = useRef(null);

    const [naverToken, setNaverToken] = useState(null);

    const iosKeys = {
        kConsumerKey: "Xyho5Y98bYLW2GizVv49",
        kConsumerSecret: "A7koS2rbb4",
        kServiceAppName: "frontend",
        kServiceAppUrlScheme: "org.reactjs.native.example.frontend", // only for iOS
      };
      const androidKeys = {
        // Add your Android keys here if necessary
      };

    const initials = Platform.OS === "ios" ? iosKeys : androidKeys;

    useEffect(() => {
      try {
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

     const naverLogin = async () => {
       try {
         const { successResponse, failureResponse } = await NaverLogin.login();
         if (successResponse) {
           console.log("Naver login 성공, token: ", successResponse.accessToken);
           setNaverToken(successResponse.accessToken); // Save the token

           // 네이버 프로필 가져오기
           const profile = await NaverLogin.getProfile(successResponse.accessToken);
           console.log("네이버 프로필 정보: ", profile);

           setGender(profile.response.gender);
           const birthday = profile.response.birthday;
           const year = Number(profile.response.birthyear);

           // 월과 일을 담음
           const [month, day] = birthday.split('-').map(Number);
           getAge(month,day,year);
         } else if (failureResponse) {
           console.log("Naver login 실패: ", failureResponse);
           Alert.alert("로그인 실패", "네이버 로그인에 실패했습니다.");
         }
       } catch (error) {
         console.error("Error during Naver login:", error);
         Alert.alert("로그인 실패", "네이버 로그인에 실패했습니다.");
       }
     };

     const getAge = (month , day , year) => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1; // js 에서 월은 0부터 시작
        const currentDay = today.getDate();

        // 나이 계산
        let age = currentYear - year;

        // 생일 지났는지 확인 (만나이)
        if (currentMonth < month || (currentMonth === month && currentDay < day)) {
            age -= 1;
        }
        setAge(age.toString());
        setAuthPath("Naver");
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

    // 이메일 형식 유효성 검사 (정규 표현식 사용)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
    } else if (!name) {
        Alert.alert('입력 오류', '닉네임을 입력하세요', [
          { text: '확인', onPress: () => nameInputRef.current?.focus() },
        ]);
        return false;
     } else if (!email) {
       Alert.alert('입력 오류', '이메일을 입력하세요', [
         { text: '확인', onPress: () => emailInputRef.current?.focus() },
       ]);
       return false;
    } else if (!emailRegex.test(email)) {
          Alert.alert('입력 오류', '이메일 형식이 올바르지 않습니다', [
            { text: '확인', onPress: () => emailInputRef.current?.focus() },
          ]);
          return false;
    } else if (!gender || !age) {
       Alert.alert('필수값 누락', '소셜 로그인을 통해 본인인증 하세요');
       return false;
    }
    else {
      try {
        const userData = {
          id: id,
          password: password,
          name: name,
          email: email,
          gender : gender,
          age : age,
          auth_path : authPath
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

  const checkId = async (id) => {

    try {
        const userData = {
          id: id,
        };

        const response = await axios.post('http://127.0.0.1:8080/user/checkId', userData, {
          headers: {
            'Content-Type': 'application/json', // json 으로 보낸다는 뜻
          },
        });
        console.log(response.datad);
        if (response.status === 200 && response.data === "success") {
           setId(id);
        } else {
            console.log("id 중복")
            Alert.alert("중복되는 아이디가 존재합니다", "다른 아이디를 사용해 주세요");
            setId(null);
            idInputRef.current.focus();
        };
      } catch (error) {
        console.error('id 중복 조회 요청 실패:', error);
      }

  };

  return (
    <View style={styles.container}>
    {/* 소셜 로그인으로 인증 */}
    <View style={styles.authrow}>
        <View style={styles.line}></View>
        <Text style={styles.authText}>본인 인증</Text>
        <View style={styles.line}></View>
    </View>
    <SafeAreaView style={styles.iconrow}>
      <TouchableOpacity onPress={() => naverLogin(initials)} style={styles.icon}>
        <Image
          source={require('../assets/images/login_naver/btnG_아이콘원형.png')}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>

{/* 네이버 로그아웃 및 토큰 삭제
      <TouchableOpacity onPress={deleteToken} style={styles.icon}>
        <Image
          source={require('../assets/images/login_naver/btnG_아이콘원형.png')}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity> */}
    </SafeAreaView>
    {/* 회원가입 입력창 */}
    {/*  onBlur 는 포커스를 잃을 때 중복 조회 */}
      <ScrollView style={styles.subcontainer}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Text style={styles.subText}>아이디</Text>
        <TextInput
          style={styles.input}
          keyboardType="default"
          value={id}
          ref={idInputRef}
          onChangeText={setId}
          onBlur={() => checkId(id)}
        />
        <Text style={styles.subText}>비밀번호</Text>
        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry
          ref={pwInputRef}
          onChangeText={setPassword}
        />
        <Text style={styles.subText}>닉네임</Text>
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
        <Text style={styles.subText}>성별</Text>
        <TextInput
          style={styles.input}
          value={gender}
          onChangeText={setGender}
          editable={false}
        />
        <Text style={styles.subText}>나이</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          editable={false}
        />

        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnText}>회원가입</Text>
        </TouchableOpacity>

        <View style={styles.appContainer}>
          <Text style={styles.appName}>MeetApp</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;
