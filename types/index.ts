import { Icons } from '@/components/icons';
export * from "./common";

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export type UddoktapayCheckoutPayload = {
  full_name: string;
  email: string;
  amount: string | number;
  metadata: {
    user_id: string;
    order_id: string;
    [key: string]: any; // Allow other metadata
  };
  redirect_url: string;
  cancel_url: string;
  webhook_url?: string; // Optional as per your example
};

export type UddoktapayCheckoutResponse = {
  status: boolean;
  message?: string;
  payment_url?: string;
  // Add other potential fields from the response if known
};

export type InitiateDepositResult = {
  success: boolean;
  paymentUrl?: string;
  message?: string;
  orderId?: string;
  // invoiceId?: string;
};

export interface PaymentVerificationResponse {
  status: 'COMPLETED' | 'PENDING' | 'FAILED' | 'ERROR';
  transaction_id: string;
  amount: number;
  payment_method?: string;
  cus_name?: string;
  trx_id?: string;
  metadata?: {
    orderId?: string;
  };
  message?: string;
}

export interface VerificationResult {
  status: 'SUCCESS' | 'ERROR' | 'NOT_FOUND' | 'ALREADY_VERIFIED';
  message: string;
  data?: PaymentVerificationResponse;
}


// challange  type 



// Types
export type ChallengeCategoryType = 
  | "Human"
  | "Political" 
  | "Financial"
  | "Strategic"
  | "Compliance"
  | "Operations";

export type ImpactOnBusinessType = 
  | "Very Low"
  | "Low"
  | "Moderate"
  | "High"
  | "Very High";

export type AbilityToAddressType = 
  | "Very Low"
  | "Low"
  | "Moderate"
  | "High"
  | "Very High";

 export interface Challenge {
  id: string;
  name: string;
  category: string;
  riskScore: number;
  status: "active" | "inactive" | "completed";
  timeline: "monthly" | "quarterly" | "yearly";
  createdDate: string;
  priority: "low" | "medium" | "high" | "critical";
  description?: string;
  impactOnBusiness?: string;
  abilityToAddress?: string;
}

export interface RiskCategory {
  name: string;
  score: number;
  color: string;
}

export interface ImpactData {
  category: string;
  value: number;
  color: string;
}

export interface OverviewData {
  category: string;
  value: number;
}
