import { NavItem } from '@/types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export const superAdminNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/super-admin/dashboard',
    icon: 'dashboard',
    isActive: false,  
    shortcut: ['d', 'd'],
    items: [] 
  },
  {
    title: 'Company',
    url: '/super-admin/dashboard/company',
    icon: 'company',
    isActive: false,
    shortcut: ['d', 'c'],
    items: []
  },
  {
    title: 'Subscription',
    url: '/super-admin/dashboard/subscription',
    icon: 'subscription',
    isActive: false,
    shortcut: ['d', 's'],
    items: []
  },
  {
    title: 'Payment',
    url: '/super-admin/dashboard/payment',
    icon: 'payment',
    isActive: false,
    shortcut: ['d', 'p'],
    items: []
  },
  {
    title: 'Admin',
    url: '/super-admin/dashboard/admin',
    icon: 'admin',
    isActive: false,
    shortcut: ['d', 'a'],
    items: []
  },
  {
    title: 'Logs',
    url: '/super-admin/dashboard/logs',
    icon: 'logs',
    isActive: false,
    shortcut: ['d', 'l'],
    items: []
  },
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];
