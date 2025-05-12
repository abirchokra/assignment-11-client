import { FaFacebookF, FaInstagram, FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

const TopBar = () => {
    return (
        <div className="bg-blue-700 max-w-full text-white py-2 text-sm space-y-3">
            
            <div className="flex flex-col justify-center items-center space-x-2 mb-2 md:mb-0">
                <span className='text-2xl'>just a call for better living</span>
                <span className="flex items-center">
                    <FaPhoneAlt className="ml-2" />
                    <span className="ml-1">01788-88888</span>
                </span>
            </div>

         
            <div className="flex justify-center items-center space-x-4 mt-2 md:mt-0 md:ml-auto">
                <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-300"
                >
                    <FaFacebookF />
                </a>
                <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-300"
                >
                    <FaInstagram />
                </a>
                <a
                    href="https://www.whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-300"
                >
                    <FaWhatsapp />
                </a>
            </div>
        </div>
    );
};

export default TopBar;
