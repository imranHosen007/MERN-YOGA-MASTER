import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDeRujmeLBPEh1Agm4u9Si9Id-F0HBV8h0",
  authDomain: "yoga-master-cdd97.firebaseapp.com",
  projectId: "yoga-master-cdd97",
  storageBucket: "yoga-master-cdd97.appspot.com",
  messagingSenderId: "40141675134",
  appId: "1:40141675134:web:4c14b944ed6e336378162f",
  measurementId: "G-NHN8BP7DCZ",
};

const app = initializeApp(firebaseConfig);

export default app;
