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

const changePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [configmPassword, setConfirmPassword] = useState('');
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={{ height: 40 }}
          autoCompleteType="password"
          secureTextEntry
          placeholder="oldPassword"
          onChangeText={text => setOldPassword(text)}
          defaultValue={oldPassword}
        />
        <TextInput
          style={{ height: 40 }}
          autoCompleteType="password"
          secureTextEntry
          placeholder="password"
          onChangeText={text => setPassword(text)}
          defaultValue={password}
        />
        <TextInput
          style={{ height: 40 }}
          autoCompleteType="password"
          secureTextEntry
          placeholder="password"
          onChangeText={text => setConfirmPassword(text)}
          defaultValue={confirmPassword}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          title="Login"
          onPress={() => {
            (async () => {
            })();
          }}
        />
      </View>
    </View>
  );
};



export default changePassword;
