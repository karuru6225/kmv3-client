import React , {
  useState,
  useEffect,
  useLayoutEffect,
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

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {
    isAuthenticated,
    isNewPasswordRequired,
    signIn,
    isLoading,
    error,
    user
  } = useAuth();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="SignUp"
          onPress={() => {
            navigation.navigate(Pages.SignUp);
          }}
        />
      )
    });
  }, [navigation]);
  useEffect(() => {
    if (isAuthenticated) {
      console.log('authenticated');
      navigation.replace(Pages.Home);
    }
  }, [isAuthenticated]);
  console.log('statuses', {
    isAuthenticated,
    isNewPasswordRequired,
    signIn,
    isLoading,
    error,
    user
  });
  const handleOnSubmit = () => {
    signIn(username, password);
  };
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={{ height: 40 }}
          autoCompleteType="username"
          placeholder="username"
          onChangeText={text => setUsername(text)}
          defaultValue={username}
          onSubmitEditing={handleOnSubmit}
        />
        <TextInput
          style={{ height: 40 }}
          autoCompleteType="password"
          secureTextEntry
          placeholder="password"
          onChangeText={text => setPassword(text)}
          defaultValue={password}
          onSubmitEditing={handleOnSubmit}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          title="Login"
          onPress={handleOnSubmit}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          title="Go to Home"
          onPress={() => {
            navigation.navigate(Pages.Home);
          }}
        />
      </View>
    </View>
  );
};



export default Login;
