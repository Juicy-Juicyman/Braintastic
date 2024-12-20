import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-purple-500 p-6 text-center">
      <div className="flex justify-center space-x-6 mb-4">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-900"
        >
          <FaFacebook size={24} />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-900"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-900"
        >
          <FaInstagram size={24} />
        </a>
      </div>
      <div className="mb-4">
        <p className="text-white font-medium hover:text-gray-900">
          Contact us: <span className="font-bold">info@braintastic.com</span>
        </p>
        <p className="text-white font-medium hover:text-gray-900">
          Phone: <span className="font-bold">+123 456 7890</span>
        </p>
      </div>
      <div>
        <p className="text-white font-medium hover:text-gray-900">
          © {new Date().getFullYear()} Braintastic. All rights reserved.
        </p>
        <p className="text-sm text-white font-medium hover:text-gray-900">
          Made with ❤️ for learning and fun!
        </p>
      </div>
    </footer>
  );
}
