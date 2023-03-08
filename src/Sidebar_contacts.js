import { Avatar } from '@mui/material'
import React from 'react'
import db from './firebase';
import './Sidebar.js';
import { useEffect } from 'react';
import { getFirestore, addDoc } from 'firebase/firestore';
import { Link } from "react-router-dom";
import { collection, doc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useState } from 'react';

function Sidebar_contacts({ id,name,addNewChat }) {

    // const createChat = () => {
    //     const roomName = prompt("Enter the new room name: ");

    //     if(roomName) {
    //       //some stuffs later
    //       db.collections('rooms').add({
    //         name: roomName,
    //       });
    //       console.log("Room Name is : ",roomName);
    //     }
    // }

    const [messages, setMessages] = useState(""); 

    useEffect(() => {
      if (id) {
        const q = query(collection(db, 'rooms', id, 'messages'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const messages = snapshot.docs.map((doc) => doc.data());
          setMessages(messages);
        });
        return () => unsubscribe();
      }
    }, [id]);
    

    const createChat = async () => {
      const roomName = prompt("Enter the new room name: ");

      if (roomName) {
        const db = getFirestore();
        await addDoc(collection(db, 'rooms'), {
          name: roomName,
        });
        console.log("Room Name is: ", roomName);

      }
    };


  return !addNewChat ? (
    <Link to = {`/rooms/${id}`}>
    <div className="sidebarchat_names">
        <Avatar />
        <div className="sidebarchat_info">
            <h2>{ name }</h2>
            <p>{ messages[0]?.message }</p>
        </div>
    </div>
    </Link>
  ) : (
    <div onClick = {createChat} className="Sidebar_contacts">
        <h2>Add New Chat</h2>
    </div>
  )
}

export default Sidebar_contacts