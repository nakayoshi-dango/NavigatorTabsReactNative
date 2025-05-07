import RemoteFileManager from "../RemoteFileManager";
import { ScrollView } from "react-native";

export default function FileScreen() {
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <RemoteFileManager />
    </ScrollView>
  );
}
