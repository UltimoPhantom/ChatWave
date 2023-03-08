// // import { Avatar } from '@mui/material';
// // import React, { useState } from 'react';
// // import './chat.css';
// // import { useParams } from 'react-router-dom';
// // import { useState, useEffect } from 'react';
// // import { db } from './firebase';

// // function Chat() {

// //     const [userInput, setUserInput] = useState('');
// //     const { roomID } = useParams();
// //     const [roomName, setRoomName] = useState("");    

// //     useEffect(() => {
// //         if(roomID) {
// //             db.collection('rooms').doc(roomID).onSnapshot(snapshot => (
// //                 setRoomName(snapshot.data().name)
// //             ))
// //         }
// //     }, [roomID])
    
 
// //     const handleSend = (e) => {
// //         e.preventDefault();
// //         console.log("You typed", userInput);
// //         setUserInput('');
// //     }
// //   return (
// //     <div className="chat">
// //         <div className="chat_header">
// //             <Avatar />
// //             <div className="chat_header_info">
// //                 <h3>{ roomName }</h3>

// //             </div>
// //         </div>
// //         <div className="chat_body">

// //         <p className={`chat_message ${1 && 'chat_got'}`}>
// //                 <span className="chat_name">Tejas</span>
// //                 Hi Hello
// //                 <span className="chat_time">3:52PM</span>
// //         </p>
// //             <p className="chat_message">
// //                <span className="chat_name">Tejas</span>
// //                 Hi Hello
// //                 <span className="chat_time">3:52PM</span>
// //             </p>
// //         </div>
// //         <div className="chat_footer">
// //             <form>
// //                 <input 
// //                     value={userInput} 
// //                     onChange = {(e) => setUserInput( e.target.value )}
// //                     type="text" placeholder='Type a message..'
// //                 />
// //                 <button onClick = {handleSend} type="submit">Send</button>
// //             </form>
// //         </div>
// //     </div>
// //   )
// // }

// // export default Chat

// import { useState, useEffect } from 'react';
// import { collection, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
// import  db  from './firebase';
// import { Avatar } from '@mui/material';
// import './chat.css';
// import { useParams } from 'react-router-dom';

// function Chat() {
//   const [userInput, setUserInput] = useState('');
//   const { roomId } = useParams();
//   const [roomName, setRoomName] = useState('');
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
// //     if (roomId) {
// //       const roomRef = doc(collection(db, 'rooms'), roomId);
// //       onSnapshot(roomRef, (snapshot) => {
// //         setRoomName(snapshot.data().name);
// //       });
// //     }
// //   }, [roomId]);
// if (roomId) {
//     const roomRef = doc(db, "rooms", roomId);
//     const messagesQuery = query(
//       collection(roomRef, "messages"),
//       orderBy("timestamp", "asc")
//     );

//     const unsubscribeRoom = onSnapshot(roomRef, (snapshot) => {
//       setRoomName(snapshot.data().name);
//     });

//     const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
//       setMessages(snapshot.docs.map((doc) => doc.data()));
//     });

//     return () => {
//       unsubscribeRoom();
//       unsubscribeMessages();
//     };
//   }
// }, [roomId]);

//   const handleSend = (e) => {
//     e.preventDefault();
//     console.log('You typed', userInput);

//     setUserInput('');
//   };

//   return (
//     <div className="chat">
//       <div className="chat_header">
//         <Avatar />
//         <div className="chat_header_info">
//           <h3>{roomName}</h3>
//         </div>
//       </div>
//       <div className="chat_body">

//         {messages.map(message => (

//         <p className={`chat_message ${1 && 'chat_got'}`}>
//           <span className="chat_name">{message.name}</span>
//           {message.message}
//           <span className="chat_time">
//             {new Date(message.timestamp?.toData()).toUTCString()}
//           </span>
//         </p>

//         ))}



//         <p className="chat_message">
//           <span className="chat_name">Tejas</span>
//           Hi Hello
//           <span className="chat_time">3:52PM</span>
//         </p>
//       </div>
//       <div className="chat_footer">
//         <form>
//           <input
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//             type="text"
//             placeholder="Type a message.."
//           />
//           <button onClick={handleSend} type="submit">
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Chat;



import { useState, useEffect } from 'react';
import { collection, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { Avatar } from '@mui/material';
import './chat.css';
import { useParams } from 'react-router-dom';
import firebaseApp from './firebase';
import db from './firebase';
import { addDoc, serverTimestamp, fieldValue } from 'firebase/firestore';
import { useStateValue } from './StateProvider';


function Chat() {
  const [userInput, setUserInput] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [{ user },dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      const roomRef = doc(db, 'rooms', roomId);
      const messagesQuery = query(
        collection(roomRef, 'messages'),
        orderBy('timestamp', 'asc')
      );

      const unsubscribeRoom = onSnapshot(roomRef, (snapshot) => {
        setRoomName(snapshot.data().name);
      });

      const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });

      return () => {
        unsubscribeRoom();
        unsubscribeMessages();
      };
    }
  }, [roomId]);

  const handleSend = (e) => {
    e.preventDefault();
    setUserInput('');

    addDoc(collection(doc(db, 'rooms', roomId), 'messages'),{
        message: userInput,
        name: user.displayName,
        timestamp: serverTimestamp(),
    })
    .then(console.log('You typed', userInput))
    .catch((error)=> console.error("error sendig mess: ",error));

  };
//  () => setUserInput('')
// console.log('You typed', userInput)
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar />
        <div className="chat_header_info">
          <h3>{roomName}</h3>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p className={`chat_message ${message.name === user.displayName && 'chat_got'}`}>
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_time">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}

        {/* <p className="chat_message">
          <span className="chat_name">Tejas</span>
          Hi Hello
          <span className="chat_time">3:52PM</span>
        </p> */}
      </div>
      <div className="chat_footer">
        <form>
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            type="text"
            placeholder="Type a message.."
          />
          <button onClick={handleSend} type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;