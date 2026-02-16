import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SectionHeader, Button, Input, Card } from '../../components/Shared';
import { Calendar, Users, Clock, CheckCircle } from 'lucide-react';

const Reservations: React.FC = () => {
  const { addReservation } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReservation({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      guests: Number(formData.guests),
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <Card className="max-w-lg w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-heading font-bold mb-4 text-brand-dark">Reservation Request Sent!</h2>
          <p className="text-gray-600 mb-8">
            Thank you, {formData.name}. We have received your request for a table of {formData.guests} on {formData.date}. 
            You will receive a confirmation email shortly.
          </p>
          <Button onClick={() => setSubmitted(false)}>Make Another Reservation</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-brand-cream">
      <SectionHeader 
        title="Book A Table" 
        subtitle="Reserve your spot for an unforgettable dining experience." 
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form Side */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Input 
                label="Full Name" 
                name="name" 
                required 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="John Doe"
              />
              <Input 
                label="Phone Number" 
                name="phone" 
                type="tel" 
                required 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="mb-6">
              <Input 
                label="Email Address" 
                name="email" 
                type="email" 
                required 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="john@example.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={18} className="text-gray-400"/>
                  </div>
                  <input 
                    type="date" 
                    name="date" 
                    required 
                    min={new Date().toISOString().split('T')[0]}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-gray-50"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Time</label>
                <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock size={18} className="text-gray-400"/>
                  </div>
                  <select 
                    name="time" 
                    required 
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-gray-50"
                    value={formData.time}
                    onChange={handleChange}
                  >
                    <option value="">Select Time</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="17:30">5:30 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="18:30">6:30 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="20:30">8:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Guests</label>
                <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users size={18} className="text-gray-400"/>
                  </div>
                  <select 
                    name="guests" 
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-gray-50"
                    value={formData.guests}
                    onChange={handleChange}
                  >
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} People</option>)}
                    <option value="9">9+ (Call us)</option>
                  </select>
                </div>
              </div>
            </div>

            <Input 
              label="Special Requests (Optional)" 
              as="textarea" 
              name="specialRequests" 
              placeholder="Allergies, high chair needed, etc." 
              value={formData.specialRequests}
              onChange={handleChange}
            />

            <Button fullWidth size="lg" className="mt-4">Confirm Reservation</Button>
          </form>
        </div>

        {/* Info Side */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
             <img 
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80" 
              alt="Restaurant Interior" 
              className="rounded-xl shadow-lg mb-8 transform rotate-2 hover:rotate-0 transition duration-500"
            />
            <h3 className="text-2xl font-bold font-heading mb-4">Reservation Policies</h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-brand-orange rounded-full mt-2 mr-3 flex-shrink-0"></span>
                We hold tables for 15 minutes past the reservation time.
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-brand-orange rounded-full mt-2 mr-3 flex-shrink-0"></span>
                For groups larger than 8, please contact us directly at (555) 123-4567.
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-brand-orange rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Special dietary requests can be accommodated with advance notice.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;