import * as Notifications from 'expo-notifications';

// Configure how notifications should be presented when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    };
  },
});

export const setupNotifications = async () => {
  try {
    // Request permission
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    // Schedule the first notification (2 minutes)
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hey there! 👋",
        body: "Hey how are you, this is Peace! Are you enjoying my app?",
      },
      trigger: {
        seconds: 120, // 2 minutes
      },
    });

    // Schedule the second notification (3 hours)
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Peace here again! 😊",
        body: "My app is cool right? lol",
      },
      trigger: {
        seconds: 10800, // 3 hours
      },
    });

  } catch (error) {
    console.log('Error setting up notifications:', error);
  }
};
