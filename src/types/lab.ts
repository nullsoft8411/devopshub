export interface DockerCommand {
  command: string;
  description: string;
  output: string;
}

export interface LabTask {
  id: number;
  title: string;
  description: string;
  command: string;
  hint?: string;
  validation?: (output: string) => boolean;
}

export interface Lab {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  tasks: LabTask[];
  prerequisites?: string[];
}

export interface LabProgress {
  labId: string;
  userId: string;
  completedTasks: number[];
  startedAt: Date;
  completedAt?: Date;
}