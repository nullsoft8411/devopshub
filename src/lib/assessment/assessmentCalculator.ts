import { Lab, LabTask } from '@/types/lab';

interface AssessmentResult {
  score: number;
  accuracy: number;
  efficiency: number;
  skills: {
    name: string;
    value: number;
    fullMark: number;
  }[];
  metrics: {
    name: string;
    value: number;
    trend: number;
    unit: string;
  }[];
}

export class AssessmentCalculator {
  private lab: Lab;
  private completedTasks: number[];
  private attempts: Record<number, number>;
  private timeSpent: number;
  private commandHistory: string[];

  constructor(
    lab: Lab,
    completedTasks: number[],
    attempts: Record<number, number>,
    timeSpent: number,
    commandHistory: string[]
  ) {
    this.lab = lab;
    this.completedTasks = completedTasks;
    this.attempts = attempts;
    this.timeSpent = timeSpent;
    this.commandHistory = commandHistory;
  }

  calculate(): AssessmentResult {
    const accuracy = this.calculateAccuracy();
    const efficiency = this.calculateEfficiency();
    const skills = this.assessSkills();
    const metrics = this.calculateMetrics();

    return {
      score: this.calculateOverallScore(accuracy, efficiency),
      accuracy,
      efficiency,
      skills,
      metrics
    };
  }

  private calculateAccuracy(): number {
    const totalTasks = this.lab.tasks.length;
    const completedTasksCount = this.completedTasks.length;
    const averageAttempts = Object.values(this.attempts).reduce((sum, attempts) => sum + attempts, 0) / totalTasks;

    // Weight completion rate more heavily than attempt efficiency
    const completionRate = (completedTasksCount / totalTasks) * 100;
    const attemptEfficiency = Math.max(0, 100 - (averageAttempts - 1) * 20);

    return Math.round((completionRate * 0.7 + attemptEfficiency * 0.3));
  }

  private calculateEfficiency(): number {
    const expectedDuration = this.parseExpectedDuration(this.lab.duration);
    const timeEfficiency = Math.min(100, (expectedDuration / this.timeSpent) * 100);
    
    const commandEfficiency = this.calculateCommandEfficiency();
    
    return Math.round((timeEfficiency * 0.6 + commandEfficiency * 0.4));
  }

  private calculateCommandEfficiency(): number {
    const optimalCommandCount = this.lab.tasks.length;
    const actualCommandCount = this.commandHistory.length;
    
    return Math.min(100, (optimalCommandCount / actualCommandCount) * 100);
  }

  private assessSkills(): { name: string; value: number; fullMark: number; }[] {
    // Example skill assessment based on task categories and performance
    const skills = new Map<string, { completed: number; total: number }>();

    this.lab.tasks.forEach(task => {
      const category = this.categorizeTask(task);
      if (!skills.has(category)) {
        skills.set(category, { completed: 0, total: 0 });
      }
      const skill = skills.get(category)!;
      skill.total++;
      if (this.completedTasks.includes(task.id)) {
        skill.completed++;
      }
    });

    return Array.from(skills.entries()).map(([name, { completed, total }]) => ({
      name,
      value: Math.round((completed / total) * 100),
      fullMark: 100
    }));
  }

  private calculateMetrics(): { name: string; value: number; trend: number; unit: string; }[] {
    return [
      {
        name: 'Task Completion Rate',
        value: Math.round((this.completedTasks.length / this.lab.tasks.length) * 100),
        trend: 5, // This would come from historical data
        unit: '%'
      },
      {
        name: 'Average Time per Task',
        value: Math.round(this.timeSpent / this.completedTasks.length / 1000),
        trend: -10,
        unit: 's'
      },
      {
        name: 'Command Accuracy',
        value: this.calculateCommandAccuracy(),
        trend: 15,
        unit: '%'
      }
    ];
  }

  private calculateOverallScore(accuracy: number, efficiency: number): number {
    return Math.round((accuracy * 0.6 + efficiency * 0.4));
  }

  private parseExpectedDuration(duration: string): number {
    const match = duration.match(/(\d+)\s*(minute|hour)s?/);
    if (!match) return 0;
    const [, value, unit] = match;
    return unit === 'hour' 
      ? parseInt(value) * 60 * 60 * 1000 
      : parseInt(value) * 60 * 1000;
  }

  private categorizeTask(task: LabTask): string {
    // Implement task categorization logic based on command patterns
    if (task.command.startsWith('docker')) return 'Container Management';
    if (task.command.startsWith('kubectl')) return 'Orchestration';
    if (task.command.includes('git')) return 'Version Control';
    return 'System Administration';
  }

  private calculateCommandAccuracy(): number {
    const successfulCommands = this.commandHistory.filter(cmd => 
      this.lab.tasks.some(task => task.command === cmd)
    ).length;
    
    return Math.round((successfulCommands / this.commandHistory.length) * 100);
  }
}