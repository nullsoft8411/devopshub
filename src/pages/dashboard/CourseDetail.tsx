import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { VideoPlayer } from '@/components/courses/VideoPlayer';
import { CourseProgress } from '@/components/courses/CourseProgress';
import { ResourceList } from '@/components/courses/ResourceList';
import { LessonList } from '@/components/courses/LessonList';

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Link to="/dashboard/courses">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <VideoPlayer poster="https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=1200" />

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-900">Docker Fundamentals</h1>
            <p className="mt-2 text-gray-600">
              Learn Docker from the basics to advanced concepts. This course covers everything from container basics to multi-container applications and deployment strategies.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Course Content</h2>
            <div className="space-y-6">
              <LessonList chapter={{
                title: "Getting Started with Docker",
                lessons: [
                  {
                    id: "1",
                    title: "Introduction to Docker",
                    duration: "15 min",
                    type: "video",
                    completed: false
                  },
                  {
                    id: "2",
                    title: "Docker Architecture",
                    duration: "20 min",
                    type: "video",
                    completed: false
                  }
                ]
              }} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <CourseProgress
            completedLessons={2}
            totalLessons={10}
            duration="2 hours"
          />

          <ResourceList resources={[
            {
              title: "Docker Command Cheat Sheet",
              type: "PDF",
              size: "1.2 MB"
            },
            {
              title: "Container Best Practices",
              type: "PDF",
              size: "2.4 MB"
            }
          ]} />
        </div>
      </div>
    </div>
  );
}