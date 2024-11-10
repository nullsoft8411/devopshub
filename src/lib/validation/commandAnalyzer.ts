export class CommandAnalyzer {
  private static readonly COMMON_PATTERNS = {
    flags: /^-{1,2}[a-zA-Z]/,
    arguments: /^[a-zA-Z0-9_\-\.\/]+$/,
    options: /^--[a-zA-Z][a-zA-Z0-9-]*=/
  };

  analyzeCommand(command: string): {
    isValid: boolean;
    suggestions: string[];
    errors: string[];
  } {
    const parts = command.split(' ');
    const baseCommand = parts[0];
    const errors: string[] = [];
    const suggestions: string[] = [];

    // Analyze base command
    if (!this.isValidBaseCommand(baseCommand)) {
      errors.push(`Invalid base command: ${baseCommand}`);
      suggestions.push(this.suggestSimilarCommand(baseCommand));
    }

    // Analyze flags and arguments
    parts.slice(1).forEach(part => {
      if (this.COMMON_PATTERNS.flags.test(part)) {
        if (!this.isValidFlag(part)) {
          errors.push(`Invalid flag format: ${part}`);
          suggestions.push(this.suggestCorrectFlag(part));
        }
      } else if (this.COMMON_PATTERNS.options.test(part)) {
        if (!this.isValidOption(part)) {
          errors.push(`Invalid option format: ${part}`);
          suggestions.push(this.suggestCorrectOption(part));
        }
      }
    });

    return {
      isValid: errors.length === 0,
      suggestions,
      errors
    };
  }

  private isValidBaseCommand(command: string): boolean {
    return /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(command);
  }

  private isValidFlag(flag: string): boolean {
    return /^-[a-zA-Z]$|^--[a-zA-Z][a-zA-Z0-9-]*$/.test(flag);
  }

  private isValidOption(option: string): boolean {
    const [key, value] = option.split('=');
    return this.isValidFlag(key) && value !== undefined;
  }

  private suggestSimilarCommand(command: string): string {
    // Add command suggestion logic based on Levenshtein distance
    const commonCommands = ['docker', 'kubectl', 'git', 'npm'];
    const closest = commonCommands.reduce((best, current) => {
      const currentDistance = this.levenshteinDistance(command, current);
      const bestDistance = this.levenshteinDistance(command, best);
      return currentDistance < bestDistance ? current : best;
    });
    return `Did you mean: ${closest}?`;
  }

  private suggestCorrectFlag(flag: string): string {
    return `Try using: -${flag.replace(/^-+/, '')}`;
  }

  private suggestCorrectOption(option: string): string {
    return `Correct format: --option=value`;
  }

  private levenshteinDistance(a: string, b: string): number {
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