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
import axios from 'axios';
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
        const res = await axios({
          method: 'get',
          url: 'https://0q0wxzgm42.execute-api.ap-northeast-1.amazonaws.com/dev/withAuth'
        });
        setContents(res.data);
      } catch (e) {
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
