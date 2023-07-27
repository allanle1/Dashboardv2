import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "firebase-config";
import {
  collection,
  doc,
  getFirestore,
  getDoc,
  usersCollectionRef,
} from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const firestore = getFirestore();
    const unsubscribe = onAuthStateChanged(auth, async (loggedInUser) => {
      if (loggedInUser) {
        // User is logged in, get their info based on their ID
        const userRef = doc(collection(firestore, "users"), loggedInUser.uid);
        const userDocSnapshot = await getDoc(userRef);
        if (userDocSnapshot.exists()) {
          // Get the user data from the document
          let userData = userDocSnapshot.data();
          const siteRef = userData.site;
          const siteSnapshot = await getDoc(siteRef);
          if (siteSnapshot.exists()) {
            const siteData = siteSnapshot.data();
            console.log(siteSnapshot);
            const newData = { ...siteData, _uid: siteSnapshot.id };
            userData.site = newData; // Replace the reference field with the site data
          }
          const newUser = { ...userData, _uid: loggedInUser.uid };
          setUser(newUser);
        } else {
          console.log("User data not found.");
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
    <UserContext.Provider
      value={{ createUser, user, logout, signIn, resetPassword }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
