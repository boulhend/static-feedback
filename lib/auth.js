import React, { useState, useEffect, useContext, createContext } from 'react';
import {useRouter} from 'next/router'
import { createUser } from './db';
import firebase from './firebase';
import cookie from 'js-cookie';
const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(false);
  const Router = useRouter()
  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      const { token, ...userWithouttoken } = user;
      createUser(user.uid, userWithouttoken);
      setUser(user);
      cookie.set('fast-feedback-auth', true, {
        expires: 1
      });
      return user;
    } else {
      setUser(false);
      cookie.remove('fast-feedback-auth');
      return false;
    }
  };
  const signinWithGithub = () => {
    Router.push('/dashboard')
    return firebase
      .auth()
      .signInWithRedirect(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        handleUser(response.user);
      });
  };
  const signinWithGoogle = () => {
    Router.push('/dashboard')
    return firebase
      .auth()
      .signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user);
      });
  };

  const signout = () => {
    Router.push('/')
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((user) => handleUser(user));

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signinWithGoogle,
    signout
  };
}
const formatUser = (user) => {
  let name = '';
  if (user.displayName === null) name = user.email;
  else name = user.displayName;
  return {
    uid: user.uid,
    email: user.email,
    name,
    token: user.za,
    provider: user.providerData[0].providerId,
    photoURL: user.providerData[0].photoURL
  };
};
