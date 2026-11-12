'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

import { OFFICIAL_PRICING } from '@/data/products';

interface CampaignSettings {
  isActive: boolean;
  discountPercentage: number;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  endDate: string;
  eligibleProducts: string[];
}

interface CampaignContextType {
  campaign: CampaignSettings;
  updateCampaign: (newSettings: Partial<CampaignSettings>) => void;
  getDiscountedPrice: (productId: string, regularPrice: number) => number;
}

const defaultCampaign: CampaignSettings = {
  isActive: true,
  discountPercentage: OFFICIAL_PRICING.discountPercentage,
  titleEn: 'DISCOVER OMNIA – 50% OFF',
  titleAr: 'اكتشفي أومنيا – خصم 50% حصري',
  subtitleEn: 'Original Price: 300 EGP • Now 150 EGP for a limited time.',
  subtitleAr: 'السعر الأصلي: 300 ج.م • الآن 150 ج.م لفترة محدودة.',
  endDate: '2026-12-31',
  eligibleProducts: ['vanilliano', 'berry-muse', 'rose-eclat', 'peach-sugar', 'oud-noir', 'navy-edition']
};

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export function CampaignProvider({ children }: { children: React.ReactNode }) {
  const [campaign, setCampaign] = useState<CampaignSettings>(defaultCampaign);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('omnia_campaign_settings');
      if (saved) {
        setCampaign(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading campaign settings', e);
    }
  }, []);

  const updateCampaign = (newSettings: Partial<CampaignSettings>) => {
    setCampaign(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('omnia_campaign_settings', JSON.stringify(updated));
      return updated;
    });
  };

  const getDiscountedPrice = (productId: string, regularPrice: number): number => {
    if (!campaign.isActive || !campaign.eligibleProducts.includes(productId)) {
      return regularPrice;
    }
    // Prevent double-discounting if already sale price (150 EGP)
    if (regularPrice <= OFFICIAL_PRICING.salePrice) {
      return OFFICIAL_PRICING.salePrice;
    }
    // Calculate official 50% off 300 EGP = 150 EGP
    return Math.round(regularPrice * (1 - campaign.discountPercentage / 100));
  };

  return (
    <CampaignContext.Provider value={{ campaign, updateCampaign, getDiscountedPrice }}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaign() {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
}
