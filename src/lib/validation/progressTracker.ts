export interface TaskProgress {
  taskId: number;
  completed: boolean;
  attempts: number;
  timeSpent: number;
  lastAttempt?: Date;
}

export class ProgressTracker {
  private progress: Map<number, TaskProgress>;
  private startTime: Date;

  constructor() {
    this.progress = new Map();
    this.startTime = new Date();
  }

  initializeTask(taskId: number) {
    if (!this.progress.has(taskId)) {
      this.progress.set(taskId, {
        taskId,
        completed: false,
        attempts: 0,
        timeSpent: 0
      });
    }
  }

  recordAttempt(taskId: number, success: boolean) {
    const task = this.progress.get(taskId);
    if (task) {
      const now = new Date();
      const timeSpent = task.lastAttempt ? 
        now.getTime() - task.lastAttempt.getTime() : 
        0;

      this.progress.set(taskId, {
        ...task,
        completed: success || task.completed,
        attempts: task.attempts + 1,
        timeSpent: task.timeSpent + timeSpent,
        lastAttempt: now
      });
    }
  }

  getTaskProgress(taskId: number): TaskProgress | undefined {
    return this.progress.get(taskId);
  }

  getAllProgress(): TaskProgress[] {
    return Array.from(this.progress.values());
  }

  getCompletedTasks(): number[] {
    return Array.from(this.progress.values())
      .filter(task => task.completed)
      .map(task => task.id);
  }

  getTotalProgress(): number {
    const completed = this.getCompletedTasks().length;
    return Math.round((completed / this.progress.size) * 100);
  }

  getTotalTimeSpent(): number {
    return Array.from(this.progress.values())
      .reduce((total, task) => total + task.timeSpent, 0);
  }

  getAverageAttemptsPerTask(): number {
    const totalAttempts = Array.from(this.progress.values())
      .reduce((total, task) => total + task.attempts, 0);
    return totalAttempts / this.progress.size;
  }

  getSessionDuration(): number {
    return new Date().getTime() - this.startTime.getTime();
  }
}