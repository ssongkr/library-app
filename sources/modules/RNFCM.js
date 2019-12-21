import firebase from 'react-native-firebase';

function getToken() {
    firebase.messaging().getToken()
    .then(fcmToken => {
        if (fcmToken) {
            console.log('user has device token : ' + fcmToken);
        } else {
            console.log("user doesn't have a device token yet");
        }
    });
}

function requestPermission() {
    firebase.messaging().requestPermission()
    .then(() => {
        console.log('User has authorised'); 
    })
    .catch((err) => {
        console.log('User has rejected permissions : ' + err); 
    });
}

export function checkPermission() {
    firebase.messaging().hasPermission()
    .then(enabled => {
        if (enabled) {
            console.log('user has permissions');
            getToken();
        } else {
            console.log("user doesn't have permission");
            requestPermission();
        }
    });
}

// const notificationListener = firebase.notifications().onNotification((notification) => {

//     //Triggered when a particular notification has been received in foreground
//     const { title, body } = notification;
//     this.showAlert(title, body);
// });

// export async function createNotificationListeners() {
//     //notificationListener = 
// }