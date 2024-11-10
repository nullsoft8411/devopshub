import { DockerCommand } from '@/types/lab';
import { commandRegistry } from '@/lib/command-registry';

export interface CommandValidationResult {
  isValid: boolean;
  output: string;
  error?: string;
  suggestion?: string;
}

export class CommandValidator {
  static validateCommand(input: string, expectedCommand: string): CommandValidationResult {
    const command = input.trim();
    const registryCommand = commandRegistry[command];

    if (!registryCommand) {
      return {
        isValid: false,
        output: '',
        error: 'Command not recognized',
        suggestion: 'Check the command syntax or use the help command'
      };
    }

    if (command !== expectedCommand) {
      return {
        isValid: false,
        output: registryCommand.output,
        error: 'Command does not match the expected solution',
        suggestion: 'Review the task requirements and try again'
      };
    }

    return {
      isValid: true,
      output: registryCommand.output
    };
  }

  static validateOutput(output: string, expectedPattern: RegExp): boolean {
    return expectedPattern.test(output);
  }

  static getSimilarCommands(command: string): string[] {
    const commands = Object.keys(commandRegistry);
    return commands.filter(cmd => {
      const distance = this.levenshteinDistance(command, cmd);
      return distance <= 3; // Show commands with up to 3 character differences
    });
  }

  private static levenshteinDistance(a: string, b: string): number {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = Array(b.length + 1).fill(null).map(() => 
      Array(a.length + 1).fill(null)
    );

    for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= b.length; j++) {
      for (let i = 1; i <= a.length; i++) {
        const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + substitutionCost
        );
      }
    }

    return matrix[b.length][a.length];
  }
}