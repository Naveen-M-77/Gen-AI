import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/Shared';
import { Users, DollarSign, Calendar, TrendingUp } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { reservations, menu } = useApp();

  const pendingReservations = reservations.filter(r => r.status === 'Pending').length;
  const todayReservations = reservations.filter(r => r.date === new Date().toISOString().split('T')[0]).length;
  const totalMenuItems = menu.length;

  const stats = [
    { label: 'Pending Bookings', value: pendingReservations, icon: Calendar, color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'Today\'s Guests', value: todayReservations * 2 + 5, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' }, // Mock calculation
    { label: 'Active Menu Items', value: totalMenuItems, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Total Visits', value: '1.2k', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-brand-dark mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Recent Reservations</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 text-sm">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Time</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reservations.slice(0, 5).map(res => (
                  <tr key={res.id}>
                    <td className="py-3 text-sm">{res.name}</td>
                    <td className="py-3 text-sm">{res.date}</td>
                    <td className="py-3 text-sm">{res.time}</td>
                    <td className="py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        res.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                        res.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {res.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full text-left p-4 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition flex items-center justify-between group">
              <span className="font-medium text-gray-700 group-hover:text-brand-red">Add New Menu Item</span>
              <span className="text-gray-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </button>
            <button className="w-full text-left p-4 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition flex items-center justify-between group">
              <span className="font-medium text-gray-700 group-hover:text-brand-red">Update Opening Hours</span>
              <span className="text-gray-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </button>
            <button className="w-full text-left p-4 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition flex items-center justify-between group">
              <span className="font-medium text-gray-700 group-hover:text-brand-red">View Contact Inquiries</span>
              <span className="text-gray-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;