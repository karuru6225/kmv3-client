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

const ConfirmSignUp = ({ navigation, route }) => {
  const {
    username
  } = route.params || { username: '' };
  const [code, setCode] = useState('');
  const {
    confirmSignUp,
    isLoading,
    error,
    user
  } = useAuth();
  useEffect(() => {
    console.log({
      error,
      user
    });
  }, [
    error,
    user
  ]);
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={{ height: 40 }}
          placeholder="input verification code"
          onChangeText={text => setCode(text)}
          defaultValue={code}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          title="コードを確認"
          onPress={() => {
            confirmSignUp(username, code);
          }}
        />
      </View>
    </View>
  );
};



export default ConfirmSignUp;
