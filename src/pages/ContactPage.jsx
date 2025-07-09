
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "📧 Message Sent!",
      description: "🚧 Contact form submission isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Beauty Street', 'Style City, SC 12345'],
      color: 'text-pink-500'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['(555) 123-4567', 'Mon-Sat: 9AM-7PM'],
      color: 'text-purple-500'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@braidedbeauty.com', 'We reply within 24 hours'],
      color: 'text-cyan-500'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['Mon-Fri: 9AM-7PM', 'Sat: 8AM-6PM', 'Sun: Closed'],
      color: 'text-pink-500'
    }
  ];

  const services = [
    'Box Braids',
    'Cornrows',
    'French Braids',
    'Twist Styles',
    'Goddess Braids',
    'Protective Styles',
    'Knotless Braids',
    'Fulani Braids'
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - Braided Beauty Salon</title>
        <meta name="description" content="Get in touch with Braided Beauty salon. Book appointments, ask questions, or visit our location. We're here to help with all your hair braiding needs." />
      </Helmet>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-playfair text-5xl md:text-6xl font-bold gradient-text mb-6">
                Get In Touch
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Ready to transform your look? We'd love to hear from you. 
                Contact us to book an appointment or ask any questions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 glass-effect rounded-2xl hover:shadow-lg transition-shadow"
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mx-auto mb-4`}>
                    <info.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-3">
                    {info.title}
                  </h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-20 bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="glass-effect rounded-2xl p-8">
                  <h2 className="font-playfair text-3xl font-bold gradient-text mb-6">
                    Send Us a Message
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Service Interest
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select a service</option>
                          {services.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors resize-none"
                        placeholder="Tell us about your hair goals, preferred appointment times, or any questions you have..."
                      />
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 text-lg"
                    >
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </motion.div>

              {/* Map & Additional Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Map Placeholder */}
                <div className="glass-effect rounded-2xl p-8">
                  <h3 className="font-playfair text-2xl font-semibold gradient-text mb-4">
                    Find Us
                  </h3>
                  <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                    <img  
                      alt="Map showing Braided Beauty salon location"
                      className="w-full h-full object-cover rounded-lg"
                     src="https://images.unsplash.com/photo-1659641716193-e88e0dc997c2" />
                  </div>
                  <div className="mt-4 p-4 bg-pink-50 rounded-lg">
                    <p className="text-gray-700">
                      <strong>Parking:</strong> Free parking available in front of the salon and nearby street parking.
                    </p>
                  </div>
                </div>

                {/* FAQ */}
                <div className="glass-effect rounded-2xl p-8">
                  <h3 className="font-playfair text-2xl font-semibold gradient-text mb-6">
                    Quick Answers
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        question: 'How far in advance should I book?',
                        answer: 'We recommend booking 1-2 weeks in advance, especially for weekend appointments.'
                      },
                      {
                        question: 'Do you accept walk-ins?',
                        answer: 'We accept walk-ins based on availability, but appointments are preferred.'
                      },
                      {
                        question: 'What should I bring to my appointment?',
                        answer: 'Just bring yourself! We provide all necessary products and tools.'
                      }
                    ].map((faq, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <h4 className="font-medium text-gray-800 mb-2">
                          {faq.question}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-12 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="font-playfair text-2xl font-bold mb-4">
                Need Immediate Assistance?
              </h3>
              <p className="text-lg opacity-90 mb-6">
                For urgent appointment changes or questions, call us directly.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 text-lg"
              >
                Call (555) 123-4567
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;
