import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button, Card, SectionHeader, Badge } from '../../components/Shared';
import { Star, Clock, Award, Leaf, ChevronRight, MapPin } from 'lucide-react';

const Home: React.FC = () => {
  const { menu, settings } = useApp();
  const featuredItems = menu.filter(item => item.isPopular).slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1920&q=80" 
            alt="Delicious Pizza Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-white">
            <Badge color="bg-brand-orange">Fast & Fresh</Badge>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mt-6 mb-6 leading-tight">
              Taste the Authentic <br/>
              <span className="text-brand-orange">Italian Passion</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light">
              Hand-tossed dough, fresh locally sourced ingredients, and stone-baked to perfection. Ready in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/reservations">
                <Button size="lg">Book a Table</Button>
              </Link>
              <Link to="/menu">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-dark">
                  View Menu
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Trust Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-red-100 text-brand-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Service</h3>
              <p className="text-gray-600">Fresh from the oven to your table in under 15 minutes.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Fresh Ingredients</h3>
              <p className="text-gray-600">We source our veggies daily from local farmers.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-orange-100 text-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Award Winning</h3>
              <p className="text-gray-600">Voted "Best Crust in Town" three years in a row.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Top Rated</h3>
              <p className="text-gray-600">4.9/5 stars from over 2,000 happy customers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Customer Favorites" 
            subtitle="Our most popular dishes that keep people coming back for more." 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <Card key={item.id} className="group cursor-pointer h-full flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-brand-dark shadow-sm">
                    ${item.price}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold font-heading text-brand-dark">{item.name}</h3>
                    {item.isVegetarian && <span title="Vegetarian" className="text-green-600"><Leaf size={16}/></span>}
                  </div>
                  <p className="text-gray-600 mb-6 flex-1 line-clamp-3">{item.description}</p>
                  <Button fullWidth variant="outline">Order Now</Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/menu">
              <Button size="lg">View Full Menu</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Location / Reservation CTA */}
      <section className="py-20 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold mb-6">Experience the Vibe</h2>
              <p className="text-xl text-gray-300 mb-8">
                Join us for a warm, family-friendly atmosphere. Perfect for date nights, family dinners, or a quick slice with friends.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-300">
                  <MapPin className="mr-3 text-brand-orange" />
                  <span>{settings.address}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="mr-3 text-brand-orange" />
                  <span>Open Daily: {settings.openingHours.weekdays}</span>
                </div>
              </div>

              <Link to="/reservations">
                <Button size="lg" variant="secondary" className="mr-4">Book Your Table</Button>
              </Link>
            </div>
            <div className="rounded-lg overflow-hidden shadow-2xl border-4 border-gray-700">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1839487440445!2d-73.9856566845936!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1631234567890!5m2!1sen!2sus" 
                width="100%" 
                height="400" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy"
                title="Restaurant Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;