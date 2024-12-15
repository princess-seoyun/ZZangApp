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

  authrow: {
    flexDirection: 'row',  // 버튼을 가로로 배치
    justifyContent: 'space-between',  // 버튼 간의 간격을 균등하게 분배
    width: '90%',
    marginTop: '10%',
    alignItems: 'center',
  },
  iconrow: {
      flexDirection: 'row',  // 버튼을 가로로 배치
      justifyContent: 'space-evenly',  // 버튼 간의 간격을 균등하게 분배
      width: '90%',
      marginBottom: 30,
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
    marginBottom : 20,
  },
  line : {
//      flex : 1,
      borderBottomWidth : 1,
      width : "40%",
      borderBottomColor: '#EAEAEA',
      justifyContent: 'center',
      alignItems: 'center',
  },

  icon : {
    marginTop: 20,
    alignItems: 'center'
  },
  authText : {
      fontFamily : 'GmarketSansTTFMedium',
      fontSize : 11,
    },
});

export default styles;
