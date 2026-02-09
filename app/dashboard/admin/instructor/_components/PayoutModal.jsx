"use client";
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign } from 'lucide-react';

export function PayoutModal({ isOpen, onClose, instructor, onConfirm }) {
    const [amount, setAmount] = useState(instructor?.pendingAmount || 0);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleConfirm = async () => {
        setIsProcessing(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        onConfirm(instructor.id, amount);
        setIsProcessing(false);
        onClose();
    };

    if (!instructor) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Process Payout</DialogTitle>
                    <DialogDescription>
                        Enter the amount to pay to <span className="font-bold text-slate-900">{instructor.name}</span>.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                            Amount
                        </Label>
                        <div className="col-span-3 relative">
                            <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <Input
                                id="amount"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="pl-9"
                            />
                        </div>
                    </div>
                    <div className="text-sm text-slate-500 text-center">
                        Pending Balance: <span className="font-bold text-slate-900">${instructor.pendingAmount.toLocaleString()}</span>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleConfirm} disabled={isProcessing} className="bg-green-600 hover:bg-green-700 text-white">
                        {isProcessing ? "Processing..." : "Confirm Payout"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
