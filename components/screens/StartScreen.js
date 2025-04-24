import { Text, View, useColorScheme } from "react-native";
import getGlobalStyles from "../../general-styles";
export default function StartScreen() {
  const colorScheme = useColorScheme();
  const styles = getGlobalStyles(colorScheme === 'dark');
  return (
    <View>
      <Text style={styles.h2text}>Color Scheme actual: {colorScheme}</Text>
    </View>
  );
}