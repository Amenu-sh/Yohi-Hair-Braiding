import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { id: "all", name: "All Styles" },
    { id: "box-braids", name: "Box Braids" },
    { id: "cornrows", name: "Cornrows" },
    { id: "twists", name: "Twists" },
    { id: "protective", name: "Protective Styles" },
    { id: "goddess", name: "Goddess Braids" },
  ];

  const galleryItems = [
    {
      id: 1,
      category: "box-braids",
      title: "Classic Box Braids",
      description: "Medium-length box braids with natural hair",
      image: "/images/gallery/hair-styling1.jpg",
    },
    {
      id: 2,
      category: "cornrows",
      title: "Geometric Cornrows",
      description: "Intricate geometric pattern cornrows",
      image: "/images/gallery/cornrows.jpg",
    },
    {
      id: 3,
      category: "twists",
      title: "Senegalese Twists",
      description: "Long Senegalese twists with ombre effect",
      image: "/images/gallery/Twists.jpg",
    },
    {
      id: 4,
      category: "goddess",
      title: "Goddess Braids Updo",
      description: "Elegant goddess braids styled in an updo",
      image: "/images/gallery/Godes-Boho-knotles.jpg",
    },
    {
      id: 5,
      category: "protective",
      title: "Protective Crown",
      description: "Crown braid protective style",
      image: "/images/gallery/hair-styling2.jpg",
    },
    {
      id: 6,
      category: "box-braids",
      title: "Jumbo Box Braids",
      description: "Large box braids for a bold look",
      image: "/images/gallery/hair-styling3.jpg",
    },
    {
      id: 7,
      category: "cornrows",
      title: "Side-Swept Cornrows",
      description: "Cornrows styled to one side",
      image: "/images/gallery/hair-styling4.jpg",
    },
    {
      id: 8,
      category: "twists",
      title: "Two-Strand Twists",
      description: "Natural two-strand twist out",
      image: "/images/gallery/hair-styling5.jpg",
    },
    {
      id: 9,
      category: "goddess",
      title: "Bohemian Goddess Braids",
      description: "Goddess braids with bohemian flair",
      image: "/images/gallery/hair-styling6.jpg",
    },
    {
      id: 10,
      category: "protective",
      title: "Halo Braid",
      description: "Protective halo braid style",
      image: "/images/gallery/hair-styling1.jpg",
    },
    {
      id: 11,
      category: "box-braids",
      title: "Colored Box Braids",
      description: "Box braids with vibrant color highlights",
      image: "/images/gallery/hair-styling2.jpg",
    },
    {
      id: 12,
      category: "cornrows",
      title: "Feed-in Cornrows",
      description: "Natural-looking feed-in cornrows",
      image: "/images/gallery/hair-styling3.jpg",
    },
  ];

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <>
      <Helmet>
        <title>Hair Gallery - Braided Beauty Salon</title>
        <meta
          name="description"
          content="Browse our stunning gallery of hair braiding and styling work. See examples of box braids, cornrows, protective styles, and more by our expert stylists."
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
                Our Gallery
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Explore our portfolio of stunning hair transformations and get
                inspired for your next braiding adventure.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeFilter === category.id ? "default" : "outline"}
                  onClick={() => setActiveFilter(category.id)}
                  className={`${
                    activeFilter === category.id
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                      : "border-pink-300 text-pink-600 hover:bg-pink-50"
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group cursor-pointer"
                >
                  <div className="glass-effect rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        src={item.image}
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="font-playfair text-lg font-semibold mb-1">
                            {item.title}
                          </h3>
                          <p className="text-sm opacity-90">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-playfair text-lg font-semibold text-gray-800 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {filteredItems.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-gray-500 text-lg">
                  No items found for this category.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Before & After Section */}
        {/* <section className="py-20 bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-playfair text-4xl md:text-5xl font-bold gradient-text mb-4">
                Transformation Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                See the amazing transformations our clients have experienced.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  before: "Natural hair before braiding transformation",
                  after: "Beautiful box braids transformation result",
                  title: "Box Braids Transformation",
                  description:
                    "From natural hair to stunning protective box braids",
                },
                {
                  before: "Hair before cornrow styling session",
                  after: "Intricate cornrow pattern completion",
                  title: "Cornrow Artistry",
                  description:
                    "Artistic cornrow patterns that showcase skill and creativity",
                },
              ].map((transformation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="glass-effect rounded-2xl p-6"
                >
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-center text-sm font-medium text-gray-600 mb-2">
                        Before
                      </p>
                      <img
                        alt={transformation.before}
                        className="w-full h-32 object-cover rounded-lg"
                        src="https://images.unsplash.com/photo-1583241080717-eff51c113093"
                      />
                    </div>
                    <div>
                      <p className="text-center text-sm font-medium text-gray-600 mb-2">
                        After
                      </p>
                      <img
                        alt={transformation.after}
                        className="w-full h-32 object-cover rounded-lg"
                        src="https://images.unsplash.com/photo-1583241080717-eff51c113093"
                      />
                    </div>
                  </div>
                  <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-2">
                    {transformation.title}
                  </h3>
                  <p className="text-gray-600">{transformation.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section> */}

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
                Ready for Your Transformation?
              </h2>
              <p className="text-xl opacity-90">
                Let us create your next stunning look. Book your appointment
                today!
              </p>
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 text-lg"
                >
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GalleryPage;
