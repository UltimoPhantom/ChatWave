import React from 'react'
import "./Login.css";
import { Button } from '@mui/material';
import { auth, provider, signInWithPopup } from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';
import chatWaveLogo from './Assets/logo.png';

function Login() {

    const [{},dispatch] = useStateValue();

    const signIn = () => {
        signInWithPopup(auth, provider)
          .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
          })
          .catch((error) => alert(error.message));
      };

  return (
    <div className="login">
        
        <div className="login_box">
            <h1 id="welcome_to">Welcome to</h1>
            <img class="logo"
                src={ chatWaveLogo }
            />
            <div className="sign_in">
                Sign in to ChatWave
            </div>

            <Button onClick = {signIn}>
                Sign in with &nbsp; <i class="fa-brands fa-google fa-xl"></i>
            </Button>
        </div>
    </div>
  )
}

export default Login