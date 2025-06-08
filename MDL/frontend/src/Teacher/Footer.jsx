import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold">About Us</h2>
            <p className="mt-2 text-sm">
              MDL Classes is dedicated to providing high-quality education and learning resources.
              Our mission is to empower students with knowledge and skills to excel in their careers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold">Quick Links</h2>
            <ul className="mt-2 space-y-2 text-sm">
              <li><a href="/about" className="hover:text-gray-300 transition duration-300">About</a></li>
              {/* <li><a href="/courses" className="hover:text-gray-300 transition duration-300">Courses</a></li> */}
              <li><a href="/contact" className="hover:text-gray-300 transition duration-300">Contact</a></li>
              <li><a href="/faq" className="hover:text-gray-300 transition duration-300">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mt-2 space-y-2 text-sm">
            <h2 className="text-lg font-semibold">Contact Us</h2>
            <p className="mt-2 text-sm flex items-center gap-2 hover:text-gray-300 transition duration-300">
              <FaEnvelope className="text-yellow-400" /> contact@mdlclasses.com
            </p>
            <p className="text-sm flex items-center gap-2 hover:text-gray-300 transition duration-300">
              <FaPhone className="text-blue-400" /> +1 234 567 890
            </p>
            <p className="text-sm flex items-center gap-2 hover:text-gray-300 transition duration-300">
              <FaMapMarkerAlt className="text-red-500" /> 123 Learning St, Knowledge City
            </p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-6 flex justify-center space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-300 transition duration-300 text-xl">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-200 transition duration-300 text-xl">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-300 transition duration-300 text-xl">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-500 transition duration-300 text-xl">
            <FaLinkedin />
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-white/30 pt-4 text-center text-sm">
          &copy; {new Date().getFullYear()} MDL Classes. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
