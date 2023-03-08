// import { Switch } from '@mui/material';
// import { Router } from 'react-router-dom';
// import './App.css';
// import Chat from './Chat';
// import Login_page from './Components/login_page';
// import Sidebar from './Sidebar';
// import { Route } from 'react-router-dom';

// function App() {
//   return (
//     <div className="app">
//       <div className="app_body">
//       <Router>

//         <Switch>

//           <Route path="/app">
//               <Sidebar/>
//               <Chat />
//           </Route>
//           <Route path="/">
//             <h1>Hello World</h1>
//           </Route>

//         </Switch>
      
//       </Router>
//       </div>
//     </div>
//   );
// }

// export default App;


// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import './App.css';
// import Chat from './Chat';
// import Login_page from './Components/login_page';
// import Sidebar from './Sidebar';

// function App() {
//   return (
//     <div className="app">
//       <div className="app_body">
//         <Router>
//           <Routes>
//             <Route path="/app" element={<><Sidebar /><Chat /></>}/>
//             <Route path="/" element={<h1>Hello World</h1>} />
//           </Routes>
//         </Router>
//       </div>
//     </div>
//   );
// }

// export default App;

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Chat from './Chat';
import Login_page from './Components/login_page';
import Login from './Login';
import Sidebar from './Sidebar';
import { useStateValue } from './StateProvider';

function App() {
  // const [user, setUser] = useState(null);
  const [{ user },dispatch] = useStateValue();

  return (
    <div className="app">

        {!user ? (
          <Login />
        ): (
          <div className="app_body">
          <Router>
            <Sidebar />
            <Routes>
              <Route path="/rooms/:roomId" element={<Chat />} />
              <Route path="/" element={<Chat />} />
            </Routes>
          </Router>
        </div>
        )}


    </div>
  );
}

export default App;





