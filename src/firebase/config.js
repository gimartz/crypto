
import * as firebase from 'firebase'
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
 apiKey: 'AIzaSyBZv6ll1LaThdgu1Y2Lc3X4QoqgAVbq2s4',
  authDomain: 'crypto-c263b.firebaseapp.com',
  databaseURL: 'https://crypto-c263b-default-rtdb.firebaseio.com',
  projectId: 'crypto-c263b',
  storageBucket: 'crypto-c263b.appspot.com',
  messagingSenderId: '116681186861',
  appId: '1:116681186861:android:6edc6136601913177e62a4',
 
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };



