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





