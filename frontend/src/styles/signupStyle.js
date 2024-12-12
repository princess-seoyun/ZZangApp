import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subcontainer: {
    width : '70%',
    height : '70%',
  },
  input: { 
    height: 50, 
    borderColor: 'gray', 
    borderBottomWidth: 1, 
    marginBottom: 20, 
  },
  subText: {
    fontSize: 13,
    marginBottom: 5,
    fontFamily : 'GmarketSansTTFLight',
  },
  row: {
    flexDirection: 'row',  // 버튼을 가로로 배치
    justifyContent: 'space-between',  // 버튼 간의 간격을 균등하게 분배
    width: '100%'
  },
  btn : {
    backgroundColor: '#656565',
    justifyContent: 'center',
    width: '100%',
    height : 50,
    borderColor: 'gray', 
    borderWidth: 1, 
    textAlign: 'center', 
    borderRadius : 5,
    fontFamily : 'GmarketSansTTFMedium',
  },
  
  btnText: {
    textAlign : 'center',
    alignContent: 'center',
    color : 'white',
    fontFamily : 'GmarketSansTTFMedium',
    fontSize : 20
  },
  appContainer : {
    height : 100,
    justifyContent: 'flex-end', 
    alignItems: 'center',
  },
  appName : {
    color : 'gray',
    fontFamily : 'GmarketSansTTFMedium',
  }
});

export default styles;
