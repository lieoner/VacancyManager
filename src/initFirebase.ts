import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}-default-rtdb.europe-west1.firebasedatabase.app/`,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: '1:517677598786:web:6f1d17905c271396b505db',
};

function initFirebase() {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
        firebase
            .auth()
            .signInWithEmailAndPassword(
                process.env.NEXT_PUBLIC_FIREBASE_LOGIN as string,
                process.env.NEXT_PUBLIC_FIREBASE_PASSWORD as string
            )
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
            });

        firebase.auth();
    }
}
initFirebase();

export { firebase };
