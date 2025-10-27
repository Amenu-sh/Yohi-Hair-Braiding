import React from "react";
import { Link } from "react-router-dom";
import {
  Scissors,
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-1 rounded-lg">
                {/* <Scissors className="h-6 w-6 text-white" /> */}
                <img
                  src="images/logo.jpg" // Replace with your actual logo path
                  alt="Yohi Beauty Salon Logo"
                  className="h-10 w-10 rounded-full"
                />
              </div>
              <span className="font-playfair text-xl font-bold">
                Yohi Hair Braiding
              </span>
            </div>
            <p className="text-gray-300 text-sm">
              Transform your look with our expert hair braiding and styling
              services. Where beauty meets artistry.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/yohi.hairbraiding?igsh=c2Ywam9yYmxmMHlm"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition-colors cursor-pointer"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/yohi.hairbraiding?igsh=c2Ywam9yYmxmMHlm"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition-colors cursor-pointer"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <div className="bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition-colors cursor-pointer">
                <Twitter className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <span className="font-semibold text-lg mb-4 block">
              Quick Links
            </span>
            <div className="space-y-2">
              <Link
                to="/"
                className="block text-gray-300 hover:text-pink-400 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block text-gray-300 hover:text-pink-400 transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/services"
                className="block text-gray-300 hover:text-pink-400 transition-colors"
              >
                Services
              </Link>
              <Link
                to="/gallery"
                className="block text-gray-300 hover:text-pink-400 transition-colors"
              >
                Gallery
              </Link>
              <Link
                to="/contact"
                className="block text-gray-300 hover:text-pink-400 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <span className="font-semibold text-lg mb-4 block">Services</span>
            <div className="space-y-2 text-gray-300">
              <p>Box Braids</p>
              <p>Cornrows</p>
              <p>French Braids</p>
              <p>Twist Styles</p>
              <p>Protective Styles</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <span className="font-semibold text-lg mb-4 block">
              Contact Info
            </span>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-4 w-4 text-pink-400" />
                <span className="text-sm">
                  4647 Harvest Corner Dr, Richmond, TX 77406
                </span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-4 w-4 text-pink-400" />
                <span className="text-sm">(346) 464-1349</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-4 w-4 text-pink-400" />
                <span className="text-sm">contact@yohihairbraiding.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Yohi Hair Braiding. All rights
            reserved.
          </p>
          <p className="text-gray-400 text-sm">
            Developed by{" "}
            <a
              href="https://amenushi.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Birbirr Inc
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
