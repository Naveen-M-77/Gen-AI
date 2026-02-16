import React from 'react';
import { useApp } from '../../context/AppContext';
import { ReservationStatus } from '../../types';
import { Card, Badge } from '../../components/Shared';
import { Check, X } from 'lucide-react';

const AdminReservations: React.FC = () => {
  const { reservations, updateReservationStatus } = useApp();

  const getStatusColor = (status: ReservationStatus) => {
    switch (status) {
      case ReservationStatus.Confirmed: return 'bg-green-500';
      case ReservationStatus.Cancelled: return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-brand-dark mb-8">Reservation Management</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Guests</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reservations.map((res) => (
                <tr key={res.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">{res.name}</p>
                    <p className="text-sm text-gray-500">{res.email}</p>
                    <p className="text-sm text-gray-500">{res.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900 font-medium">{res.date}</p>
                    <p className="text-sm text-gray-500">{res.time}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{res.guests}</td>
                  <td className="px-6 py-4">
                    <Badge color={getStatusColor(res.status)}>{res.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {res.status === ReservationStatus.Pending && (
                      <>
                        <button 
                          onClick={() => updateReservationStatus(res.id, ReservationStatus.Confirmed)}
                          className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
                          title="Confirm"
                        >
                          <Check size={18} />
                        </button>
                        <button 
                          onClick={() => updateReservationStatus(res.id, ReservationStatus.Cancelled)}
                          className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                          title="Decline"
                        >
                          <X size={18} />
                        </button>
                      </>
                    )}
                    {res.status !== ReservationStatus.Pending && (
                      <span className="text-sm text-gray-400 italic">No actions</span>
                    )}
                  </td>
                </tr>
              ))}
              {reservations.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No reservations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReservations;