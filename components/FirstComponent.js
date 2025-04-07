import { Text, View } from 'react-native';

const FirstComponent = ({ text }) => {
  return (
    <View className="deadcenter">
      <Text className="normaltext">{text}</Text>
    </View>
  );
}

export default FirstComponent;