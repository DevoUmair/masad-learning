'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';

export default function RegisterTabs({ defaultValue }) {
    const router = useRouter();

    const onValueChange = (value) => {
        if (value === 'student') {
            router.push('/register/student');
        } else {
            router.push('/register/instructor');
        }
    };

    return (
        <Tabs value={defaultValue} className="w-full mb-8" onValueChange={onValueChange}>
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                    value="student"
                    className="data-[state=active]:bg-sPrimary data-[state=active]:text-white cursor-pointer"
                >
                    Student
                </TabsTrigger>
                <TabsTrigger
                    value="instructor"
                    className="data-[state=active]:bg-sPrimary data-[state=active]:text-white cursor-pointer"
                >
                    Instructor
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
