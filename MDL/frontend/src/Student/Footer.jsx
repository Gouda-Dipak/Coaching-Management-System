import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'; // Import icons from react-icons/fa

function Footer() {
  return (
    
    <footer className="bg-black text-white py-3 text-center text-sm">
      <p className="mb-4">© 2025 Your Company. All Rights Reserved.</p>
        <div className="flex justify-center space-x-6">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="w-8 h-8 text-blue hover:text-black-800 transition-all duration-300" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="w-8 h-8 text-blue hover:text-black-600 transition-all duration-300" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="w-8 h-8 text-blue hover:text-black-900 transition-all duration-300" />
          </a>
          <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
            <FaGithub className="w-8 h-8 text-blue hover:text-blue-800 transition-all duration-300" />
          </a>
        </div>
    </footer>
  );
}

export default Footer;

