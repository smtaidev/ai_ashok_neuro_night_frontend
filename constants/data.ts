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

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] 
  },
  {
    title: 'Admin',
    url: '#', 
    icon: 'billing',
    isActive: true,

    items: [
      {
        title: 'Admin 1',
        url: '/dashboard/foundation/identity',
        icon: 'userPen',
        shortcut: ['f', 'i']
      },
      {
        title: 'Admin 2',
        url: '/dashboard/foundation/zero-in',
        icon: 'userPen',
        shortcut: ['f', 'z']
      },
    ]
  },
  {
    title: 'Foundation',
    url: '/dashboard/foundation', 
    icon: 'billing',
    isActive: true,
    items: [
      {
        title: 'Identity',
        url: '/dashboard/foundation/identity',
        icon: 'userPen',
        shortcut: ['f', 'i']
      },
      {
        title: 'Zero-in',
        url: '/dashboard/foundation/zero-in',
        icon: 'userPen',
        shortcut: ['f', 'z']
      },
      {
        title: 'Capability',
        url: '/dashboard/foundation/capability',
        icon: 'userPen',
        shortcut: ['f', 'c']
      },
    ]
  },
  {
    title: 'Assess',
    url: '/dashboard/assess', 
    icon: 'billing',
    isActive: true,
    items: [
      {
        title: 'Trends',
        url: '/dashboard/assess/trends',
        icon: 'userPen',
        shortcut: ['a', 't']
      },
      {
        title: 'Swot',
        url: '/dashboard/assess/swot',
        icon: 'userPen',
        shortcut: ['a', 's']
      },
      {
        title: 'Challenges',
        url: '/dashboard/assess/challenges',
        icon: 'userPen',
        shortcut: ['a', 'c']
      },
      {
        title: 'Competitors Analysis',
        url: '/dashboard/assess/competitors-analysis',
        icon: 'userPen',
        shortcut: ['a', 'c']
      },
      {
        title: 'ClarhetAi Recommendations',
        url: '/dashboard/assess/clarhet-ai',
        icon: 'userPen',
        shortcut: ['a', 'c']
      },
      {
        title: 'Alignment',
        url: '/dashboard/assess/alignment',
        icon: 'userPen',
        shortcut: ['a', 'a']
      },
    ]
  },

  {
    title: 'Blueprint',
    url: '/dashboard/blueprint', 
    icon: 'billing',
    isActive: true,
    items: [
      {
        title: 'Vision',
        url: '/dashboard/blueprint/vision',
        icon: 'userPen',
        shortcut: ['b', 'v']
      },
      {
        title: 'Strategic Themes',
        url: '/dashboard/blueprint/strategic-themes',
        icon: 'userPen',
        shortcut: ['b', 's']
      },
      {
        title: 'Business Goals',
        url: '/dashboard/blueprint/business-goals',
        icon: 'userPen',
        shortcut: ['b', 'g']
      },
      {
        title: 'Alignment Check',
        url: '/dashboard/blueprint/alignment-check',
        icon: 'userPen',
        shortcut: ['b', 'c']
      },
    ]
  },

  {
    title: 'Choreography',
    url: '/dashboard/choreography', 
    icon: 'billing',
    isActive: true,
    items: [
      {
        title: 'Objectives',
        url: '/dashboard/choreography/objectives',
        icon: 'userPen',
        shortcut: ['c', 'o']
      },
      {
        title: 'Teams',
        url: '/dashboard/choreography/teams',
        icon: 'userPen',
        shortcut: ['c', 't']
      },
      {
        title: 'Alignment Check',
        url: '/dashboard/choreography/alignment-check',
        icon: 'userPen',
        shortcut: ['c', 'a']
      },
    ]
  },
  {
    title: 'Meetings',
    url: '/dashboard/meetings', 
    icon: 'billing',
    isActive: true,
    items: [
      {
        title: 'Agenda Builder',
        url: '/dashboard/meetings/agenda-builder',
        icon: 'userPen',
        shortcut: ['m', 'a']
      },
      {
        title: 'Archive',
        url: '/dashboard/meetings/archive',
        icon: 'userPen',
        shortcut: ['m', 'a']
      },
      
    ]
  },
  {
    title: 'Reports',
    url: '/dashboard/reports',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'r'],
    items: [] // Empty array as there are no child items for Dashboard
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
