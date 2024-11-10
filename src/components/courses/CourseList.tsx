import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Lock } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  duration: string;
  lessons: number;
  progress: number;
  image: string;
}

interface CourseListProps {
  courses: Course[];
}

export function CourseList({ courses }: CourseListProps) {
  return (
    <div className="space-y-4">
      {courses.map((course, index) => (
        <Link
          key={course.id}
          to={`/courses/${course.id}`}
          className="group block"
        >
          <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="relative flex-shrink-0">
              <img
                src={course.image}
                alt={course.title}
                className="w-24 h-16 object-cover rounded-lg"
              />
              {index > 0 && (
                <div className="absolute inset-0 bg-gray-900/60 rounded-lg flex items-center justify-center">
                  <Lock className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600">
                  {course.title}
                </h4>
                {index === 0 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    Up Next
                  </span>
                )}
              </div>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <span>{course.duration}</span>
                <span className="mx-2">•</span>
                <span>{course.lessons} lessons</span>
              </div>
              {course.progress > 0 && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{course.progress}% complete</span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-blue-600 h-1 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            {index === 0 && (
              <Play className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}