import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";
import { PermissionsAndroid } from "react-native";
class NotificationsManager {
  // Método para pedir permisos
  static async requestUserPermission() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      PermissionsAndroid.PERMISSIONS.RECEIVE_WAP_PUSH
    );
    const authStatus = await messaging().requestPermission();
    console.log("Authorization status:", authStatus); // Agregado para depurar

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Permissions granted.");
    } else {
      console.log("Permission denied.");
    }
  }

  // Método para escuchar notificaciones
  static listenForNotifications() {
    messaging().onMessage(async (remoteMessage) => {
      console.log("Mensaje recibido:", remoteMessage); // Log agregado
      Alert.alert(
        "Nueva notificación",
        remoteMessage.notification?.body || "Mensaje recibido"
      );
    });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log("Notificación abierta", remoteMessage.notification);
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "App fue abierta desde una notificación:",
            remoteMessage.notification
          );
        }
      });
  }

  // Método para obtener el token de FCM
  static async getDeviceToken() {
    const token = await messaging().getToken();
    console.log("Token FCM:", token);
    return token;
  }

  // Método para suscribirse a un canal (topic)
  static async subscribeToTopic(topicName) {
    try {
      await messaging().subscribeToTopic(topicName);
      console.log(`Suscrito al canal: ${topicName}`);
    } catch (error) {
      console.error("Error al suscribirse al canal:", error);
    }
  }

  // Método para desuscribirse de un canal (topic)
  static async unsubscribeFromTopic(topicName) {
    try {
      await messaging().unsubscribeFromTopic(topicName);
      console.log(`Desuscrito del canal: ${topicName}`);
    } catch (error) {
      console.error("Error al desuscribirse del canal:", error);
    }
  }
}

export default NotificationsManager;
