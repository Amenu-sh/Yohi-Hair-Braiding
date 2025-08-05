import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
    { name: "My Booking", path: "/booking-lookup" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg">
              {/* <Scissors className="h-6 w-6 text-white" /> */}
              <img
                src="images/logo.jpg" // Replace with your actual logo path
                alt="Yohi Beauty Salon Logo"
                className="h-10 w-10 rounded-full"
              />
            </div>
            <span className="font-playfair text-xl font-bold gradient-text">
              Yohi Hair Braiding
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "text-pink-600"
                    : "text-gray-700 hover:text-pink-600"
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            {/* <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
                Book Now
              </Button> */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === item.path
                      ? "text-pink-600 bg-pink-50"
                      : "text-gray-700 hover:text-pink-600 hover:bg-pink-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {/* <Button className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
                Book Now
              </Button> */}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
