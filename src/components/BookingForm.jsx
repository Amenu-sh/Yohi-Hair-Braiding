import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import bookingManager from "@/lib/bookingManager";

const BookingForm = ({ isOpen, onClose, selectedService = null }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: selectedService || "",
    date: "",
    time: "",
    hairLength: "",
    hairTexture: "",
    specialRequests: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);

  // Security validation functions
  const detectSpam = (text) => {
    const spamKeywords = [
      "casino",
      "lottery",
      "winner",
      "congratulations",
      "click here",
      "free money",
      "make money",
      "work from home",
      "viagra",
      "crypto",
      "bitcoin",
      "investment",
      "loan",
      "credit",
      "debt",
      "insurance",
      "seo",
      "marketing",
      "promotion",
      "offer expires",
      "limited time",
      "act now",
      "urgent",
      "immediate",
      "guarantee",
      "risk free",
    ];

    const lowerText = text.toLowerCase();
    const spamCount = spamKeywords.filter((keyword) =>
      lowerText.includes(keyword)
    ).length;
    const linkCount = (text.match(/https?:\/\//g) || []).length;
    const capsRatio = (text.match(/[A-Z]/g) || []).length / text.length;

    return spamCount >= 2 || linkCount >= 2 || capsRatio > 0.5;
  };

  const checkRateLimit = () => {
    const now = Date.now();
    const timeSinceLastSubmission = now - lastSubmissionTime;
    const minInterval = 60000; // 1 minute between booking submissions

    return timeSinceLastSubmission >= minInterval;
  };

  const sanitizeInput = (data) => {
    return {
      firstName: data.firstName.trim().substring(0, 50),
      lastName: data.lastName.trim().substring(0, 50),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim().replace(/[^\d\+\-\(\)\s]/g, ""),
      service: data.service,
      date: data.date,
      time: data.time,
      hairLength: data.hairLength,
      hairTexture: data.hairTexture,
      specialRequests: data.specialRequests.trim().substring(0, 500),
      address: data.address.trim().substring(0, 200),
      city: data.city.trim().substring(0, 100),
      zipCode: data.zipCode.trim().substring(0, 10),
    };
  };

  const services = [
    {
      value: "box-braids",
      label: "Box Braids ($120-180)",
      duration: "4-6 hours",
    },
    { value: "cornrows", label: "Cornrows ($80-120)", duration: "2-4 hours" },
    {
      value: "fulani-braids",
      label: "Fulani Braids ($60-90)",
      duration: "1-2 hours",
    },
    {
      value: "twist-styles",
      label: "Twist Styles ($70-110)",
      duration: "3-5 hours",
    },
    {
      value: "goddess-braids",
      label: "Goddess Braids ($100-140)",
      duration: "3-4 hours",
    },
    {
      value: "senegalese-twists",
      label: "Senegalese Twists ($90-150)",
      duration: "2-5 hours",
    },
    {
      value: "knotless-braids",
      label: "Knotless Braids ($150-220)",
      duration: "5-7 hours",
    },
    {
      value: "fulani-braids-premium",
      label: "Fulani Braids Premium ($130-170)",
      duration: "4-6 hours",
    },
  ];

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const hairLengths = ["Short", "Medium", "Long", "Extra Long"];
  const hairTextures = ["Fine", "Medium", "Thick", "Coarse"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.service) newErrors.service = "Please select a service";
    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.time) newErrors.time = "Please select a time";
    if (!formData.hairLength)
      newErrors.hairLength = "Please select hair length";
    if (!formData.hairTexture)
      newErrors.hairTexture = "Please select hair texture";

    // Length validation
    if (formData.firstName.length > 50)
      newErrors.firstName = "First name too long";
    if (formData.lastName.length > 50)
      newErrors.lastName = "Last name too long";
    if (formData.specialRequests.length > 500)
      newErrors.specialRequests = "Special requests too long";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (basic)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (
      formData.phone &&
      !phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Date validation (not in the past)
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Please select a future date";
      }
    }

    // Spam detection
    if (
      detectSpam(
        formData.firstName +
          " " +
          formData.lastName +
          " " +
          formData.specialRequests
      )
    ) {
      newErrors.general =
        "Invalid input detected. Please use appropriate language.";
    }

    // Check for suspicious patterns
    if (
      formData.firstName.includes("http") ||
      formData.lastName.includes("http") ||
      formData.email.includes("..") ||
      formData.specialRequests.includes("http")
    ) {
      newErrors.general = "Suspicious input detected";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Rate limiting check
    if (!checkRateLimit()) {
      toast({
        title: "⏰ Please Wait",
        description: "Please wait 1 minute before submitting another booking.",
        variant: "destructive",
      });
      return;
    }

    if (!validateForm()) {
      toast({
        title: "❌ Validation Error",
        description:
          errors.general || "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setLastSubmissionTime(Date.now());

    try {
      // Sanitize input data
      const sanitizedData = sanitizeInput(formData);

      // Check if time slot is still available
      if (
        !bookingManager.isTimeSlotAvailable(
          sanitizedData.date,
          sanitizedData.time
        )
      ) {
        toast({
          title: "❌ Time Slot Unavailable",
          description:
            "This time slot has been taken. Please select another time.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Create booking with sanitized data
      const bookingData = {
        customerName: `${sanitizedData.firstName} ${sanitizedData.lastName}`,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        service: sanitizedData.service,
        date: sanitizedData.date,
        time: sanitizedData.time,
        hairLength: sanitizedData.hairLength,
        hairTexture: sanitizedData.hairTexture,
        specialRequests: sanitizedData.specialRequests,
        address: sanitizedData.address,
        city: sanitizedData.city,
        zipCode: sanitizedData.zipCode,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent.substring(0, 200), // For security tracking
      };

      const newBooking = bookingManager.createBooking(bookingData);

      // Send email notification
      await bookingManager.sendBusinessNotification(newBooking);

      toast({
        title: "✅ Booking Confirmed!",
        description: `Your appointment for ${bookingData.service} on ${bookingData.date} at ${bookingData.time} has been confirmed. Booking ID: ${newBooking.id}`,
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: selectedService || "",
        date: "",
        time: "",
        hairLength: "",
        hairTexture: "",
        specialRequests: "",
        address: "",
        city: "",
        zipCode: "",
      });

      // Close modal after a short delay
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Booking submission error:", error);
      toast({
        title: "❌ Booking Failed",
        description:
          "There was an error processing your booking. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get available time slots for selected date
  const getAvailableTimeSlots = () => {
    if (!formData.date) return [];
    return bookingManager.getAvailableTimeSlots(formData.date);
  };
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center rounded-t-2xl">
          <h2 className="font-playfair text-2xl font-bold gradient-text">
            Book Your Appointment
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800 flex items-center">
              <User className="h-5 w-5 mr-2 text-pink-600" />
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Service Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-pink-600" />
              Service & Appointment
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Service *
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                  errors.service ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Choose a service...</option>
                {services.map((service) => (
                  <option key={service.value} value={service.value}>
                    {service.label} - {service.duration}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="text-red-500 text-xs mt-1">{errors.service}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={getMinDate()}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    errors.date ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time *
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    errors.time ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select time...</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p className="text-red-500 text-xs mt-1">{errors.time}</p>
                )}
              </div>
            </div>
          </div>

          {/* Hair Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800">
              Hair Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hair Length *
                </label>
                <select
                  name="hairLength"
                  value={formData.hairLength}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    errors.hairLength ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select length...</option>
                  {hairLengths.map((length) => (
                    <option key={length} value={length}>
                      {length}
                    </option>
                  ))}
                </select>
                {errors.hairLength && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.hairLength}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hair Texture *
                </label>
                <select
                  name="hairTexture"
                  value={formData.hairTexture}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    errors.hairTexture ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select texture...</option>
                  {hairTextures.map((texture) => (
                    <option key={texture} value={texture}>
                      {texture}
                    </option>
                  ))}
                </select>
                {errors.hairTexture && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.hairTexture}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Requests or Notes
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Any special requests, allergies, or additional information..."
              />
            </div>
          </div>

          {/* Address (Optional) */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-pink-600" />
              Address (Optional)
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="123 Main Street"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="New York"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="10001"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t">
            {/* General Error Display */}
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">⚠️ {errors.general}</p>
              </div>
            )}

            <div className="mb-4 p-3 bg-pink-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>📧 What happens next:</strong> Your booking request will
                be sent to our team at
                <span className="font-medium text-pink-600">
                  {" "}
                  contact@yohihairbraiding.com
                </span>
                . We'll contact you within 24 hours to confirm your appointment
                and answer any questions.
              </p>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 text-lg"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default BookingForm;
