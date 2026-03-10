"use client";
import React, { useState } from 'react';
import { useGetPromosQuery, useTogglePromoStatusMutation, useDeletePromoMutation } from "@/redux/promo/promoApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"; // User might not have switch, so I will use a simple button toggle just in case
import { Loader2, Trash2, Tag, Percent } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function PromoTable() {
    const { data: promos, isLoading } = useGetPromosQuery();
    const [togglePromoStatus, { isLoading: isToggling }] = useTogglePromoStatusMutation();

    const [actionId, setActionId] = useState(null);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Loader2 size={32} className="animate-spin text-sPrimary" />
            </div>
        );
    }

    if (!promos || promos.length === 0) {
        return (
            <div className="bg-white border text-center border-slate-200 rounded-xl p-12">
                <Tag className="size-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900">No Promos Found</h3>
                <p className="text-sm text-slate-500 mt-1">You haven't created any promotional codes yet.</p>
            </div>
        );
    }

    const handleToggle = async (id, currentStatus) => {
        setActionId(id);
        try {
            await togglePromoStatus(id).unwrap();
            toast.success(`Promo code deactivated successfully`);
        } catch (error) {
            toast.error(error?.data?.message || "Failed to toggle status");
        } finally {
            setActionId(null);
        }
    };



    return (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50 hover:bg-slate-50">
                        <TableHead className="font-bold text-slate-700">Code</TableHead>
                        <TableHead className="font-bold text-slate-700">Discount</TableHead>
                        <TableHead className="font-bold text-slate-700">Redemptions</TableHead>
                        <TableHead className="font-bold text-slate-700">Expires</TableHead>
                        <TableHead className="font-bold text-slate-700">Status</TableHead>
                        <TableHead className="font-bold text-slate-700 text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {promos.map((promo) => (
                        <TableRow key={promo._id}>
                            <TableCell>
                                <div className="font-black text-slate-900 uppercase">{promo.code}</div>
                                <div className="text-xs text-slate-400 font-mono mt-0.5" title="Stripe Promo ID">{promo.stripePromoId.substring(0, 15)}...</div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 font-bold border-none gap-1">
                                    <Percent size={12} /> {promo.discountValue}% OFF
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="text-sm font-medium text-slate-700">
                                    {promo.currentRedemptions} / {promo.maxRedemptions || "∞"}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="text-sm font-medium text-slate-700">
                                    {format(new Date(promo.expiryDate), "dd MMM, yyyy")}
                                </div>
                                {new Date(promo.expiryDate) < new Date() && (
                                    <span className="text-xs text-red-500 font-bold">Expired</span>
                                )}
                            </TableCell>
                            <TableCell>
                                {promo.isActive && new Date(promo.expiryDate) > new Date() ? (
                                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 font-bold border-none">Active</Badge>
                                ) : (
                                    <Badge variant="outline" className="text-slate-500 font-bold bg-slate-100 border-none">Inactive</Badge>
                                )}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2 items-center">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleToggle(promo._id, promo.isActive)}
                                        disabled={isToggling && actionId === promo._id}
                                        className="h-8 text-xs font-semibold"
                                    >
                                        {isToggling && actionId === promo._id ? <Loader2 size={14} className="animate-spin mr-1" /> : null}
                                        {promo.isActive ? "Deactivate" : "Activate"}
                                    </Button>


                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
