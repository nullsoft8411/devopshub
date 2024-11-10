export class HintGenerator {
  private static readonly HINT_LEVELS = {
    BASIC: 'basic',
    DETAILED: 'detailed',
    SOLUTION: 'solution'
  };

  static generateHints(
    command: string,
    taskDescription: string,
    difficulty: number
  ): Array<{
    type: string;
    content: string;
    level: number;
  }> {
    const hints = [];

    // Basic syntax hint
    hints.push({
      type: this.HINT_LEVELS.BASIC,
      content: this.generateSyntaxHint(command),
      level: 1
    });

    // Usage pattern hint
    if (difficulty > 30) {
      hints.push({
        type: this.HINT_LEVELS.DETAILED,
        content: this.generateUsageHint(command, taskDescription),
        level: 2
      });
    }

    // Advanced concept hint
    if (difficulty > 60) {
      hints.push({
        type: this.HINT_LEVELS.DETAILED,
        content: this.generateConceptHint(command),
        level: 3
      });
    }

    return hints;
  }

  private static generateSyntaxHint(command: string): string {
    // Generate basic syntax explanation
    return `The command structure should follow: ${this.getCommandPattern(command)}`;
  }

  private static generateUsageHint(command: string, taskDescription: string): string {
    // Generate usage pattern explanation
    return `This command is typically used for: ${this.analyzeCommandPurpose(command, taskDescription)}`;
  }

  private static generateConceptHint(command: string): string {
    // Generate advanced concept explanation
    return `Understanding the underlying concept: ${this.explainConcept(command)}`;
  }

  private static getCommandPattern(command: string): string {
    // Extract and format command pattern
    const parts = command.split(' ');
    return parts.map(part => {
      if (part.startsWith('--')) return '<option>';
      if (part.startsWith('-')) return '<flag>';
      return '<command>';
    }).join(' ');
  }

  private static analyzeCommandPurpose(command: string, taskDescription: string): string {
    // Analyze and explain command purpose
    return `Based on the task: ${taskDescription}, this command helps you...`;
  }

  private static explainConcept(command: string): string {
    // Explain underlying concept
    return `This command relates to the concept of...`;
  }
}