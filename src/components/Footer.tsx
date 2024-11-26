import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-400 to-fuchsia-200 p-6 text-center">
      <div className="flex justify-center space-x-6 mb-4">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-gray-900"
        >
          <FaFacebook size={24} />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-gray-900"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-gray-900"
        >
          <FaInstagram size={24} />
        </a>
      </div>
      <div className="mb-4">
        <p className="text-gray-700 font-medium">
          Contact us: <span className="font-bold">info@braintastic.com</span>
        </p>
        <p className="text-gray-700 font-medium">
          Phone: <span className="font-bold">+123 456 7890</span>
        </p>
      </div>
      <div>
        <p className="text-gray-700 font-medium">
          © {new Date().getFullYear()} Braintastic. All rights reserved.
        </p>
        <p className="text-sm text-gray-500">
          Made with ❤️ for learning and fun!
        </p>
      </div>
    </footer>
  );
}
