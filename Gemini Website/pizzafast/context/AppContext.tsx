import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { MenuItem, Reservation, BlogPost, SiteSettings, ReservationStatus } from '../types';
import { MOCK_MENU, MOCK_RESERVATIONS, MOCK_BLOG_POSTS, INITIAL_SETTINGS } from '../constants';

interface AppContextType {
  menu: MenuItem[];
  reservations: Reservation[];
  blogPosts: BlogPost[];
  settings: SiteSettings;
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
  // Menu Actions
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  // Reservation Actions
  addReservation: (reservation: Omit<Reservation, 'id' | 'status' | 'createdAt'>) => void;
  updateReservationStatus: (id: string, status: ReservationStatus) => void;
  // Settings
  updateSettings: (settings: SiteSettings) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState<MenuItem[]>(MOCK_MENU);
  const [reservations, setReservations] = useState<Reservation[]>(MOCK_RESERVATIONS);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(MOCK_BLOG_POSTS);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [isAdmin, setIsAdmin] = useState(false);

  // Persistence Simulation
  useEffect(() => {
    const storedMenu = localStorage.getItem('pf_menu');
    if (storedMenu) setMenu(JSON.parse(storedMenu));

    const storedRes = localStorage.getItem('pf_reservations');
    if (storedRes) setReservations(JSON.parse(storedRes));
    
    const storedSettings = localStorage.getItem('pf_settings');
    if (storedSettings) setSettings(JSON.parse(storedSettings));
  }, []);

  useEffect(() => {
    localStorage.setItem('pf_menu', JSON.stringify(menu));
    localStorage.setItem('pf_reservations', JSON.stringify(reservations));
    localStorage.setItem('pf_settings', JSON.stringify(settings));
  }, [menu, reservations, settings]);

  const login = () => setIsAdmin(true);
  const logout = () => setIsAdmin(false);

  const addMenuItem = (item: MenuItem) => {
    setMenu([...menu, item]);
  };

  const updateMenuItem = (updatedItem: MenuItem) => {
    setMenu(menu.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const deleteMenuItem = (id: string) => {
    setMenu(menu.filter(item => item.id !== id));
  };

  const addReservation = (resData: Omit<Reservation, 'id' | 'status' | 'createdAt'>) => {
    const newRes: Reservation = {
      ...resData,
      id: Math.random().toString(36).substr(2, 9),
      status: ReservationStatus.Pending,
      createdAt: new Date().toISOString()
    };
    setReservations([newRes, ...reservations]);
  };

  const updateReservationStatus = (id: string, status: ReservationStatus) => {
    setReservations(reservations.map(res => res.id === id ? { ...res, status } : res));
  };

  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
  };

  return (
    <AppContext.Provider value={{
      menu,
      reservations,
      blogPosts,
      settings,
      isAdmin,
      login,
      logout,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
      addReservation,
      updateReservationStatus,
      updateSettings
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};