import Link from 'next/link';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatsCard({ title, value, icon: Icon, trend, trendValue, link }) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">
                    {title}
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-sPrimary">
                    <Icon size={16} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-slate-900">{value}</div>
                {/* {(trend || trendValue) && (
                    <div className="flex items-center text-xs mt-1">
                        {trend === 'up' ? (
                            <span className="text-green-500 flex items-center font-medium">
                                <ArrowUpRight size={14} className="mr-1" /> {trendValue}
                            </span>
                        ) : trend === 'down' ? (
                            <span className="text-red-500 flex items-center font-medium">
                                <ArrowDownRight size={14} className="mr-1" /> {trendValue}
                            </span>
                        ) : (
                            <span className="text-slate-400">{trendValue}</span>
                        )}
                        <span className="text-slate-400 ml-1">from last month</span>
                    </div>
                )} */}
                {link && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                        <Link href={link} className="text-xs text-sPrimary hover:underline font-medium">View Details</Link>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
