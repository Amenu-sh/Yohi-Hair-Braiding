import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Play, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const HomePage = () => {
  const [randomServices, setRandomServices] = useState([]);

  const services = [
    {
      id: 1,
      name: "Box Braids",
      description: "More detailed and brief description is coming soon!",
      image: "/images/gallery/hair-styling1.jpg",
      video: "/videos/hair-styling.mp4",
      price: "$120-180",
    },
    {
      id: 2,
      name: "Cornrows",
      description: "More detailed and brief description is coming soon!",
      image: "/images/gallery/hair-styling2.jpg",
      video: "/videos/hair-styling.mp4",
      price: "$80-120",
    },
    {
      id: 3,
      name: "Fulani braids",
      description: "More detailed and brief description is coming soon!",
      image: "/images/gallery/fulani-1:2-1:2.jpg",
      video: "/videos/hair-styling.mp4",
      price: "$60-90",
    },
    {
      id: 4,
      name: "Twist Styles",
      description: "More detailed and brief description is coming soon!",
      image: "/images/gallery/Twists.jpg",
      video: "/videos/hair-styling.mp4",
      price: "$70-110",
    },
    {
      id: 5,
      name: "Knotless box braids",
      description: "More detailed and brief description is coming soon!",
      image: "/images/gallery/hair-styling5.jpg",
      video: "/videos/hair-styling.mp4",
      price: "$90-150",
    },
    {
      id: 6,
      name: "Goddess Braids",
      description: "More detailed and brief description is coming soon!",
      image: "/images/gallery/hair-styling6.jpg",
      video: "/videos/hair-styling.mp4",
      price: "$100-140",
    },
  ];

  useEffect(() => {
    // Randomly select 3 services for the homepage
    const shuffled = [...services].sort(() => 0.5 - Math.random());
    setRandomServices(shuffled.slice(0, 3));
  }, []);

  const handleVideoClick = (serviceName) => {
    toast({
      title: "🎬 Video Preview",
      description: `🚧 ${serviceName} video preview isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
    });
  };

  const handleBookNow = () => {
    toast({
      title: "📅 Booking System",
      description: "🚧 Amenu is working Online booking now! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Braided Beauty - Expert Hair Braiding & Styling Salon</title>
        <meta
          name="description"
          content="Transform your look with expert hair braiding and styling services. Specializing in box braids, cornrows, protective styles and more. Book your appointment today!"
        />
      </Helmet>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-50" />

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 floating-animation">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20" />
          </div>
          <div
            className="absolute bottom-20 right-10 floating-animation"
            style={{ animationDelay: "2s" }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20" />
          </div>
          <div
            className="absolute top-1/2 right-20 floating-animation"
            style={{ animationDelay: "4s" }}
          >
            <Sparkles className="w-8 h-8 text-pink-400 opacity-60" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="font-playfair text-5xl md:text-7xl font-bold gradient-text">
                Yohi Hair Braiding
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
                Where artistry meets hair care. Transform your look with our
                expert braiding and styling services.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 text-lg pulse-glow"
                  onClick={handleBookNow}
                >
                  Book Appointment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/gallery">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-3 text-lg border-pink-300 text-pink-600 hover:bg-pink-50"
                  >
                    View Gallery
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center space-x-2 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-current" />
                ))}
                <span className="ml-2 text-gray-600 font-medium">
                  5/5 from 200+ happy clients
                </span>
              </div>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute bottom-0 right-0 w-1/2 h-1/2 hidden lg:block"
          >
            <img
              alt="Professional hair braiding stylist working on beautiful braids"
              className="w-full h-full object-cover rounded-tl-[3rem] shadow-2xl"
              src="https://images.unsplash.com/photo-1659641716193-e88e0dc997c2"
            />
          </motion.div>
        </section>

        {/* Featured Services Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-playfair text-4xl md:text-5xl font-bold gradient-text mb-4">
                Featured Services
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover our most popular braiding and styling services, each
                crafted with precision and care.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {randomServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="glass-effect rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    {/* Service Image with Video Overlay */}
                    <div className="video-container mb-6 h-48">
                      <img
                        alt={service.name}
                        className="w-full h-full object-cover rounded-lg"
                        src={service.image}
                      />
                      <div
                        className="video-overlay cursor-pointer"
                        onClick={() => handleVideoClick(service.name)}
                      >
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-playfair text-2xl font-semibold text-gray-800">
                          {service.name}
                        </h3>
                        <span className="text-pink-600 font-bold text-lg">
                          {service.price}
                        </span>
                      </div>

                      <p className="text-gray-600">{service.description}</p>

                      <Button
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                        onClick={handleBookNow}
                      >
                        Book This Service
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link to="/services">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-pink-300 text-pink-600 hover:bg-pink-50"
                >
                  View All Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Section */}
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
                Why Choose Yohi Hair Braiding?
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Expert Stylists",
                  description:
                    "Our certified professionals have years of experience in hair braiding and styling.",
                  icon: "👩‍🎨",
                },
                {
                  title: "Premium Products",
                  description:
                    "We use only the finest hair care products to ensure healthy, beautiful results.",
                  icon: "✨",
                },
                {
                  title: "Personalized Service",
                  description:
                    "Every client receives customized attention and styling tailored to their unique needs.",
                  icon: "💖",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center p-8 glass-effect rounded-2xl"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
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
                Ready for Your Hair Transformation?
              </h2>
              <p className="text-xl opacity-90">
                Book your appointment today and let our expert stylists create
                the perfect look for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 text-lg"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
                <Link to="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
