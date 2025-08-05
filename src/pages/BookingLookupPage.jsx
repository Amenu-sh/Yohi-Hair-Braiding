import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import bookingManager from "@/lib/bookingManager";

const BookingLookupPage = () => {
  const [searchId, setSearchId] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [booking, setBooking] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchId.trim() && !searchEmail.trim()) {
      toast({
        title: "❌ Search Error",
        description: "Please enter either a booking ID or email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);

    try {
      let foundBooking = null;

      if (searchId.trim()) {
        foundBooking = bookingManager.getBookingById(searchId.trim());
      } else if (searchEmail.trim()) {
        const allBookings = bookingManager.getAllBookings();
        foundBooking = allBookings.find(
          (b) => b.email.toLowerCase() === searchEmail.trim().toLowerCase()
        );
      }

      if (foundBooking) {
        setBooking(foundBooking);
        toast({
          title: "✅ Booking Found",
          description: "Your booking details are displayed below.",
        });
      } else {
        setBooking(null);
        toast({
          title: "❌ Booking Not Found",
          description:
            "No booking found with the provided information. Please check your booking ID or email.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "❌ Search Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "text-green-600 bg-green-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      case "completed":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-yellow-600 bg-yellow-100";
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case "pending":
        return "Your booking is pending confirmation. We'll contact you soon!";
      case "confirmed":
        return "Your booking is confirmed! We look forward to seeing you.";
      case "cancelled":
        return "This booking has been cancelled. Contact us if you need assistance.";
      case "completed":
        return "Thank you for visiting us! We hope you love your new style.";
      default:
        return "Booking status unknown.";
    }
  };

  return (
    <>
      <Helmet>
        <title>Booking Lookup - Braided Beauty Salon</title>
        <meta
          name="description"
          content="Look up your hair salon booking details using your booking ID or email address."
        />
      </Helmet>

      <div className="pt-16 min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-50">
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-playfair text-5xl md:text-6xl font-bold gradient-text mb-6">
                Booking Lookup
              </h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Enter your booking ID or email address to view your appointment
                details.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search Form */}
        <section className="pb-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <form onSubmit={handleSearch} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Booking ID
                  </label>
                  <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter your booking ID (e.g., BK123456)"
                  />
                </div>

                <div className="text-center text-gray-500">
                  <span>- OR -</span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSearching}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 text-lg"
                >
                  {isSearching ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Searching...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Search className="h-5 w-5 mr-2" />
                      Find My Booking
                    </div>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Booking Details */}
            {booking && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-8 bg-white rounded-2xl shadow-lg p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-playfair text-2xl font-bold text-gray-800">
                    Booking Details
                  </h2>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    {getStatusMessage(booking.status)}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-gray-800">
                      Appointment Information
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-pink-600" />
                        <div>
                          <span className="font-medium">Date:</span>
                          <span className="ml-2">{booking.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-pink-600" />
                        <div>
                          <span className="font-medium">Time:</span>
                          <span className="ml-2">{booking.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-pink-600" />
                        <div>
                          <span className="font-medium">Service:</span>
                          <span className="ml-2 capitalize">
                            {booking.service.replace(/-/g, " ")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-gray-800">
                      Contact Information
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-pink-600" />
                        <div>
                          <span className="font-medium">Name:</span>
                          <span className="ml-2">{booking.customerName}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-pink-600" />
                        <div>
                          <span className="font-medium">Email:</span>
                          <span className="ml-2">{booking.email}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-pink-600" />
                        <div>
                          <span className="font-medium">Phone:</span>
                          <span className="ml-2">{booking.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-lg text-gray-800 mb-3">
                    Hair Details
                  </h3>
                  <p className="text-gray-600">
                    <span className="font-medium">Length:</span>{" "}
                    {booking.hairLength} •
                    <span className="font-medium ml-2">Texture:</span>{" "}
                    {booking.hairTexture}
                  </p>

                  {booking.specialRequests && (
                    <div className="mt-3">
                      <span className="font-medium">Special Requests:</span>
                      <p className="text-gray-600 mt-1">
                        {booking.specialRequests}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t text-sm text-gray-500">
                  <p>
                    <span className="font-medium">Booking ID:</span>{" "}
                    {booking.id}
                  </p>
                  <p>
                    <span className="font-medium">Created:</span>{" "}
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-gray-600 mb-4">
                    Need to make changes or have questions about your
                    appointment?
                  </p>
                  <Button
                    variant="outline"
                    className="border-pink-300 text-pink-600 hover:bg-pink-50"
                  >
                    Contact Us
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default BookingLookupPage;
