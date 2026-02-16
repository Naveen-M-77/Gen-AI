import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MenuItem, MenuCategory } from '../../types';
import { Button, Input, Card } from '../../components/Shared';
import { Trash2, Edit2, Plus, X } from 'lucide-react';

const AdminMenu: React.FC = () => {
  const { menu, addMenuItem, updateMenuItem, deleteMenuItem } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const initialFormState: MenuItem = {
    id: '',
    name: '',
    description: '',
    price: 0,
    category: MenuCategory.Pizza,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    isPopular: false,
    isVegetarian: false,
    available: true
  };

  const [formData, setFormData] = useState<MenuItem>(initialFormState);

  const openModal = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({ ...initialFormState, id: Date.now().toString() });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(initialFormState);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateMenuItem(formData);
    } else {
      addMenuItem(formData);
    }
    closeModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-brand-dark">Menu Management</h1>
        <Button onClick={() => openModal()} className="flex items-center gap-2">
          <Plus size={20} /> Add Item
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {menu.map(item => (
          <Card key={item.id} className="p-4 flex flex-col md:flex-row items-center gap-6">
            <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover bg-gray-200" />
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
              <p className="text-gray-500 text-sm mb-1">{item.description}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="text-sm font-semibold text-brand-orange">${item.price}</span>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">{item.category}</span>
                {item.isPopular && <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">Popular</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => openModal(item)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
              >
                <Edit2 size={20} />
              </button>
              <button 
                onClick={() => deleteMenuItem(item.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-2xl font-bold">{editingItem ? 'Edit Item' : 'New Item'}</h2>
              <button onClick={closeModal}><X size={24} className="text-gray-400 hover:text-gray-600"/></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Name" name="name" value={formData.name} onChange={handleChange} required />
                <Input label="Price" name="price" type="number" value={formData.price} onChange={handleChange} required />
              </div>
              <Input label="Description" name="description" as="textarea" value={formData.description} onChange={handleChange} required className="h-24" />
              <Input 
                label="Category" 
                name="category" 
                as="select" 
                value={formData.category} 
                onChange={handleChange}
                options={Object.values(MenuCategory).map(c => ({ label: c, value: c }))}
              />
              <Input label="Image URL" name="image" value={formData.image} onChange={handleChange} required />
              
              <div className="flex gap-6 mt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="isPopular" checked={formData.isPopular} onChange={handleChange} className="w-5 h-5 text-brand-orange rounded" />
                  <span className="font-medium text-gray-700">Mark as Popular</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="isVegetarian" checked={formData.isVegetarian} onChange={handleChange} className="w-5 h-5 text-brand-orange rounded" />
                  <span className="font-medium text-gray-700">Vegetarian</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
                <Button type="submit">{editingItem ? 'Update Item' : 'Create Item'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenu;