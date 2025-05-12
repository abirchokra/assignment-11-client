import React from 'react';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="text-center bg-gray-100 flex flex-col justify-center items-center space-y-2  w-full mx-auto p-8">
        <HiOutlineEmojiSad className="w-16 h-16" />
        <h1 className="text-4xl">404</h1>
        <p>Page not found</p>
        <p>The page you are looking for doesn't exist or an other error occurred. <span className="font-bold underline"><Link to={'/'}>Go back</Link></span> or head over to manage@mate.com to choose a new direction. </p>
    
    </div>
    );
};

export default Error;