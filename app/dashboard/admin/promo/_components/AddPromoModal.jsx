"use client";
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, DollarSign, Percent, Plus } from "lucide-react";
import { useCreatePromoMutation } from "@/redux/promo/promoApi";
import { toast } from 'sonner';

export default function AddPromoModal({ open, onOpenChange }) {
    const [createPromo, { isLoading }] = useCreatePromoMutation();

    const [formData, setFormData] = useState({
        codeName: '',
        percentOff: '',
        expiryDate: null,
        maxRedemptions: ''
    });

    const [dateOpen, setDateOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.codeName || !formData.percentOff || !formData.expiryDate) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            const payload = {
                codeName: formData.codeName,
                percentOff: Number(formData.percentOff),
                expiryDate: new Date(formData.expiryDate).toISOString(),
                maxRedemptions: formData.maxRedemptions ? Number(formData.maxRedemptions) : null
            }

            await createPromo(payload).unwrap();
            toast.success("Stripe Promo Code Created Successfully!");
            onOpenChange(false);

            // reset
            setFormData({
                codeName: '',
                percentOff: '',
                expiryDate: null,
                maxRedemptions: ''
            });
        } catch (error) {
            toast.error(error?.data?.message || "Failed to create promo code");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create New Promo Code</DialogTitle>
                        <DialogDescription>Add a new discount code via Stripe. Only percentage discounts are supported.</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-6">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="codeName">Promo Code <span className="text-red-500">*</span></Label>
                            <Input
                                id="codeName"
                                placeholder="e.g. SUMMER20"
                                value={formData.codeName}
                                onChange={(e) => setFormData({ ...formData, codeName: e.target.value.toUpperCase() })}
                                className="uppercase"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="percentOff">Discount Percentage (%) <span className="text-red-500">*</span></Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-slate-400">
                                    <Percent size={16} />
                                </span>
                                <Input
                                    id="percentOff"
                                    type="number"
                                    min="1"
                                    max="100"
                                    placeholder="20"
                                    className="pl-9"
                                    value={formData.percentOff}
                                    onChange={(e) => setFormData({ ...formData, percentOff: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="expiryDate">Expiry Date <span className="text-red-500">*</span></Label>
                            <Input
                                id="expiryDate"
                                type="date"
                                min={new Date().toISOString().split('T')[0]}
                                value={formData.expiryDate || ""}
                                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="maxRedemptions">Maximum Redemptions (Optional)</Label>
                            <Input
                                id="maxRedemptions"
                                type="number"
                                min="1"
                                placeholder="e.g. 100 for first 100 uses"
                                value={formData.maxRedemptions}
                                onChange={(e) => setFormData({ ...formData, maxRedemptions: e.target.value })}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button type="submit" className="bg-sPrimary text-white" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                            Create Promo
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
