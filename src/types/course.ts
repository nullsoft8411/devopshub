export interface CourseLesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'text' | 'quiz' | 'lab';
  content?: string;
  videoUrl?: string;
  completed: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  image: string;
  modules: CourseModule[];
  prerequisites?: string[];
  skills: string[];
  instructor: {
    name: string;
    title: string;
    avatar: string;
  };
  stats: {
    students: string;
    rating: number;
    reviews: number;
  };
}

export interface CourseProgress {
  courseId: string;
  userId: string;
  startedAt: Date;
  completedAt?: Date;
  completedLessons: string[];
  currentLesson?: string;
  quizScores: Record<string, number>;
  lastAccessedAt: Date;
}