'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

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
  discountPercentage: 50,
  titleEn: 'DISCOVER OMNIA – 50% OFF',
  titleAr: 'اكتشفي أومنيا – خصم 50% حصري',
  subtitleEn: 'Your favorite fragrance experience, now with an exclusive offer.',
  subtitleAr: 'تجربة عطركِ المفضلة، الآن مع عرض افتتاحي استثنائي لفترة محدودة.',
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
