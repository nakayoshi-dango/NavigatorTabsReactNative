//RemoteFileManager.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  TouchableOpacity,
  Platform,
  Linking,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { decode } from "base64-arraybuffer";
import { StorageManager } from "./StorageManager";
import * as FileSystem from "expo-file-system";

const RemoteFileManager = () => {
  const [folderPath, setFolderPath] = useState(""); // empieza en el raíz
  const [newFolderName, setNewFolderName] = useState("");
  const [items, setItems] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchFolder = async () => {
    try {
      const res = await StorageManager.listFolder(folderPath);
      const folders = res
        .filter((i) => i.metadata === null && i.name !== ".init")
        .map((i) => ({ name: i.name, type: "folder" }));
      const files = res
        .filter((i) => i.metadata !== null)
        .map((i) => ({ name: i.name, type: "file" }));
      setItems([...folders, ...files]);
    } catch (e) {
      Alert.alert("Error", "No se pudo listar la carpeta.");
    }
  };

  const createFolder = async () => {
    if (!newFolderName) return;
    try {
      await StorageManager.createFolder(`${folderPath}/${newFolderName}`);
      setNewFolderName("");
      fetchFolder();
    } catch (error) {
      Alert.alert("Error", "No se pudo crear la carpeta.");
      console.error("Error supabase: ", error.message);
    }
  };

  const uploadFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: true,
      });

      console.log(result);

      if (result.canceled || !result.assets?.length) {
        console.log("Selección cancelada o vacía");
        return;
      }

      for (const file of result.assets) {
        const { name, uri, size, mimeType } = file;

        console.log("Archivo seleccionado:", name, uri, size, mimeType);

        const fileBase64 = await readFileAsBase64(uri);
        const fileBuffer = decode(fileBase64);

        const { error } = await StorageManager.uploadFile(
          `${folderPath}/${name}`,
          fileBuffer,
          mimeType || "application/octet-stream"
        );

        if (error) {
          console.error("Error subiendo archivo:", name, error);
          Alert.alert("Error subiendo archivo:", name, error);
        } else {
          console.log("Archivo subido correctamente:", name);
          Alert.alert("Archivo subido correctamente:", name);
        }
      }
    } catch (error) {
      console.error("Error general en uploadFile:", error);
      Alert.alert("Error general en uploadFile:", error);
    }
    fetchFolder();
  };

  // Función auxiliar
  const readFileAsBase64 = async (uri) => {
    try {
      return await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
    } catch (error) {
      console.error("Error al leer archivo con FileSystem:", error);
      throw error;
    }
  };

  const downloadFile = async (fileName) => {
    try {
      const url = await StorageManager.getDownloadUrl(
        `${folderPath}/${fileName}`
      );
      await Linking.openURL(url);
    } catch {
      Alert.alert("Error", "No se pudo obtener el archivo.");
    }
  };

  const deleteItem = async (name) => {
    try {
      await StorageManager.deleteItem(`${folderPath}/${name}`);
      fetchFolder();
    } catch {
      Alert.alert("Error", "No se pudo eliminar el ítem.");
    }
  };

  const renameItem = async (oldName) => {
    Alert.prompt(
      "Renombrar",
      `Nuevo nombre para ${oldName}`,
      async (newName) => {
        if (!newName) return;
        const ext = oldName.split(".").pop();
        const isFile = oldName.includes(".");
        const newPath = `${folderPath}/${newName}${isFile ? "." + ext : ""}`;
        try {
          await StorageManager.renameItem(`${folderPath}/${oldName}`, newPath);
          fetchFolder();
        } catch {
          Alert.alert("Error", "No se pudo renombrar el ítem.");
        }
      }
    );
  };

  useEffect(() => {
    fetchFolder();
  }, [folderPath]);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Gestor de Archivos (Supabase)
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
        {["", ...folderPath.split("/").filter(Boolean)].map(
          (folder, index, arr) => {
            const path = arr.slice(1, index + 1).join("/");
            return (
              <TouchableOpacity key={index} onPress={() => setFolderPath(path)}>
                <Text style={{ color: "blue" }}>
                  {index > 0 ? " / " : "/"}
                  {folder || "root"}
                </Text>
              </TouchableOpacity>
            );
          }
        )}
      </View>

      <TextInput
        testID="new-folder-name"
        placeholder="Nombre de la nueva carpeta"
        value={newFolderName}
        onChangeText={setNewFolderName}
        style={{ borderWidth: 1, padding: 8, marginTop: 10 }}
      />
      <Button title="Crear Carpeta" testID="create-folder" onPress={createFolder} />

      <View style={{ marginTop: 10 }}>
        <Button title="Subir Archivo" onPress={uploadFile} />
      </View>

      <FlatList
        style={{ marginTop: 20 }}
        data={items}
        keyExtractor={(item) => item.name}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            testID={`item-${item.name}`}
            onPress={() =>
              item.type === "file"
                ? setSelectedFile(item.name)
                : setFolderPath(`${folderPath}/${item.name}`)
            }
            onLongPress={() =>
              Alert.alert("Acciones", item.name, [
                {
                  text: "Eliminar",
                  onPress: () => deleteItem(item.name),
                  style: "destructive",
                },
                { text: "Renombrar", onPress: () => renameItem(item.name) },
                { text: "Cancelar", style: "cancel" },
              ])
            }
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderColor: "#ccc",
              backgroundColor: item.type === "folder" ? "#eef" : "#fff",
            }}
          >
            <Text>
              {item.type === "folder" ? "📁 " : "📄 "}
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      {selectedFile && (
        <View style={{ marginTop: 10 }}>
          <Text>Archivo seleccionado: {selectedFile}</Text>
          <Button
            title="Descargar"
            onPress={() => {
              downloadFile(selectedFile);
              setSelectedFile(null);
            }}
          />
        </View>
      )}
    </View>
  );
};

export default RemoteFileManager;
