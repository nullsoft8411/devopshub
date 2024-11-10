export interface PathPrerequisite {
  id: string;
  type: 'course' | 'skill' | 'certification';
  title: string;
  description: string;
  completed: boolean;
}

export interface PathMilestone {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  category: string;
  image: string;
  prerequisites: PathPrerequisite[];
  milestones: PathMilestone[];
  courses: string[];
  skills: string[];
  certification?: {
    name: string;
    description: string;
    validityPeriod: string;
  };
}

export interface PathProgress {
  pathId: string;
  userId: string;
  startedAt: Date;
  completedAt?: Date;
  completedCourses: string[];
  completedMilestones: string[];
  currentCourse?: string;
  xpEarned: number;
  certificateIssued?: boolean;
}