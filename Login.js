import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";


const sendText = async (phoneNumber) => {
  console.log("PhoneNumber: ",phoneNumber);
  const loginResponse = await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber,{
    method: 'POST',
    headers:{
      'content-type':'application/text'
    }
  });
const loginResponseText = await loginResponse.text();
  console.log('Login Response',loginResponse.text());//print the response
};

const getToken = async({phoneNumber, otp}) => { //not complete
  console.log('PhoneNumber',phoneNumber);
  const loginResponse = await fetch('https://dev.stedi.me/twofactorlogin',{
    method: 'POST',
    headers:{
      'content-type':'application/text'
    },
    body: {
      phoneNumber,
      oneTimePassword: otp
    }
  });
const token = await loginResponse.text();
  console.log(token);

}

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);

  return (
    <SafeAreaView style={styles.mainView}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="8015551212"
      />
        <TouchableOpacity
        style={styles.button}
        onPress={()=>{sendText(phoneNumber)}}
        >
        <Text>Send Text</Text>
        </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        keyboardType="numeric"
        secureTextEntry= {true}
      />
        <TouchableOpacity
        style={styles.button2}
        onPress={()=>{getToken(phoneNumber)}}
        >
        <Text>Log In</Text>
        </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  mainView:{
marginTop: 100

  },
  button: {
    alignItems: "center",
    backgroundColor: "#c0ffc3",
    padding: 10
},
button2: {
  alignItems: "center",
  backgroundColor: "#03dffc",
  padding: 10
},
});

export default Login;