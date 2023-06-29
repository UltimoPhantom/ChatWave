// // // import { useState, useEffect, useRef } from 'react';
// // // import { collection, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
// // // import { getFirestore } from 'firebase/firestore';
// // // import { Avatar } from '@mui/material';
// // // import './chat.css';
// // // import { useParams } from 'react-router-dom';
// // // import firebaseApp from './firebase';
// // // import db from './firebase';
// // // import { addDoc, serverTimestamp, fieldValue } from 'firebase/firestore';
// // // import { useStateValue } from './StateProvider';
// // // import notificationSound from './Assets/Notification.mp3';


// // // function Chat() {
// // //   const [userInput, setUserInput] = useState('');
// // //   const { roomId } = useParams();
// // //   const [roomName, setRoomName] = useState('');
// // //   const [messages, setMessages] = useState([]);
// // //   const [{ user },dispatch] = useStateValue();
// // //   const messageEndRef = useRef(null);

// // //   useEffect(() => {
// // //     if (roomId) {
// // //       const roomRef = doc(db, 'rooms', roomId);
// // //       const messagesQuery = query(
// // //         collection(roomRef, 'messages'),
// // //         orderBy('timestamp', 'asc')
// // //       );

// // //       const unsubscribeRoom = onSnapshot(roomRef, (snapshot) => {
// // //         setRoomName(snapshot.data().name);
// // //       });

// // //       const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
// // //         setMessages(snapshot.docs.map((doc) => doc.data()));
// // //       });

// // //       return () => {
// // //         unsubscribeRoom();
// // //         unsubscribeMessages();
// // //       };
// // //     }
// // //   }, [roomId]);

// // //   useEffect(() => {
// // //     // var nfS = new Audio(notificationSound);
// // //     // nfS.play();
// // //     messageEndRef.current?.scrollIntoView();
// // //   }, [messages]);
  
// // //   useEffect(() => {
// // //     var nfS = new Audio(notificationSound);
// // //     nfS.play();
// // //   }, [messages])

// // //   const handleSend = (e) => {
// // //     e.preventDefault();
// // //     setUserInput('');

// // //     addDoc(collection(doc(db, 'rooms', roomId), 'messages'),{
// // //         message: userInput,
// // //         name: user.displayName,
// // //         timestamp: serverTimestamp(),
// // //     })
// // //     .then(console.log('You typed', userInput))
// // //     .catch((error)=> console.error("error sendig mess: ",error));

// // //   };


// // // return (
// // //   <div className="chat">
// // //     <div className="chat_header">
// // //       <Avatar />
// // //       <div className="chat_header_info">
// // //         <h3>{roomName}</h3>
// // //       </div>
// // //     </div>
// // //     <div id="wrapper">
// // //       <div className="chat_body scrollbar" id="style-8">
// // //         <div className="force-overflow">
// // //           {messages.map((message) => (
// // //             <p className={`chat_message ${message.name === user.displayName && 'chat_got'}`}>
// // //               <span className="chat_name">{message.name}</span>
// // //               {message.message}
// // //               <span className="chat_time">
// // //                 {new Date(message.timestamp?.toDate()).toUTCString()}
// // //               </span>
// // //             </p>
// // //           ))}
// // //         </div>

// // //         <div ref={messageEndRef}></div>
// // //       </div>
// // //     </div>
// // //     <div className="chat_footer">
// // //       <form>
// // //         <input
// // //           value={userInput}
// // //           onChange={(e) => setUserInput(e.target.value)}
// // //           type="text"
// // //           placeholder="Type a message.."
// // //         />
// // //         <button onClick={handleSend} type="submit">
// // //           Send
// // //         </button>
// // //       </form>
// // //     </div>
// // //   </div>
// // // );

// // // }

// // // export default Chat;

// // import { useState, useEffect, useRef } from 'react';
// // import { collection, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
// // import { getFirestore } from 'firebase/firestore';
// // import { Avatar } from '@mui/material';
// // import './chat.css';
// // import { useParams } from 'react-router-dom';
// // import firebaseApp from './firebase';
// // import db, { storage } from './firebase'; // Assuming you've made the necessary changes in the `firebase.js` file as mentioned before
// // import { addDoc, serverTimestamp, fieldValue } from 'firebase/firestore';
// // import { useStateValue } from './StateProvider';
// // import notificationSound from './Assets/Notification.mp3';

// // function Chat() {
// //   const [userInput, setUserInput] = useState('');
// //   const { roomId } = useParams();
// //   const [roomName, setRoomName] = useState('');
// //   const [messages, setMessages] = useState([]);
// //   const [{ user }, dispatch] = useStateValue();
// //   const messageEndRef = useRef(null);

// //   useEffect(() => {
// //     if (roomId) {
// //       const roomRef = doc(db, 'rooms', roomId);
// //       const messagesQuery = query(
// //         collection(roomRef, 'messages'),
// //         orderBy('timestamp', 'asc')
// //       );

// //       const unsubscribeRoom = onSnapshot(roomRef, (snapshot) => {
// //         setRoomName(snapshot.data().name);
// //       });

// //       const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
// //         setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
// //       });

// //       return () => {
// //         unsubscribeRoom();
// //         unsubscribeMessages();
// //       };
// //     }
// //   }, [roomId]);

// //   useEffect(() => {
// //     messageEndRef.current?.scrollIntoView();
// //   }, [messages]);

// //   const handleSend = (e) => {
// //     e.preventDefault();
// //     setUserInput('');

// //     if (userInput) {
// //       if (userInput.startsWith('data:image')) {
// //         const imageRef = storage.ref().child(`images/${Date.now()}`);
// //         const uploadTask = imageRef.putString(userInput, 'data_url');

// //         uploadTask
// //           .then((snapshot) => snapshot.ref.getDownloadURL())
// //           .then((downloadURL) => {
// //             return addDoc(collection(doc(db, 'rooms', roomId), 'messages'), {
// //               message: downloadURL,
// //               name: user.displayName,
// //               timestamp: serverTimestamp(),
// //             });
// //           })
// //           .then(() => {
// //             console.log('Image sent successfully');
// //           })
// //           .catch((error) => {
// //             console.error('Error sending image:', error);
// //           });
// //       } else {
// //         addDoc(collection(doc(db, 'rooms', roomId), 'messages'), {
// //           message: userInput,
// //           name: user.displayName,
// //           timestamp: serverTimestamp(),
// //         })
// //           .then(() => {
// //             console.log('Message sent successfully');
// //           })
// //           .catch((error) => {
// //             console.error('Error sending message:', error);
// //           });
// //       }
// //     }
// //   };

// //   return (
// //     <div className="chat">
// //       <div className="chat_header">
// //         <Avatar />
// //         <div className="chat_header_info">
// //           <h3>{roomName}</h3>
// //         </div>
// //       </div>
// //       <div id="wrapper">
// //         <div className="chat_body scrollbar" id="style-8">
// //           <div className="force-overflow">
// //             {messages.map((message) => (
// //               <div key={message.id}>
// //                 <p className={`chat_message ${message.name === user.displayName && 'chat_got'}`}>
// //                   <span className="chat_name">{message.name}</span>
// //                   {message.message.startsWith('http') ? (
// //                     <img src={message.message} alt="Sent Image" />
// //                   ) : (
// //                     <span>{message.message}</span>
// //                   )}
// //                   <span className="chat_time">
// //                     {new Date(message.timestamp?.toDate()).toUTCString()}
// //                   </span>
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //           <div ref={messageEndRef}></div>
// //         </div>
// //       </div>
// //       <div className="chat_footer">
// //         <form>
// //           <input
// //             value={userInput}
// //             onChange={(e) => setUserInput(e.target.value)}
// //             type="text"
// //             placeholder="Type a message.."
// //           />
// //           <button onClick={handleSend} type="submit">
// //             Send
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Chat;

// import { useState, useEffect, useRef } from 'react';
// import { collection, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
// import { getFirestore } from 'firebase/firestore';
// import { Avatar } from '@mui/material';
// import './chat.css';
// import { useParams } from 'react-router-dom';
// import firebaseApp from './firebase';
// import db from './firebase'; // Assuming you've made the necessary changes in the `firebase.js` file as mentioned before
// import { addDoc, serverTimestamp, fieldValue } from 'firebase/firestore';
// import { useStateValue } from './StateProvider';
// import notificationSound from './Assets/Notification.mp3';
// import { ref, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { storage } from './firebase';
// import SendFileButton from './sendfile';


// function Chat() {
//   const [userInput, setUserInput] = useState('');
//   const { roomId } = useParams();
//   const [roomName, setRoomName] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [{ user }, dispatch] = useStateValue();
//   const messageEndRef = useRef(null);
//   // const storage = getStorage(app);

//   useEffect(() => {
//     if (roomId) {
//       const roomRef = doc(db, 'rooms', roomId);
//       const messagesQuery = query(collection(roomRef, 'messages'), orderBy('timestamp', 'asc'));

//       const unsubscribeRoom = onSnapshot(roomRef, (snapshot) => {
//         setRoomName(snapshot.data().name);
//       });

//       const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
//         setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//       });

//       return () => {
//         unsubscribeRoom();
//         unsubscribeMessages();
//       };
//     }
//   }, [roomId]);

//   useEffect(() => {
//     messageEndRef.current?.scrollIntoView();
//   }, [messages]);

//   const handleSend = (e) => {
//     e.preventDefault();
//     setUserInput('');

//     if (userInput) {
//       addDoc(collection(doc(db, 'rooms', roomId), 'messages'), {
//         message: userInput,
//         name: user.displayName,
//         timestamp: serverTimestamp(),
//       })
//         .then(() => {
//           console.log('Message sent successfully');
//         })
//         .catch((error) => {
//           console.error('Error sending message:', error);
//         });
//     }
//   };
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     const storageRef = ref(storage, `images/${Date.now()}`);
//     const uploadTask = uploadBytes(storageRef, file);
  
//     uploadTask

//       .then(() => getDownloadURL(storageRef))
//       .then((downloadURL) => {
//         return addDoc(collection(doc(db, 'rooms', roomId), 'messages'), {
//           message: downloadURL,
//           name: user.displayName,
//           timestamp: serverTimestamp(),
//         });
//       })
//       .then(() => {
//         console.log('Image sent successfully');
//       })
//       .catch((error) => {
//         console.error('Error sending image:', error);
//       });
//   };
//   // const handleDocumentUpload = (event) => {
//   //   const file = event.target.files[0];
//   //   // perform any necessary actions with the selected file
//   //   console.log('Selected document:', file);
//   // };
//   const handleDocumentUpload = (e) => {
//     const file = e.target.files[0];
//     const storageRef = ref(storage, `documents/${Date.now()}`);
//     const uploadTask = uploadBytes(storageRef, file);

//     uploadTask
//       .then(() => getDownloadURL(storageRef))
//       .then((downloadURL) => {
//         return addDoc(collection(doc(db, 'rooms', roomId), 'messages'), {
//           message: downloadURL,
//           name: user.displayName,
//           timestamp: serverTimestamp(),
//           type: 'document',
//           fileName: file.name,
//         });
//       })
//       .then(() => {
//         console.log('Document sent successfully');
//       })
//       .catch((error) => {
//         console.error('Error sending document:', error);
//       });
//   };
//   return (
//     <div className="chat">
//       <div className="chat_header">
//         <Avatar />
//         <div className="chat_header_info">
//           <h3>{roomName}</h3>
//         </div>
//       </div>
//       <div id="wrapper">
//         <div className="chat_body scrollbar" id="style-8">
//           <div className="force-overflow">
//             {messages.map((message) => (
//               <div key={message.id}>
//                 <p className={`chat_message ${message.name === user.displayName && 'chat_got'}`}>
//                   <span className="chat_name">{message.name}</span>
//                   {message.message.startsWith('http') ? (
//                     <img src={message.message} alt="Sent Image" className='imageSent'/>
//                   ) : (
//                     <span>{message.message}</span>
//                   )}
//                   <span className="chat_time">
//                     {new Date(message.timestamp?.toDate()).toUTCString()}
//                   </span>
//                 </p>
//               </div>
//             ))}
//           </div>
//           <div ref={messageEndRef}></div>
//         </div>
//       </div>
//       <div className="chat_footer">
//       <form>
//   <input className='inputBox'
//     value={userInput}
//     onChange={(e) => setUserInput(e.target.value)}
//     type="text"
//     placeholder="Type a message.."
//   />
//   <div className='button1'>
//     <button onClick={handleSend} type="submit">
//       Send
//     </button>
//   </div>
//   <div className='button uploadButton'>
//   <label htmlFor="file-upload" className="custom-file-upload">
//     <i className="fa fa-cloud-upload uploadButtons "></i> Docs
//   </label>
//   <input id="file-upload" type="file" onChange={handleDocumentUpload} style={{ display: 'none' }} />
// </div>
// <div className='button uploadButton'>
//   <label htmlFor="image-upload" className="custom-file-upload">
//     <i className="fa fa-cloud-upload uploadButtons "></i> Image
//   </label>
//   <input id="image-upload" type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
// </div>

// </form>
//       </div>
//     </div>
//   );
// }
// export default Chat;


import { useState, useEffect, useRef } from 'react';
import { collection, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { Avatar } from '@mui/material';

import './chat.css';
import { useParams } from 'react-router-dom';
import firebaseApp from './firebase';
import db from './firebase'; // Assuming you've made the necessary changes in the `firebase.js` file as mentioned before
import { addDoc, serverTimestamp, fieldValue } from 'firebase/firestore';
import { useStateValue } from './StateProvider';
import notificationSound from './Assets/Notification.mp3';
import { ref, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import SendFileButton from './sendfile';

function Chat() {
  const [userInput, setUserInput] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (roomId) {
      const roomRef = doc(db, 'rooms', roomId);
      const messagesQuery = query(collection(roomRef, 'messages'), orderBy('timestamp', 'asc'));

      const unsubscribeRoom = onSnapshot(roomRef, (snapshot) => {
        setRoomName(snapshot.data().name);
      });

      const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
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

    if (userInput) {
      addDoc(collection(doc(db, 'rooms', roomId), 'messages'), {
        message: userInput,
        name: user.displayName,
        timestamp: serverTimestamp(),
      })
        .then(() => {
          console.log('Message sent successfully');
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}`);
    const uploadTask = uploadBytes(storageRef, file);

    uploadTask
      .then(() => getDownloadURL(storageRef))
      .then((downloadURL) => {
        return addDoc(collection(doc(db, 'rooms', roomId), 'messages'), {
          message: downloadURL,
          name: user.displayName,
          timestamp: serverTimestamp(),
        });
      })
      .then(() => {
        console.log('Image sent successfully');
      })
      .catch((error) => {
        console.error('Error sending image:', error);
      });
  };

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `documents/${Date.now()}`);
    const uploadTask = uploadBytes(storageRef, file);

    uploadTask
      .then(() => getDownloadURL(storageRef))
      .then((downloadURL) => {
        return addDoc(collection(doc(db, 'rooms', roomId), 'messages'), {
          message: downloadURL,
          name: user.displayName,
          timestamp: serverTimestamp(),
          type: 'document',
          fileName: file.name,
        });
      })
      .then(() => {
        console.log('Document sent successfully');
      })
      .catch((error) => {
        console.error('Error sending document:', error);
      });
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar />
        <div className="chat_header_info">
          <h3>{roomName}</h3>
        </div>
      </div>
      <div id="wrapper">
        <div className="chat_body scrollbar" id="style-8">
          <div className="force-overflow">
            {messages.map((message) => (
              <div key={message.id}>
                <p className={`chat_message ${message.name === user.displayName && 'chat_got'}`}>
                  <span className="chat_name">{message.name}</span>
                  {message.type === 'document' ? (
                    <a href={message.message} target="_blank" rel="noopener noreferrer" className='docSent'>
                      <span>📃</span>{message.fileName}<span>📃</span>
                    </a>
                  ) : message.message.startsWith('http') ? (
                    <img src={message.message} alt="Sent Image" className="imageSent" />
                  ) : (
                    <span>{message.message}</span>
                  )}
                  <span className="chat_time">
                    {new Date(message.timestamp?.toDate()).toUTCString()}
                  </span>
                </p>
              </div>
            ))}
          </div>
          <div ref={messageEndRef}></div>
        </div>
      </div>
      <div className="chat_footer">
        <form>
          <input
            className="inputBox"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            type="text"
            placeholder="Type a message.."
          />
          
          <button onClick={handleSend} type="submit" className="button1">
            <i class="fa fa-paper-plane fa-lg"></i>
          </button>
          
          <div className="button uploadButton">
            <label htmlFor="file-upload" className="custom-file-upload">
              <i className="fa fa-file uploadButtons "></i> Docs
            </label>
            <input id="file-upload" type="file" onChange={handleDocumentUpload} style={{ display: 'none' }} />
          </div>
          <div className="button uploadButton">
            <label htmlFor="image-upload" className="custom-file-upload">
              <i className="fa fa-image uploadButtons "></i> Image
            </label>
            <input id="image-upload" type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
