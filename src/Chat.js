import { useState, useEffect, useRef } from 'react';
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
  const messageEndRef = useRef(null);

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

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [messages]);

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
        <div ref={messageEndRef}></div>

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