// Simple booking data management utility
// In a real application, this would be connected to a backend API

import emailjs from "@emailjs/browser";

class BookingManager {
  constructor() {
    this.bookings = this.loadBookings();
  }

  // Load bookings from localStorage (simulates database)
  loadBookings() {
    try {
      const stored = localStorage.getItem("hair_salon_bookings");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading bookings:", error);
      return [];
    }
  }

  // Save bookings to localStorage (simulates database)
  saveBookings() {
    try {
      localStorage.setItem(
        "hair_salon_bookings",
        JSON.stringify(this.bookings)
      );
    } catch (error) {
      console.error("Error saving bookings:", error);
    }
  }

  // Generate unique booking ID
  generateBookingId() {
    return (
      "BK" + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase()
    );
  }

  // Create a new booking
  createBooking(bookingData) {
    const booking = {
      id: this.generateBookingId(),
      ...bookingData,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.bookings.push(booking);
    this.saveBookings();

    return booking;
  }

  // Get all bookings
  getAllBookings() {
    return this.bookings;
  }

  // Get booking by ID
  getBookingById(id) {
    return this.bookings.find((booking) => booking.id === id);
  }

  // Get bookings by date
  getBookingsByDate(date) {
    return this.bookings.filter((booking) => booking.date === date);
  }

  // Get bookings by service
  getBookingsByService(service) {
    return this.bookings.filter((booking) => booking.service === service);
  }

  // Update booking status
  updateBookingStatus(id, status) {
    const booking = this.getBookingById(id);
    if (booking) {
      booking.status = status;
      booking.updatedAt = new Date().toISOString();
      this.saveBookings();
      return booking;
    }
    return null;
  }

  // Check if time slot is available
  isTimeSlotAvailable(date, time) {
    const existingBookings = this.getBookingsByDate(date);
    return !existingBookings.some(
      (booking) => booking.time === time && booking.status !== "cancelled"
    );
  }

  // Get available time slots for a date
  getAvailableTimeSlots(date) {
    const allSlots = [
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

    const bookedSlots = this.getBookingsByDate(date)
      .filter((booking) => booking.status !== "cancelled")
      .map((booking) => booking.time);

    return allSlots.filter((slot) => !bookedSlots.includes(slot));
  }

  // Delete/Cancel booking
  cancelBooking(id) {
    const booking = this.getBookingById(id);
    if (booking) {
      booking.status = "cancelled";
      booking.updatedAt = new Date().toISOString();
      this.saveBookings();
      return booking;
    }
    return null;
  }

  // Get booking statistics
  getBookingStats() {
    const total = this.bookings.length;
    const pending = this.bookings.filter((b) => b.status === "pending").length;
    const confirmed = this.bookings.filter(
      (b) => b.status === "confirmed"
    ).length;
    const completed = this.bookings.filter(
      (b) => b.status === "completed"
    ).length;
    const cancelled = this.bookings.filter(
      (b) => b.status === "cancelled"
    ).length;

    return {
      total,
      pending,
      confirmed,
      completed,
      cancelled,
    };
  }

  // Send confirmation email (simulation)
  sendConfirmationEmail(booking) {
    console.log(`📧 Confirmation email sent for booking ${booking.id}`);
    console.log(`To: ${booking.email}`);
    console.log(`Service: ${booking.service}`);
    console.log(`Date: ${booking.date} at ${booking.time}`);

    // Also send notification to business email
    this.sendBusinessNotification(booking);

    // In a real app, this would integrate with an email service like SendGrid, Mailgun, etc.
    return true;
  }

  // Send business notification email using EmailJS
  async sendBusinessNotification(booking) {
    const businessEmail =
      import.meta.env.VITE_BUSINESS_EMAIL || "contact@yohihairbraiding.com";

    try {
      // Prepare email data for your EmailJS template
      const templateParams = {
        to_name: "Yohi Hair Braiding Team",
        from_name: booking.customerName,
        from_email: booking.email,
        time: `${booking.date} at ${booking.time}`,
        message: this.formatBookingMessage(booking),
        to_email: businessEmail,
      };

      // Send email using EmailJS
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log("✅ Business notification email sent successfully:", result);
      return result;
    } catch (error) {
      console.error("❌ Failed to send business notification email:", error);

      // Fallback: log the booking details
      console.log(
        `📬 Fallback: Business notification for booking ${booking.id}`
      );
      console.log(`Customer: ${booking.customerName} (${booking.email})`);
      console.log(
        `Service: ${booking.service} on ${booking.date} at ${booking.time}`
      );

      return false;
    }
  }

  // Format booking details for email message
  formatBookingMessage(booking) {
    return `
🆔 Booking ID: ${booking.id}
✂️ Service: ${booking.service.replace(/-/g, " ")}
📅 Date: ${booking.date}
⏰ Time: ${booking.time}
📱 Phone: ${booking.phone}

💇‍♀️ Hair Details:
• Length: ${booking.hairLength}
• Texture: ${booking.hairTexture}

${
  booking.specialRequests
    ? `📝 Special Requests: ${booking.specialRequests}`
    : ""
}

${
  booking.address
    ? `🏠 Address: ${booking.address}${
        booking.city ? `, ${booking.city}` : ""
      }${booking.zipCode ? ` ${booking.zipCode}` : ""}`
    : ""
}

📧 Status: ${booking.status}
🕐 Booked: ${new Date(booking.createdAt).toLocaleString()}

Please contact the customer to confirm this appointment.
    `.trim();
  }

  // Send reminder email (simulation)
  sendReminderEmail(booking) {
    console.log(`🔔 Reminder email sent for booking ${booking.id}`);
    console.log(`To: ${booking.email}`);
    console.log(`Reminder: Your appointment is tomorrow at ${booking.time}`);

    return true;
  }
}

// Create singleton instance
const bookingManager = new BookingManager();

export default bookingManager;
