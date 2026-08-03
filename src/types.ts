/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Translation {
  pt: string;
  en: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: Translation;
  price: number;
  ingredients?: Translation;
  image?: string;
  category: string;
  badges?: string[]; // e.g., 'Best Seller', 'Premium', 'New'
  isHighlighted?: boolean;
  brand?: 'heineken' | 'nordes' | 'jack-daniels' | 'other';
}

export interface Category {
  id: string;
  name: Translation;
  icon: string;
}
