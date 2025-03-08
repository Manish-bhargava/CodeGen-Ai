import React from "react";
import { Linkedin, Instagram, Mail } from "lucide-react"; // Ensure lucide-react is installed

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">E-learning</h3>
            <p className="text-gray-400">The only platform an Educator and Student need.</p>
            <p className="text-gray-400 mt-4">
              &copy; {new Date().getFullYear()} Manish Bhargav. All rights reserved.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:bhargavamanish908@gmail.com"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                  aria-label="Send an email to bhargavamanish908@gmail.com"
                >
                  <Mail className="mr-2 w-5 h-5" />
                  bhargavamanish908@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/manish-bhargava-36093a2b7/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Visit our LinkedIn profile"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/manish_bhargav"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Visit our Instagram profile"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
