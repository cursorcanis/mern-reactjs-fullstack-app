import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCVFWqF06IEc8c2DGUX6VmZH8hMjn6ZsaI",
  authDomain: "mern-ai-blog-app.firebaseapp.com",
  projectId: "mern-ai-blog-app",
  storageBucket: "mern-ai-blog-app.firebasestorage.app",
  messagingSenderId: "490827263432",
  appId: "1:490827263432:web:77cd4e444cf54e032a24fd",
  measurementId: "G-ZLQ1VN0QK4"
};

const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
