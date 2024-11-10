import { z } from 'zod';
import { commandRegistry } from '../command-registry';

export interface ValidationResult {
  isValid: boolean;
  message: string;
  output?: string;
  errors?: string[];
  suggestions?: string[];
  performance?: {
    timeSpent: number;
    attempts: number;
    efficiency: number;
  };
}

export class ValidationEngine {
  private attempts: number = 0;
  private startTime: number;

  constructor() {
    this.startTime = Date.now();
  }

  validateCommand(command: string, expectedCommand: string): ValidationResult {
    this.attempts++;
    const timeSpent = Date.now() - this.startTime;

    // Basic command validation
    if (!command.trim()) {
      return {
        isValid: false,
        message: 'Command cannot be empty',
        errors: ['Please enter a command']
      };
    }

    // Check if command exists in registry
    const registryCommand = commandRegistry[command];
    if (!registryCommand) {
      return {
        isValid: false,
        message: 'Command not recognized',
        errors: ['Command not found in registry'],
        suggestions: this.findSimilarCommands(command)
      };
    }

    // Check if command matches expected command
    if (command !== expectedCommand) {
      return {
        isValid: false,
        message: 'Command does not match expected solution',
        output: registryCommand.output,
        suggestions: this.generateHints(expectedCommand),
        performance: {
          timeSpent,
          attempts: this.attempts,
          efficiency: this.calculateEfficiency(timeSpent)
        }
      };
    }

    // Command is valid
    return {
      isValid: true,
      message: 'Command executed successfully!',
      output: registryCommand.output,
      performance: {
        timeSpent,
        attempts: this.attempts,
        efficiency: this.calculateEfficiency(timeSpent)
      }
    };
  }

  private findSimilarCommands(command: string): string[] {
    const commands = Object.keys(commandRegistry);
    return commands
      .filter(cmd => this.calculateSimilarity(cmd, command) > 0.7)
      .slice(0, 3);
  }

  private generateHints(expectedCommand: string): string[] {
    const hints = [];
    const parts = expectedCommand.split(' ');

    // Base command hint
    hints.push(`Try using '${parts[0]}' as the base command`);

    // Flag hints
    const flags = parts.filter(p => p.startsWith('-'));
    if (flags.length > 0) {
      hints.push(`Consider using these flags: ${flags.join(', ')}`);
    }

    return hints;
  }

  private calculateSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    return (longer.length - this.levenshteinDistance(longer, shorter)) / longer.length;
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

  private calculateEfficiency(timeSpent: number): number {
    // Base efficiency starts at 100 and decreases based on time and attempts
    let efficiency = 100;

    // Reduce efficiency by 10% for each attempt after the first
    efficiency -= Math.max(0, (this.attempts - 1) * 10);

    // Reduce efficiency by 5% for each 30 seconds
    efficiency -= Math.max(0, Math.floor(timeSpent / 30000) * 5);

    return Math.max(0, Math.min(100, efficiency));
  }

  reset(): void {
    this.attempts = 0;
    this.startTime = Date.now();
  }
}