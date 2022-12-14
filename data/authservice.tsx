//for login
import React, {
  useMemo,
  useState,
  createContext,
  useContext,
  useEffect,
} from 'react';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  deleteUser,
  getAuth,
  updatePassword,
} from 'firebase/auth';
import { auth, db } from '../firebaseAuth';
import { useRouter } from 'next/router';
import { collection, DocumentData, onSnapshot } from 'firebase/firestore';
import { IData } from './types';
export interface Iinput {
  email: string;
  password: string;
}
//for register
export interface IRegister {
  email: string;
  password: string;
  repassword: string;
}

//our autentication settings for firebase
interface AProps {
  children: React.ReactNode;
}

interface IAuth {
  currentUser: User | null;
  isLoading: boolean;
  logIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  Register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<IAuth>({
  //set user credential and variables to null
  currentUser: null,
  isLoading: false,
  //function to get object from auth
  logIn: async () => {},
  logout: async () => {},
  Register: async () => {},
});

export const AuthProvider = ({ children }: AProps) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [firstLoading, setFirstLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user);
          setIsLoading(false);
        } else {
          setCurrentUser(null);
          setIsLoading(true);
          router.push('/signin');
        }
        setFirstLoading(false);
      }),
    [auth]
  );

  const Register = async (email: string, password: string) => {
    setIsLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userinfo) => {
        setCurrentUser(userinfo.user);
        router.push('/');
        setIsLoading(false);
      })
      .catch((error) => alert(error.message))
      .finally(() => setIsLoading(false));
  };

  const logIn = async (email: string, password: string) => {
    setIsLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userinfo) => {
        setCurrentUser(userinfo.user);
        router.push('/');
        setIsLoading(false);
      })
      .catch((error) => alert(error.message))
      .finally(() => setIsLoading(false));
  };

  const logout = async () => {
    setIsLoading(true);

    signOut(auth)
      .then(() => {
        setCurrentUser(null);
      })
      .catch((error) => alert(error.message))
      .finally(() => setIsLoading(false));
  };

  //return authcontext
  return (
    <AuthContext.Provider
      value={{ currentUser, logIn, logout, Register, isLoading }}>
      {!firstLoading && children}
    </AuthContext.Provider>
  );
};
//export the settings
export default function UseAuth() {
  return useContext(AuthContext);
}
export const userLibrary = (UID: undefined | string) => {
  const [getList, setGetList] = useState<IData[] | DocumentData[]>([]);
  useEffect(() => {
    if (!UID) return;

    return onSnapshot(collection(db, 'campers', UID, 'myparks'), (snapshot) => {
      setGetList(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, [db, UID]);

  return getList;
};
