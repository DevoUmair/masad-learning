import React from 'react';
import { Mail, Calendar, MapPin, Phone } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function StudentInfoCard({ student }) {
    return (
        <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-slate-900 to-slate-800 relative">
                <div className="absolute -bottom-10 left-8">
                    <Avatar className="size-24 border-4 border-white shadow-md">
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <CardContent className="pt-12 px-8 pb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">{student.name}</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200">
                                Student
                            </Badge>
                            <span className="text-xs text-slate-400">• Joined {student.joinedDate}</span>
                        </div>
                    </div>
                    {/* Potential Action Buttons could go here */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="size-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                            <Mail size={16} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Email Address</p>
                            <p className="font-medium">{student.email}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
