import React , {
  useState,
  useEffect,
} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from 'react-native';
import Pages from '../pages';
import { useAuth } from '../cognito/AuthContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
  },
  buttons: {
    marginTop: 32
  }
});

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    signUp,
    isLoading,
    error,
    user
  } = useAuth();
  useEffect(() => {
    console.log({
      error,
      user
    });
    if (user) {
      navigation.replace(Pages.ConfirmSignUp, {
        username
      });
    }
  }, [
    error,
    user
  ]);
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={{ height: 40 }}
          autoCompleteType="username"
          placeholder="username"
          onChangeText={text => setUsername(text)}
          defaultValue={username}
        />
        <TextInput
          style={{ height: 40 }}
          autoCompleteType="email"
          placeholder="email"
          onChangeText={text => setEmail(text)}
          defaultValue={email}
        />
        <TextInput
          style={{ height: 40 }}
          autoCompleteType="password"
          secureTextEntry
          placeholder="password"
          onChangeText={text => setPassword(text)}
          defaultValue={password}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          title="SignUp"
          onPress={() => {
            signUp(username, email, password);
          }}
        />
      </View>
    </View>
  );
};



export default SignUp;
