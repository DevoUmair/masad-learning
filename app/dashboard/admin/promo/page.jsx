"use client";
import React, { useState } from 'react';
import { Plus, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AddPromoModal from './_components/AddPromoModal';
import PromoTable from './_components/PromoTable';

export default function PromoManagementPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-8 space-y-8 font-lexend max-w-7xl mx-auto min-h-[calc(100vh-2rem)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                        <Tag className="text-sPrimary" />
                        Promo Management
                    </h1>
                    <p className="text-slate-500 mt-1">Create, track, and manage Stripe promotional discount codes.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-sPrimary text-white gap-2 h-11 px-6 shadow-sm hover:shadow"
                    >
                        <Plus size={18} /> Add New Promo
                    </Button>
                </div>
            </div>

            <div className="mt-8">
                <PromoTable />
            </div>

            <AddPromoModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
            />
        </div>
    );
}
