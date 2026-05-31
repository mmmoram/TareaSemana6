import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
const firebaseConfig = {
  apiKey: "AIzaSyDdMEocfdhlskp6yAQ7HYKI934Vxn44_Ds",
  authDomain: "semana5db.firebaseapp.com",
  projectId: "semana5db",
  storageBucket: "semana5db.firebasestorage.app",
  messagingSenderId: "241602209671",
  appId: "1:241602209671:web:184b6ca32968d872039522",
  databaseURL: "https://semana5db-default-rtdb.firebaseio.com/" 
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);