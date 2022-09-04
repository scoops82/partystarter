import React, { useState, useEffect } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  Firestore,
  collection,
  addDoc,
  doc,
  onSnapshot,
  setDoc,
  arrayUnion,
  updateDoc,
  getDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAAfzpw7Wf46Fy5K8yB2gG7jx6pdXhVzM",
  authDomain: "party-chat-b78ff.firebaseapp.com",
  projectId: "party-chat-b78ff",
  storageBucket: "party-chat-b78ff.appspot.com",
  messagingSenderId: "589508579755",
  appId: "1:589508579755:web:ced6f469df178e64c0c2ee",
  measurementId: "G-K6W9CM4W0G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

const chatHistoryRef = collection(db, "chat-history");
const chatMessagesRef = doc(chatHistoryRef, "chat-messages");

function PartyChat() {
  const [userName, setUserName] = useState("Anon");
  const [chatHistory, setChatHistory] = useState([
    {
      time: Date.now(),
      sender: "Host",
      message: "Welcome to the party!",
    },
  ]);
  const [userMessage, setUserMessage] = useState({});

  // set initial chat state
  async function fetchMessageHistory() {
    const docSnap = await getDoc(chatMessagesRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      // setChatHistory(docSnap.data()["message-array"]);
      console.log("message history in state", chatHistory);
    } else {
      console.log("Document does not exist");
    }
  }
  fetchMessageHistory();

  // async function startChat() {
  //   await updateDoc(
  //     chatMessagesRef,
  //     "message-array",
  //     arrayUnion({
  //       time: Date.now(),
  //       sender: "Host",
  //       message: "Welcome to the party!",
  //     })
  //   );
  // }
  // startChat();

  useEffect(() => {
    const chatHistoryUnsubscribe = onSnapshot(chatMessagesRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log("change.doc.data() ", change.doc.data());
      });
    });

    return () => {
      chatHistoryUnsubscribe();
    };
  }, [userMessage]);

  return (
    <div>
      <h2>Chat</h2>
      <div id="chatContainer">
        <div id="chatInput">
          <form>
            <input id="nameInput" type="text" />
            <input id="messageInput" type="text" />
            <button type="submit">Send</button>
            <button type="reset">Clear</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PartyChat;
