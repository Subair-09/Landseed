/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface EstatePrice {
  sqm: 250 | 500;
  amount: number;
  formattedAmount: string;
}

export interface Estate {
  id: string;
  title: string;
  location: string;
  prices: {
    250: number; // in NGN
    500: number; // in NGN
  };
  features: string[];
  documentation: string;
  status: "Available" | "Selling Fast" | "Limited Slots";
  imageUrl: string;
  highlights: string;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon identifier
}

export interface CounterStat {
  id: string;
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatarUrl: string;
  rating: number;
}

export interface ContactInquiry {
  fullName: string;
  email: string;
  phone: string;
  selectedEstate: string;
  plotSize: "250" | "500";
  date: string;
  message: string;
}
