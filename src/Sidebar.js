// import { Avatar } from '@mui/material';
// import React from 'react';
// import './Sidebar.css';
// import Sidebar_contacts from './Sidebar_contacts';
// import { useState } from 'react';
// // import db from './firebase';
// import { collection, onSnapshot } from 'firebase/firestore';
// import db from './firebase';
// import { doc, updateDoc } from 'firebase/firestore';
// import { useEffect } from 'react';

// function Sidebar() {
//     const [rooms, setRooms] = useState([]);


//     // useEffect(() => {
//     //     db.collection('rooms').onSnapshot(snapshot => {
//     //       setRooms(snapshot.docs.map(doc => ({
//     //           id: doc.id,
//     //           data: doc.data()
//     //       })))
//     //     })
//     //   }, [])
//     useEffect(() => {
//         const unsub = onSnapshot(collection(db, 'rooms'), (snapshot) => {
//           setRooms(
//             snapshot.docs.map((doc) => ({
//               id: doc.id,
//               data: doc.data(),
//             }))
//           );
//         });
//         return () => {
//           unsub();
//         };
//       }, []);
      
    

//     return (
//         <div className="sidebar">
//             <div className="sidebar_header">
//                 <Avatar />
//             </div>
//             <div className="sidebar_search">

//             </div>
//             <div className="sidebar_chat">
//                 <Sidebar_contacts addNewChat/>
//                 {rooms.map((room) => {
//                     <Sidebar_contacts key={room.id} id={room.id}
//                     name={room.data.name} />
//                 })}
//             </div>
//         </div>
// )
// }

// export default Sidebar

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
        <Avatar src = {user?.photoURL}/>
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
