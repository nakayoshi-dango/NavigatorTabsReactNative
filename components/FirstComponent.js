import { Text, View } from 'react-native';
import Styles from '../general-styles';

const FirstComponent = ({ text }) => {
  return (
    <View style={Styles.deadcenter}>
      <Text style={Styles.normaltext}>{text}</Text>
    </View>
  );
}

export default FirstComponent;