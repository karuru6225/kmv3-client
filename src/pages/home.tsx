import React, {
  useState,
  useEffect,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions
} from 'react-native';
import API from '@aws-amplify/api';
import { useAuth } from '../cognito/AuthContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    marginTop: 32
  },
});

const Home = ({ navigation }) => {
  const [contents, setContents] = useState('');
  const {
    signOut,
    isLoading,
    error,
  } = useAuth();
  useEffect(() => {
    (async () => {
      try {
        const res = await API.get('withoutAuth', '/withoutAuth', {});
        setContents(JSON.stringify(res));
      } catch (e) {
        setContents(e.toString());
      }
    })();
  }, [navigation]);
  return (
    <View>
      <Text>
        {contents}
      </Text>
      <View style={styles.buttons}>
        <Button
          title="Logout"
          onPress={() => {
            console.log('signout');
            signOut()
          }}
        />
      </View>
    </View>
  );
};

export default Home;
