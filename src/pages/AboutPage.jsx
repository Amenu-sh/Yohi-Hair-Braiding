
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Award, Users, Clock, Heart } from 'lucide-react';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Braided Beauty Salon</title>
        <meta name="description" content="Learn about Braided Beauty's story, our expert team, and our commitment to providing exceptional hair braiding and styling services." />
      </Helmet>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="font-playfair text-5xl md:text-6xl font-bold gradient-text mb-6">
                  Our Story
                </h1>
                <p className="text-xl text-gray-700 mb-6">
                  Founded in 2018, Braided Beauty has been transforming lives through the art of hair braiding and styling. What started as a passion project has grown into a premier destination for protective styles and creative hair artistry.
                </p>
                <p className="text-lg text-gray-600">
                  We believe that beautiful hair is an expression of your unique personality, and our mission is to help every client discover their most confident self through expert styling and personalized care.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <img  
                  alt="Braided Beauty salon interior with modern styling chairs and equipment"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                 src="https://images.unsplash.com/photo-1564479893852-180ac6065b2b" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full opacity-20" />
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
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
                Our Values
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything we do is guided by our core values and commitment to excellence.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Award,
                  title: 'Excellence',
                  description: 'We strive for perfection in every braid, every style, and every client interaction.'
                },
                {
                  icon: Heart,
                  title: 'Care',
                  description: 'Your hair health and satisfaction are our top priorities in everything we do.'
                },
                {
                  icon: Users,
                  title: 'Community',
                  description: 'We celebrate diversity and create a welcoming space for all hair types and textures.'
                },
                {
                  icon: Clock,
                  title: 'Reliability',
                  description: 'Consistent quality service and respect for your time, every appointment.'
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 glass-effect rounded-2xl hover:shadow-lg transition-shadow"
                >
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
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
                Meet Our Expert Team
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our talented stylists bring years of experience and passion to every appointment.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Maya Johnson',
                  role: 'Master Braider & Salon Owner',
                  experience: '12+ years',
                  specialty: 'Box braids, Protective styles',
                  image: 'Professional portrait of Maya Johnson, master braider and salon owner'
                },
                {
                  name: 'Zara Williams',
                  role: 'Senior Stylist',
                  experience: '8+ years',
                  specialty: 'Cornrows, Artistic patterns',
                  image: 'Professional portrait of Zara Williams, senior hair stylist'
                },
                {
                  name: 'Amara Davis',
                  role: 'Creative Stylist',
                  experience: '6+ years',
                  specialty: 'Twist styles, Color braiding',
                  image: 'Professional portrait of Amara Davis, creative hair stylist'
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="glass-effect rounded-2xl p-6 hover:shadow-xl transition-shadow">
                    <div className="relative mb-6">
                      <img  
                        alt={member.image}
                        className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gradient-to-r from-pink-500 to-purple-600"
                       src="https://images.unsplash.com/photo-1644424235476-295f24d503d9" />
                      <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs px-2 py-1 rounded-full">
                        {member.experience}
                      </div>
                    </div>
                    
                    <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-pink-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Specialty:</strong> {member.specialty}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: '500+', label: 'Happy Clients' },
                { number: '6', label: 'Years Experience' },
                { number: '15+', label: 'Service Types' },
                { number: '4.9', label: 'Average Rating' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  <div className="font-playfair text-4xl md:text-5xl font-bold gradient-text">
                    {stat.number}
                  </div>
                  <p className="text-gray-600 font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
