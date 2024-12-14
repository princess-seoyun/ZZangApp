import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subcontainer: {
    width : '70%',
    height : '40%'
  },
  input: { 
    height: 50, 
    borderColor: 'gray', 
    borderWidth: 1, 
    marginBottom: 12, 
    paddingLeft: 20,
    borderRadius : 5,
    fontFamily : 'GmarketSansTTFMedium',
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
    fontFamily : "GmarketSansTTFBold",
    paddingLeft : 10
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily : 'GmarketSansTTFMedium',
    paddingLeft : 10
  },
  row: {
    flexDirection: 'row',  // 버튼을 가로로 배치
    justifyContent: 'space-between',  // 버튼 간의 간격을 균등하게 분배
    width: '100%'
  },
  btn: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '49%', 
    height : 40,
    borderColor: 'gray', 
    borderWidth: 1, 
    borderRadius : 5,
    fontFamily : 'GmarketSansTTFMedium',
  },
  btn2 : {
    backgroundColor: '#656565',
    justifyContent: 'center',
    alignItems: 'center',
    width: '49%',
    height : 40,
    borderColor: 'gray', 
    borderWidth: 1, 
    textAlign: 'center', 
    borderRadius : 5,
    fontFamily : 'GmarketSansTTFMedium',
  },
  btnText: {
    textAlign : 'center',
    alignContent: 'center'
  },
  btnText2: {
    textAlign : 'center',
    alignContent: 'center',
    color : 'white'
  },
  appContainer : {
    height : '75%',
    justifyContent: 'flex-end', 
    alignItems: 'center',
  },
  appName : {
    color : 'gray',
    fontFamily : 'GmarketSansTTFMedium',
  },


});

export default styles;
