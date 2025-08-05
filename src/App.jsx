import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage.jsx";
import AboutPage from "@/pages/AboutPage.jsx";
import ServicesPage from "@/pages/ServicesPage.jsx";
import GalleryPage from "@/pages/GalleryPage.jsx";
import ContactPage from "@/pages/ContactPage.jsx";
import BookingLookupPage from "@/pages/BookingLookupPage.jsx";
import AdminBookings from "@/components/AdminBookings.jsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/booking-lookup" element={<BookingLookupPage />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
