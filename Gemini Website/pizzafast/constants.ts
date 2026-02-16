import { MenuItem, MenuCategory, BlogPost, Testimonial, SiteSettings, Reservation, ReservationStatus } from './types';

export const INITIAL_SETTINGS: SiteSettings = {
  restaurantName: "PizzaFast",
  phone: "(555) 123-4567",
  email: "hello@pizzafast.com",
  address: "123 Dough Lane, Flavor Town, FT 90210",
  openingHours: {
    weekdays: "11:00 AM - 10:00 PM",
    weekends: "11:00 AM - 11:00 PM"
  },
  socialLinks: {
    facebook: "#",
    instagram: "#",
    twitter: "#"
  }
};

export const MOCK_MENU: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita Classic',
    description: 'San Marzano tomato sauce, fresh mozzarella di bufala, basil, extra virgin olive oil.',
    price: 14,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    category: MenuCategory.Pizza,
    isPopular: true,
    isVegetarian: true,
    available: true
  },
  {
    id: '2',
    name: 'Pepperoni Feast',
    description: 'Double pepperoni, mozzarella, tomato sauce, and a sprinkle of parmesan.',
    price: 16,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    category: MenuCategory.Pizza,
    isPopular: true,
    isVegetarian: false,
    available: true
  },
  {
    id: '3',
    name: 'Truffle Mushroom',
    description: 'Roasted wild mushrooms, truffle oil, mozzarella, thyme, garlic cream base.',
    price: 18,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    category: MenuCategory.Pizza,
    isPopular: false,
    isVegetarian: true,
    available: true
  },
  {
    id: '4',
    name: 'Spicy Hawaiian',
    description: 'Roasted pineapple, jalapeños, smoked ham, mozzarella, chili flakes.',
    price: 17,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    category: MenuCategory.Pizza,
    isPopular: false,
    isVegetarian: false,
    available: true
  },
  {
    id: '5',
    name: 'Garlic Knots',
    description: 'Oven-baked dough knots tossed in garlic butter, parsley and parmesan.',
    price: 6,
    image: 'https://images.unsplash.com/photo-1573145690623-649fa95db7ba?auto=format&fit=crop&w=800&q=80',
    category: MenuCategory.Sides,
    isPopular: true,
    isVegetarian: true,
    available: true
  },
  {
    id: '6',
    name: 'Caprese Salad',
    description: 'Fresh tomatoes, mozzarella, basil, balsamic glaze.',
    price: 10,
    image: 'https://images.unsplash.com/photo-1529312266912-b33cf6227e24?auto=format&fit=crop&w=800&q=80',
    category: MenuCategory.Sides,
    isPopular: false,
    isVegetarian: true,
    available: true
  },
  {
    id: '7',
    name: 'Craft Cola',
    description: 'Artisanal cane sugar cola.',
    price: 4,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    category: MenuCategory.Beverages,
    isPopular: false,
    isVegetarian: true,
    available: true
  },
  {
    id: '8',
    name: 'Family Combo',
    description: '2 Large Pizzas, 2 Sides, 4 Drinks.',
    price: 45,
    image: 'https://images.unsplash.com/photo-1561350111-7daa4f284bc6?auto=format&fit=crop&w=800&q=80',
    category: MenuCategory.Combos,
    isPopular: true,
    isVegetarian: false,
    available: true
  }
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    rating: 5,
    comment: "The crust is absolutely perfect. Best pizza in the city, hands down!",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
  },
  {
    id: '2',
    name: 'Mike Ross',
    rating: 5,
    comment: "Fast service and incredibly fresh ingredients. The Truffle Mushroom is a must-try.",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
  },
  {
    id: '3',
    name: 'Emily Chen',
    rating: 4,
    comment: "Great atmosphere for a family dinner. Kids loved the pepperoni.",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
  }
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: "The Secret to Our Sourdough Crust",
    excerpt: "Why we ferment our dough for 48 hours before it ever touches the oven.",
    content: "Content placeholder...",
    image: "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=800&q=80",
    date: "2023-10-15",
    published: true
  },
  {
    id: '2',
    title: "New Seasonal Menu Items",
    excerpt: "Check out what our chef has cooked up for the autumn season.",
    content: "Content placeholder...",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    date: "2023-11-01",
    published: true
  }
];

export const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: '101',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-0101',
    date: '2023-12-25',
    time: '19:00',
    guests: 4,
    status: ReservationStatus.Pending,
    createdAt: new Date().toISOString()
  },
  {
    id: '102',
    name: 'Alice Smith',
    email: 'alice@example.com',
    phone: '555-0102',
    date: '2023-12-26',
    time: '18:30',
    guests: 2,
    status: ReservationStatus.Confirmed,
    createdAt: new Date().toISOString()
  }
];