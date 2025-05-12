import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const SocialLogin = () => {
    const { signInWithGoogle } = useContext(AuthContext);
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(res => {
                console.log(res.user)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div>
            <button onClick={handleGoogleSignIn} className='btn w-full'>Google</button>
        </div>
    );
};

export default SocialLogin;