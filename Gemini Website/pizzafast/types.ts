export enum MenuCategory {
  Pizza = 'Pizza',
  Sides = 'Sides',
  Beverages = 'Beverages',
  Combos = 'Combos',
  Dessert = 'Dessert'
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategory;
  isPopular: boolean;
  isVegetarian: boolean;
  available: boolean;
}

export enum ReservationStatus {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Cancelled = 'Cancelled'
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  status: ReservationStatus;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  published: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar?: string;
}

export interface SiteSettings {
  restaurantName: string;
  phone: string;
  email: string;
  address: string;
  openingHours: {
    weekdays: string;
    weekends: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}