import { ActiveCourseCard } from "../_components/ActiveCourse";
const mockCourses = [
    {
        id: 1,
        title: "Full-Stack Development with Next.js & TypeScript",
        instructor: "Dr. Sarah Khan",
        progress: 65,
        category: "Technology",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        title: "Cloud Infrastructure & AWS Solutions Architecture",
        instructor: "Mohammed Al-Fayed",
        progress: 30,
        category: "Technology",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        title: "Cybersecurity: Ethical Hacking & Defense",
        instructor: "Dr. James Wilson",
        progress: 10,
        category: "Security",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 4,
        title: "Modern UI/UX Design Systems for Web",
        instructor: "Fatima Al-Zahra",
        progress: 85,
        category: "Design",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 5,
        title: "AI and Machine Learning Fundamentals",
        instructor: "Dr. Ali Hassan",
        progress: 0,
        category: "Technology",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
    }
];

export default function CoursesPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col ">
                <h2 className="text-2xl font-black text-sPrimary dark:text-white tracking-tight">
                    My Courses
                </h2>
                <p className="text-sSecondary">Manage and continue your learning journey.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockCourses.map((course) => (
                    <ActiveCourseCard
                        key={course.id}
                        title={course.title}
                        instructor={course.instructor}
                        progress={course.progress}
                        category={course.category}
                        image={course.image}
                    />
                ))}
            </div>
        </div>
    );
}
