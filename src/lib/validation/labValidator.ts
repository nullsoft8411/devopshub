import { Lab, LabTask } from '@/types/lab';
import { commandRegistry } from '@/lib/command-registry';

export interface ValidationResult {
  isValid: boolean;
  message: string;
  suggestion?: string;
}

export class LabValidator {
  private lab: Lab;
  private currentTask: LabTask;

  constructor(lab: Lab, currentTaskIndex: number) {
    this.lab = lab;
    this.currentTask = lab.tasks[currentTaskIndex];
  }

  validateCommand(command: string): ValidationResult {
    // Check if command exists in registry
    if (!commandRegistry[command]) {
      return {
        isValid: false,
        message: 'Command not recognized',
        suggestion: 'Check the command syntax or use the help command'
      };
    }

    // Check if command matches expected command for current task
    if (command !== this.currentTask.command) {
      return {
        isValid: false,
        message: 'Not quite right',
        suggestion: this.currentTask.hint || 'Try using the hint if you need help'
      };
    }

    // Command is valid and matches expected command
    return {
      isValid: true,
      message: 'Command executed successfully!'
    };
  }

  static validateTaskCompletion(lab: Lab, completedTasks: number[]): boolean {
    return completedTasks.length === lab.tasks.length;
  }

  static getNextTask(lab: Lab, completedTasks: number[]): LabTask | null {
    const remainingTasks = lab.tasks.filter(task => !completedTasks.includes(task.id));
    return remainingTasks[0] || null;
  }

  static getProgress(lab: Lab, completedTasks: number[]): number {
    return Math.round((completedTasks.length / lab.tasks.length) * 100);
  }
}