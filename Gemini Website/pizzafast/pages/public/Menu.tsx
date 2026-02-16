import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MenuCategory } from '../../types';
import { Card, SectionHeader, Button } from '../../components/Shared';
import { Leaf } from 'lucide-react';

const MenuPage: React.FC = () => {
  const { menu } = useApp();
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'All'>('All');

  const categories = ['All', ...Object.values(MenuCategory)];

  const filteredItems = activeCategory === 'All' 
    ? menu 
    : menu.filter(item => item.category === activeCategory);

  return (
    <div className="pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader 
        title="Our Menu" 
        subtitle="Hand-crafted with love and the finest ingredients." 
      />

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat as any)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              activeCategory === cat 
                ? 'bg-brand-red text-white shadow-lg scale-105' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
               <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-brand-dark font-heading">{item.name}</h3>
                  <span className="text-lg font-bold text-brand-orange">${item.price}</span>
                </div>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.description}</p>
              </div>
              <div className="mt-3 flex justify-between items-center">
                {item.isVegetarian && (
                  <span className="flex items-center text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                    <Leaf size={12} className="mr-1"/> Veg
                  </span>
                )}
                <Button size="sm" variant="outline" className="ml-auto">Add to Order</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No items found in this category.
        </div>
      )}
    </div>
  );
};

export default MenuPage;