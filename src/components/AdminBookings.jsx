import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import bookingManager from "@/lib/bookingManager";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    const allBookings = bookingManager.getAllBookings();
    setBookings(allBookings);
    setStats(bookingManager.getBookingStats());
  };

  const handleStatusChange = (bookingId, newStatus) => {
    bookingManager.updateBookingStatus(bookingId, newStatus);
    loadBookings();
    toast({
      title: "✅ Status Updated",
      description: `Booking status changed to ${newStatus}`,
    });
  };

  const filteredBookings =
    selectedStatus === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === selectedStatus);

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl font-bold text-gray-800 mb-2">
          Booking Management
        </h1>
        <p className="text-gray-600">
          Manage your salon appointments and bookings
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Bookings</h3>
          <p className="text-2xl font-bold text-gray-800">{stats.total || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {stats.pending || 0}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Confirmed</h3>
          <p className="text-2xl font-bold text-green-600">
            {stats.confirmed || 0}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Completed</h3>
          <p className="text-2xl font-bold text-blue-600">
            {stats.completed || 0}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Cancelled</h3>
          <p className="text-2xl font-bold text-red-600">
            {stats.cancelled || 0}
          </p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", "pending", "confirmed", "completed", "cancelled"].map(
          (status) => (
            <Button
              key={status}
              variant={selectedStatus === status ? "default" : "outline"}
              onClick={() => setSelectedStatus(status)}
              className={`capitalize ${
                selectedStatus === status
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                  : "border-pink-300 text-pink-600 hover:bg-pink-50"
              }`}
            >
              {status}
            </Button>
          )
        )}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">
              No bookings found for the selected filter.
            </p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-semibold text-lg text-gray-800">
                      {booking.customerName}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </span>
                    <span className="text-sm text-gray-500">#{booking.id}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{booking.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{booking.email}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className="font-medium text-pink-600 capitalize">
                      {booking.service.replace(/-/g, " ")}
                    </span>
                    <span className="text-gray-500 mx-2">•</span>
                    <span className="text-gray-600">
                      {booking.hairLength} hair, {booking.hairTexture} texture
                    </span>
                  </div>

                  {booking.specialRequests && (
                    <div className="mt-2 text-sm text-gray-600">
                      <strong>Notes:</strong> {booking.specialRequests}
                    </div>
                  )}
                </div>

                <div className="flex flex-col lg:flex-row gap-2">
                  {booking.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() =>
                          handleStatusChange(booking.id, "confirmed")
                        }
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleStatusChange(booking.id, "cancelled")
                        }
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  {booking.status === "confirmed" && (
                    <Button
                      size="sm"
                      onClick={() =>
                        handleStatusChange(booking.id, "completed")
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Mark Complete
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminBookings;
