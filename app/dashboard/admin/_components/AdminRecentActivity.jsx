"use client";
import React from 'react';

const recentActivities = [
    {
        id: 1,
        type: 'enrollment',
        user: 'Sarah Johnson',
        course: 'Advanced React Patterns',
        amount: '$49.99',
        time: '2 hours ago',
        avatar: 'SJ'
    },
    {
        id: 2,
        type: 'payout',
        user: 'Dr. Ali Hassan',
        amount: '$1,250.00',
        time: '5 hours ago',
        status: 'Processed'
    },
    {
        id: 3,
        type: 'new_course',
        user: 'Fatima Al-Zahra',
        course: 'UI/UX Design Masterclass',
        time: '1 day ago',
        status: 'Pending Review'
    },
    {
        id: 4,
        type: 'enrollment',
        user: 'Ahmed Khan',
        course: 'Python for Data Science',
        amount: '$89.99',
        time: '1 day ago',
        avatar: 'AK'
    },
];

export default function AdminRecentActivity({ activities = [] }) {
    return (
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                Recent Activity
            </h2>
            <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex gap-4 items-start">
                        <div className={`mt-1 size-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 
                            ${activity.type === 'enrollment' ? 'bg-green-100 text-green-600' :
                                activity.type === 'payout' ? 'bg-blue-100 text-blue-600' :
                                    'bg-purple-100 text-purple-600'}`}>
                            {activity.type === 'enrollment' ? '$' :
                                activity.type === 'payout' ? 'P' : 'C'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900 truncate">
                                {activity.type === 'enrollment' && `New Enrollment`}
                                {activity.type === 'payout' && `Payout Processed`}
                                {activity.type === 'new_course' && `New Course Submitted`}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">
                                {activity.type === 'enrollment' && <><span className="font-medium text-slate-700">{activity.user}</span> purchased <span className="font-medium text-slate-700">{activity.course}</span></>}
                                {activity.type === 'payout' && <>Sent <span className="font-medium text-slate-700">{activity.amount}</span> to <span className="font-medium text-slate-700">{activity.user}</span></>}
                                {activity.type === 'new_course' && <><span className="font-medium text-slate-700">{activity.user}</span> submitted <span className="font-medium text-slate-700">{activity.course}</span></>}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-1">{activity.time}</p>
                        </div>
                        {activity.amount && activity.type === 'enrollment' && (
                            <span className="text-sm font-bold text-green-600">+{activity.amount}</span>
                        )}
                    </div>
                ))}
            </div>
            <button className="w-full text-center text-sm font-bold text-sPrimary mt-6 hover:underline">View All Activity</button>
        </div>
    );
}
