import { StyleSheet, Text, View } from 'react-native';
import Styles from '../general-styles';

const FirstComponent = ({ text }) => {
  return (
    <View style={Styles.deadcenter}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'lightgray',
    borderColor: 'red',
    fontSize: 30,
    fontWeight: '400',
  },
});

export default FirstComponent;