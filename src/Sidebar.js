import { Avatar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import Sidebar_contacts from './Sidebar_contacts';
import { collection, onSnapshot } from 'firebase/firestore';
import db from './firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useStateValue } from './StateProvider';


function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'rooms'), (snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar_header">
      <Avatar src={user?.photoURL} style={{ transform: 'scale(1.50)' }} />

        <span className="chatWaveTextBox"><h1 id="chatWaveText" className='animate-charcter'>Chat Wave</h1></span>
      </div>
      <div className="sidebar_search"></div>
      <div className="sidebar_chat">
        <Sidebar_contacts addNewChat />
        {rooms.map((room) => (
          <Sidebar_contacts
            key={room.id}
            id={room.id}
            name={room.data.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
