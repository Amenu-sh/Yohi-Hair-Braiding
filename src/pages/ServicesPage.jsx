import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import BookingForm from "@/components/BookingForm";

const ServicesPage = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      name: "Box Braids",
      description:
        "Classic protective style perfect for all occasions. Available in various lengths and thicknesses.",
      duration: "4-6 hours",
      price: "$120-180",
      image: "/images/gallery/hair-styling1.jpg",
      features: [
        "Protective styling",
        "Long-lasting",
        "Low maintenance",
        "Versatile styling",
      ],
    },
    {
      id: 2,
      name: "Cornrows",
      description:
        "Intricate braided patterns close to the scalp. Custom designs available.",
      duration: "2-4 hours",
      price: "$80-120",
      image: "/images/gallery/cornrows.jpg",
      features: [
        "Scalp-friendly",
        "Custom patterns",
        "Professional finish",
        "Durable style",
      ],
    },
    {
      id: 3,
      name: "Fulani braids",
      description:
        "Elegant braiding technique suitable for formal and casual occasions.",
      duration: "1-2 hours",
      price: "$60-90",
      image: "/images/gallery/fulani-1:2-1:2.jpg",
      features: [
        "Classic elegance",
        "Quick styling",
        "Versatile looks",
        "All hair types",
      ],
    },
    {
      id: 4,
      name: "Twist Styles",
      description:
        "Natural texture enhancement with two-strand twists and Senegalese twists.",
      duration: "3-5 hours",
      price: "$70-110",
      image: "/images/gallery/Twists.jpg",
      features: [
        "Natural enhancement",
        "Gentle on hair",
        "Multiple variations",
        "Healthy styling",
      ],
    },
    {
      id: 5,
      name: "Goddess Braids",
      description: "Thick, chunky braids that make a bold fashion statement.",
      duration: "3-4 hours",
      price: "$100-140",
      image: "/images/gallery/Godes-Boho-knotles.jpg",
      features: [
        "Bold statement",
        "Thick braids",
        "Fashion-forward",
        "Eye-catching",
      ],
    },
    {
      id: 6,
      name: "Senegalese twists",
      description:
        "Various protective styling options to maintain hair health while looking fabulous.",
      duration: "2-5 hours",
      price: "$90-150",
      image: "/images/gallery/hair-styling3.jpg",
      features: [
        "Hair protection",
        "Health-focused",
        "Style variety",
        "Growth promotion",
      ],
    },
    {
      id: 7,
      name: "Knotless Braids",
      description:
        "Modern braiding technique that reduces tension and provides a more natural look.",
      duration: "5-7 hours",
      price: "$150-220",
      image: "/images/gallery/knotles-braids.jpg",
      features: [
        "Reduced tension",
        "Natural appearance",
        "Comfortable wear",
        "Modern technique",
      ],
    },
    {
      id: 8,
      name: "Fulani Braids",
      description:
        "Traditional African braiding style with decorative beads and accessories.",
      duration: "4-6 hours",
      price: "$130-170",
      image: "/images/gallery/fulani-1:2-1:2.jpg",
      features: [
        "Cultural heritage",
        "Decorative elements",
        "Unique patterns",
        "Artistic flair",
      ],
    },
  ];

  const handleBookService = (serviceName) => {
    // Map service names to form values
    const serviceMap = {
      "Box Braids": "box-braids",
      Cornrows: "cornrows",
      "Fulani braids": "fulani-braids",
      "Twist Styles": "twist-styles",
      "Goddess Braids": "goddess-braids",
      "Senegalese twists": "senegalese-twists",
      "Knotless Braids": "knotless-braids",
      "Fulani Braids": "fulani-braids-premium",
    };

    setSelectedService(
      serviceMap[serviceName] || serviceName.toLowerCase().replace(/\s+/g, "-")
    );
    setIsBookingOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Hair Braiding Services - Braided Beauty Salon</title>
        <meta
          name="description"
          content="Explore our comprehensive range of hair braiding and styling services including box braids, cornrows, protective styles, and more. Expert stylists, premium results."
        />
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
                Our Services
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Discover our comprehensive range of professional hair braiding
                and styling services, each designed to enhance your natural
                beauty and protect your hair.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="glass-effect rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    {/* Service Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        alt={service.image}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        src={service.image}
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-pink-600 font-bold text-sm">
                          {service.price}
                        </span>
                      </div>
                    </div>

                    {/* Service Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-playfair text-2xl font-semibold text-gray-800">
                          {service.name}
                        </h3>
                        <div className="flex items-center space-x-1 text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm text-gray-600">4.9</span>
                        </div>
                      </div>

                      <p className="text-gray-600">{service.description}</p>

                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{service.duration}</span>
                      </div>

                      {/* Features */}
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-700">
                          Features:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {service.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                        onClick={() => handleBookService(service.name)}
                      >
                        Book This Service
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Process Section */}
        <section className="py-20 bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-playfair text-4xl md:text-5xl font-bold gradient-text mb-4">
                Our Service Process
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From consultation to final styling, we ensure every step meets
                our high standards.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Consultation",
                  description:
                    "We discuss your hair goals, lifestyle, and preferred styles to create the perfect plan.",
                },
                {
                  step: "02",
                  title: "Preparation",
                  description:
                    "Hair is properly cleansed, conditioned, and prepared for the braiding process.",
                },
                {
                  step: "03",
                  title: "Styling",
                  description:
                    "Our expert stylists create your chosen look with precision and artistic flair.",
                },
                {
                  step: "04",
                  title: "Finishing",
                  description:
                    "Final touches, styling tips, and maintenance advice to keep your look perfect.",
                },
              ].map((process, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold text-lg">
                        {process.step}
                      </span>
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-pink-300 to-purple-300" />
                    )}
                  </div>
                  <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-3">
                    {process.title}
                  </h3>
                  <p className="text-gray-600">{process.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-playfair text-4xl md:text-5xl font-bold">
                Ready to Transform Your Look?
              </h2>
              <p className="text-xl opacity-90">
                Book your appointment today and experience the artistry of
                professional hair braiding.
              </p>
              <Button
                size="lg"
                className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 text-lg"
                onClick={() => setIsBookingOpen(true)}
              >
                Book Your Appointment
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Booking Form Modal */}
        <BookingForm
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          selectedService={selectedService}
        />
      </div>
    </>
  );
};

export default ServicesPage;
