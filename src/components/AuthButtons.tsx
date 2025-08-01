import React from 'react';
import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import './AuthButtons.css';

const AuthButtons: React.FC = () => {
  return (
    <div className="auth-buttons">
      <SignInButton mode="modal">
        <button className="sign-in-button">Sign In</button>
      </SignInButton>
      
      <SignUpButton mode="modal">
        <button className="sign-up-button">Sign Up</button>
      </SignUpButton>
    </div>
  );
};

export default AuthButtons;