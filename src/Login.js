import React from 'react'
import "./Login.css";
import { Button } from '@mui/material';
import { auth, provider, signInWithPopup } from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

function Login() {

    // const signIn = () => {
    //     auth.signInWithPopup(provider).then(result => console.log(result)
    //     ).catch(error => alert(error.messages));
    // };

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
            <img
                src='https://live.staticflickr.com/65535/52731848639_6c2696a6ce_b.jpg'
            />
            <div className="login_test">
                <h1>Sign in to ChatWave</h1>
            </div>

            <Button onClick = {signIn}>
                Sign In With Google
            </Button>
        </div>
    </div>
  )
}

export default Login