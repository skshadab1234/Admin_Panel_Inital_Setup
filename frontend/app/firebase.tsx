// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfigs = {
    apiKey: 'AIzaSyCWwMoVi0F3-bfflfWxw1BbR0v0k7P-NAU',
    authDomain: 'siyahfy-phone-auth.firebaseapp.com',
    projectId: 'siyahfy-phone-auth',
    storageBucket: 'siyahfy-phone-auth.appspot.com',
    messagingSenderId: '666448175181',
    appId: '1:666448175181:web:7adaa3273fca32965cfc04',
    measurementId: 'G-GJBJSRNSYP',
};

// Initialize Firebase
const apps = initializeApp(firebaseConfigs);
export const auths = getAuth(apps);
