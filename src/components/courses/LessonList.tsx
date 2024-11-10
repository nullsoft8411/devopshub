import React from 'react';
import { Play, FileText, CheckCircle } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'lab';
  completed: boolean;
}

interface Chapter {
  title: string;
  lessons: Lesson[];
}

interface LessonListProps {
  chapter: Chapter;
}

export function LessonList({ chapter }: LessonListProps) {
  return (
    <div>
      <h3 className="font-medium text-gray-900 mb-3">{chapter.title}</h3>
      <div className="space-y-1">
        {chapter.lessons.map((lesson) => (
          <button
            key={lesson.id}
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              {lesson.type === 'video' ? (
                <Play className="h-5 w-5 text-gray-400" />
              ) : (
                <FileText className="h-5 w-5 text-gray-400" />
              )}
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">{lesson.title}</p>
                <p className="text-xs text-gray-500">
                  {lesson.type === 'video' ? 'Video' : 'Lab'} • {lesson.duration}
                </p>
              </div>
            </div>
            {lesson.completed ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <span className="text-xs text-gray-500">{lesson.duration}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}