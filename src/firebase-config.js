import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
import { getAuth, GoogleAuthProvider, onAuthStateChanged} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiZeTRLXlOSmTDHRi4tRLH5IX4gnF5yO0",
  authDomain: "dashboardv2-358a4.firebaseapp.com",
  projectId: "dashboardv2-358a4",
  storageBucket: "dashboardv2-358a4.appspot.com",
  messagingSenderId: "758820533453",
  appId: "1:758820533453:web:349a3a490dbe5da7ab6584"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


// Collection ref
