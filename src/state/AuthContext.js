import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from 'firebase-config';
import { collection, doc, getFirestore, getDoc } from 'firebase/firestore';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

   const signIn = (email, password) =>  {
    return signInWithEmailAndPassword(auth, email, password)
   }

  const logout = () => {
      return signOut(auth)
  }

  const resetPassword = (email ) =>  {
    return sendPasswordResetEmail(auth, email)
   }
  

  useEffect(() => {
    const firestore = getFirestore();
    const unsubscribe = onAuthStateChanged(auth, async(loggedInUser) => {
        if (loggedInUser) {
            // User is logged in, get their info based on their ID
            const userRef = doc(collection(firestore, 'users'), loggedInUser.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                setUser(userDoc.data());
                console.log(userDoc.data())
            }
        } else {
            // User is logged out
            setUser(null);
        }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn, resetPassword }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};