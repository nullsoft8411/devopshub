import { LabTask } from '@/types/lab';
import { commandRegistry } from '@/lib/command-registry';

export interface TaskValidationResult {
  isValid: boolean;
  message: string;
  output: string;
  taskId: number;
  completed: boolean;
  progress: number;
  hints: string[];
  similarCommands: string[];
  timeSpent: number;
  attempts: number;
  feedback: {
    type: 'success' | 'error' | 'warning';
    message: string;
    details?: string[];
  };
}

export class TaskValidator {
  private task: LabTask;
  private startTime: Date;
  private attempts: number;
  private lastAttemptTime?: Date;
  private commandHistory: string[];

  constructor(task: LabTask) {
    this.task = task;
    this.startTime = new Date();
    this.attempts = 0;
    this.commandHistory = [];
  }

  validateTask(command: string): TaskValidationResult {
    this.attempts++;
    this.lastAttemptTime = new Date();
    this.commandHistory.push(command);

    const registryCommand = commandRegistry[command];
    const isValid = command === this.task.command;

    const timeSpent = this.lastAttemptTime.getTime() - this.startTime.getTime();
    const progress = this.calculateProgress(command, isValid);

    return {
      isValid,
      message: isValid ? 'Command executed successfully!' : 'Command not quite right',
      output: registryCommand?.output || 'Command not recognized',
      taskId: this.task.id,
      completed: isValid,
      progress,
      hints: this.generateHints(command, isValid),
      similarCommands: this.findSimilarCommands(command),
      timeSpent,
      attempts: this.attempts,
      feedback: this.generateFeedback(command, isValid)
    };
  }

  private calculateProgress(command: string, isValid: boolean): number {
    if (isValid) return 100;
    
    // Calculate similarity between input and expected command
    const similarity = this.calculateSimilarity(command, this.task.command);
    return Math.min(Math.round(similarity * 80), 99); // Max 99% until fully correct
  }

  private generateHints(command: string, isValid: boolean): string[] {
    const hints: string[] = [];

    if (!isValid) {
      if (this.task.hint) {
        hints.push(this.task.hint);
      }

      if (this.attempts > 2) {
        hints.push(this.getProgressiveHint());
      }
    }

    return hints;
  }

  private getProgressiveHint(): string {
    const parts = this.task.command.split(' ');
    
    if (this.attempts <= 3) {
      return `The command starts with: ${parts[0]}`;
    } else if (this.attempts <= 5) {
      return `Try using these flags: ${parts
        .filter(part => part.startsWith('-'))
        .join(' ')}`;
    } else {
      return `The command structure is similar to: ${this.task.command
        .replace(/[^ -]/g, 'x')}`;
    }
  }

  private findSimilarCommands(command: string): string[] {
    return Object.keys(commandRegistry)
      .filter(cmd => this.calculateSimilarity(cmd, command) > 0.7)
      .slice(0, 3);
  }

  private calculateSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = this.levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  }

  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => 
      Array(str1.length + 1).fill(null)
    );

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const substitutionCost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + substitutionCost
        );
      }
    }

    return matrix[str2.length][str1.length];
  }

  private generateFeedback(command: string, isValid: boolean): TaskValidationResult['feedback'] {
    if (isValid) {
      return {
        type: 'success',
        message: 'Great job! Command executed successfully.',
        details: ['Task completed', `Completed in ${this.attempts} attempts`]
      };
    }

    if (this.attempts > 5) {
      return {
        type: 'warning',
        message: 'Keep trying! Consider using the hints for guidance.',
        details: ['Check the command syntax', 'Review the task requirements']
      };
    }

    return {
      type: 'error',
      message: 'Command not quite right. Check the syntax and try again.',
      details: ['Verify the command format', 'Make sure all required flags are included']
    };
  }

  getStatistics() {
    return {
      attempts: this.attempts,
      timeSpent: this.lastAttemptTime ? 
        this.lastAttemptTime.getTime() - this.startTime.getTime() : 
        0,
      commandHistory: this.commandHistory,
      averageTimeBetweenAttempts: this.getAverageTimeBetweenAttempts()
    };
  }

  private getAverageTimeBetweenAttempts(): number {
    if (this.attempts <= 1) return 0;
    return this.getStatistics().timeSpent / (this.attempts - 1);
  }
}