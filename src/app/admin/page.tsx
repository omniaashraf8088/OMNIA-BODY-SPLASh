'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, Tag, ShoppingCart, Settings, ArrowLeft, Check, Plus, Edit2, ShieldAlert } from 'lucide-react';
import { PRODUCTS, SHIPPING_ZONES } from '@/data/products';
import { useCampaign } from '@/context/CampaignContext';
import { Product } from '@/types';

export default function AdminDashboard() {
  const { campaign, updateCampaign } = useCampaign();

  const [activeTab, setActiveTab] = useState<'products' | 'campaign' | 'orders' | 'settings'>('products');
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [orders, setOrders] = useState<any[]>([]);

  // Settings
  const [whatsappNumber, setWhatsappNumber] = useState('[WHATSAPP_NUMBER_WITH_COUNTRY_CODE]');
  const [facebookUrl, setFacebookUrl] = useState('[FACEBOOK_PAGE_URL]');
  const [instagramUrl, setInstagramUrl] = useState('[INSTAGRAM_PROFILE_URL]');
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    try {
      const storedOrders = JSON.parse(localStorage.getItem('omnia_orders') || '[]');
      setOrders(storedOrders);

      const savedSettings = JSON.parse(localStorage.getItem('omnia_site_settings') || '{}');
      if (savedSettings.whatsapp) setWhatsappNumber(savedSettings.whatsapp);
      if (savedSettings.facebook) setFacebookUrl(savedSettings.facebook);
      if (savedSettings.instagram) setInstagramUrl(savedSettings.instagram);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setProductsList(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
    setEditingProduct(null);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleUpdateOrderStatus = (index: number, newStatus: string) => {
    const updated = [...orders];
    updated[index].status = newStatus;
    setOrders(updated);
    localStorage.setItem('omnia_orders', JSON.stringify(updated));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('omnia_site_settings', JSON.stringify({
      whatsapp: whatsappNumber,
      facebook: facebookUrl,
      instagram: instagramUrl
    }));
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#493426] flex flex-col">
      {/* Top Bar */}
      <header className="bg-[#493426] text-[#FFF9F1] px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:text-[#D1B99C] transition-colors flex items-center gap-2 text-xs font-sans uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" />
            <span>Storefront</span>
          </Link>
          <span className="text-[#8B674D]">|</span>
          <h1 className="font-serif text-lg tracking-wider">MN OMNIA — Management Atelier</h1>
        </div>

        <span className="text-[11px] font-sans text-[#D1B99C] bg-white/10 px-3 py-1 rounded-full">
          Super Admin Active
        </span>
      </header>

      {/* Main Container */}
      <div className="container mx-auto px-6 py-8 max-w-6xl flex-grow">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-3 border-b border-[#E8D8C3] pb-4 mb-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-all flex items-center gap-2 border ${
              activeTab === 'products'
                ? 'bg-[#493426] text-[#FFF9F1] border-[#493426]'
                : 'bg-[#FFF9F1] text-[#493426] border-[#E8D8C3] hover:bg-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Fragrance Inventory ({productsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('campaign')}
            className={`px-5 py-2.5 text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-all flex items-center gap-2 border ${
              activeTab === 'campaign'
                ? 'bg-[#493426] text-[#FFF9F1] border-[#493426]'
                : 'bg-[#FFF9F1] text-[#493426] border-[#E8D8C3] hover:bg-white'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>50% Promotional Campaign</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-all flex items-center gap-2 border ${
              activeTab === 'orders'
                ? 'bg-[#493426] text-[#FFF9F1] border-[#493426]'
                : 'bg-[#FFF9F1] text-[#493426] border-[#E8D8C3] hover:bg-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Customer Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-2.5 text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-all flex items-center gap-2 border ${
              activeTab === 'settings'
                ? 'bg-[#493426] text-[#FFF9F1] border-[#493426]'
                : 'bg-[#FFF9F1] text-[#493426] border-[#E8D8C3] hover:bg-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Store Configuration</span>
          </button>
        </div>

        {savedNotice && (
          <div className="mb-6 p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-sans flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Changes successfully saved and applied to live storefront!</span>
          </div>
        )}

        {/* TAB 1: Products */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-[#FFF9F1] border border-[#E8D8C3] p-6 shadow-sm overflow-x-auto">
              <table className="w-full text-start text-xs font-sans">
                <thead>
                  <tr className="border-b border-[#E8D8C3] text-[#8B674D] uppercase tracking-wider text-[10px]">
                    <th className="p-3 text-start">Bottle</th>
                    <th className="p-3 text-start">Name</th>
                    <th className="p-3 text-start">Category</th>
                    <th className="p-3 text-start">Regular Price</th>
                    <th className="p-3 text-start">Promo Price</th>
                    <th className="p-3 text-start">Volume</th>
                    <th className="p-3 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8D8C3]/50">
                  {productsList.map(p => (
                    <tr key={p.id} className="hover:bg-[#F7F1E8]/50">
                      <td className="p-3">
                        <div className="relative w-10 h-14 bg-white border border-[#E8D8C3]">
                          <Image src={p.image} alt={p.nameEn} fill className="object-contain p-0.5" />
                        </div>
                      </td>
                      <td className="p-3 font-serif font-semibold text-[#493426] text-sm">
                        {p.nameEn} / {p.nameAr}
                      </td>
                      <td className="p-3 uppercase text-[10px] tracking-wider text-[#8B674D]">
                        {p.category}
                      </td>
                      <td className="p-3 font-semibold">{p.price} EGP</td>
                      <td className="p-3 text-emerald-800 font-bold">
                        {campaign.isActive ? Math.round(p.price * 0.5) : p.price} EGP
                      </td>
                      <td className="p-3">{p.volume}</td>
                      <td className="p-3 text-end">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="px-3 py-1 bg-[#493426] text-[#FFF9F1] hover:bg-[#8B674D] transition-colors rounded text-[10px] uppercase tracking-wider"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Edit Product Modal */}
            {editingProduct && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <form
                  onSubmit={handleSaveProduct}
                  className="bg-[#FFF9F1] border border-[#E8D8C3] max-w-lg w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto text-xs font-sans"
                >
                  <h3 className="font-serif text-lg text-[#493426]">Edit {editingProduct.nameEn}</h3>
                  <div>
                    <label className="block text-[#8B674D] mb-1">Price (EGP)</label>
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      className="w-full border border-[#D1B99C] p-2 bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#8B674D] mb-1">Tagline (EN)</label>
                    <input
                      type="text"
                      value={editingProduct.taglineEn}
                      onChange={e => setEditingProduct({ ...editingProduct, taglineEn: e.target.value })}
                      className="w-full border border-[#D1B99C] p-2 bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#8B674D] mb-1">Story (EN)</label>
                    <textarea
                      rows={3}
                      value={editingProduct.storyEn}
                      onChange={e => setEditingProduct({ ...editingProduct, storyEn: e.target.value })}
                      className="w-full border border-[#D1B99C] p-2 bg-white"
                      required
                    />
                  </div>
                  <div className="flex gap-3 justify-end pt-3 border-t border-[#E8D8C3]">
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="px-4 py-2 border border-[#8B674D] text-[#493426]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#493426] text-[#FFF9F1] font-semibold"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Campaign Management */}
        {activeTab === 'campaign' && (
          <div className="bg-[#FFF9F1] border border-[#E8D8C3] p-8 shadow-sm max-w-2xl space-y-6">
            <h2 className="font-serif text-2xl text-[#493426]">
              50% Opening Campaign Configuration
            </h2>

            <div className="space-y-4 text-xs font-sans">
              <label className="flex items-center gap-3 p-4 border border-[#8B674D] bg-[#F7F1E8] cursor-pointer">
                <input
                  type="checkbox"
                  checked={campaign.isActive}
                  onChange={e => updateCampaign({ isActive: e.target.checked })}
                  className="w-4 h-4 text-[#493426]"
                />
                <div>
                  <span className="font-serif font-bold text-sm text-[#493426] block">
                    Activate 50% Opening Offer Across Storefront
                  </span>
                  <span className="text-[#8B674D]">
                    When activated, promotional banners and crossed-out regular prices appear automatically.
                  </span>
                </div>
              </label>

              <div>
                <label className="block text-[#8B674D] mb-1 font-semibold">Discount Percentage (%)</label>
                <input
                  type="number"
                  value={campaign.discountPercentage}
                  onChange={e => updateCampaign({ discountPercentage: Number(e.target.value) })}
                  className="w-full border border-[#D1B99C] p-2.5 bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-[#8B674D] mb-1 font-semibold">Campaign Title (English)</label>
                <input
                  type="text"
                  value={campaign.titleEn}
                  onChange={e => updateCampaign({ titleEn: e.target.value })}
                  className="w-full border border-[#D1B99C] p-2.5 bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-[#8B674D] mb-1 font-semibold">Campaign Title (Arabic)</label>
                <input
                  type="text"
                  value={campaign.titleAr}
                  onChange={e => updateCampaign({ titleAr: e.target.value })}
                  className="w-full border border-[#D1B99C] p-2.5 bg-white text-sm text-end"
                />
              </div>

              <div>
                <label className="block text-[#8B674D] mb-1 font-semibold">Expiration Date</label>
                <input
                  type="date"
                  value={campaign.endDate}
                  onChange={e => updateCampaign({ endDate: e.target.value })}
                  className="w-full border border-[#D1B99C] p-2.5 bg-white text-sm"
                />
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 text-[#8B674D]">
                Eligible Products: All 6 official fragrance variants (Vanilliano, Berry Muse, Rose Éclat, Peach Sugar, Oud Noir, Navy Edition).
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Orders */}
        {activeTab === 'orders' && (
          <div className="bg-[#FFF9F1] border border-[#E8D8C3] p-6 shadow-sm overflow-x-auto">
            <h2 className="font-serif text-xl text-[#493426] mb-4">Customer Orders</h2>
            {orders.length === 0 ? (
              <p className="text-center py-12 text-sm text-[#8B674D] font-sans">
                No orders placed yet. As customers check out, incoming orders appear here in real-time.
              </p>
            ) : (
              <table className="w-full text-start text-xs font-sans">
                <thead>
                  <tr className="border-b border-[#E8D8C3] text-[#8B674D] uppercase tracking-wider text-[10px]">
                    <th className="p-3 text-start">Order #</th>
                    <th className="p-3 text-start">Date</th>
                    <th className="p-3 text-start">Customer</th>
                    <th className="p-3 text-start">Governorate</th>
                    <th className="p-3 text-start">Items</th>
                    <th className="p-3 text-start">Total (COD)</th>
                    <th className="p-3 text-start">Status</th>
                    <th className="p-3 text-end">Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8D8C3]/50">
                  {orders.map((o, idx) => (
                    <tr key={idx} className="hover:bg-[#F7F1E8]/50">
                      <td className="p-3 font-serif font-bold text-[#493426]">{o.orderNumber}</td>
                      <td className="p-3 text-[#8B674D]">{new Date(o.createdAt).toLocaleDateString()}</td>
                      <td className="p-3">
                        <span className="font-semibold block">{o.customerName}</span>
                        <span className="text-[#8B674D]">{o.customerPhone}</span>
                      </td>
                      <td className="p-3">{o.governorate}, {o.city}</td>
                      <td className="p-3">
                        {o.items?.map((it: any) => `${it.product.nameEn} (x${it.quantity})`).join(', ')}
                      </td>
                      <td className="p-3 font-bold text-[#493426]">{o.total} EGP</td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 rounded bg-[#E8D8C3] text-[#493426] text-[10px] uppercase font-bold">
                          {o.status || 'Pending'}
                        </span>
                      </td>
                      <td className="p-3 text-end">
                        <select
                          value={o.status || 'pending'}
                          onChange={e => handleUpdateOrderStatus(idx, e.target.value)}
                          className="border border-[#D1B99C] bg-white p-1 text-xs"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* TAB 4: Configuration */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="bg-[#FFF9F1] border border-[#E8D8C3] p-8 shadow-sm max-w-xl space-y-5">
            <h2 className="font-serif text-2xl text-[#493426]">Store Configuration</h2>

            <div className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[#8B674D] mb-1 font-semibold">
                  Official WhatsApp Contact Number
                </label>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={e => setWhatsappNumber(e.target.value)}
                  placeholder="e.g. +201012345678"
                  className="w-full border border-[#D1B99C] p-2.5 bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-[#8B674D] mb-1 font-semibold">
                  Official Facebook Page URL
                </label>
                <input
                  type="text"
                  value={facebookUrl}
                  onChange={e => setFacebookUrl(e.target.value)}
                  placeholder="https://facebook.com/..."
                  className="w-full border border-[#D1B99C] p-2.5 bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-[#8B674D] mb-1 font-semibold">
                  Official Instagram Profile URL
                </label>
                <input
                  type="text"
                  value={instagramUrl}
                  onChange={e => setInstagramUrl(e.target.value)}
                  placeholder="https://instagram.com/..."
                  className="w-full border border-[#D1B99C] p-2.5 bg-white text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#493426] text-[#FFF9F1] hover:bg-[#8B674D] text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-colors shadow mt-4"
              >
                Save Settings
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
