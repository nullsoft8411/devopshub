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
    cost: number;
  }> {
    const hints = [];

    // Basic syntax hint
    hints.push({
      type: this.HINT_LEVELS.BASIC,
      content: this.generateSyntaxHint(command),
      cost: 10
    });

    // Usage pattern hint
    if (difficulty > 30) {
      hints.push({
        type: this.HINT_LEVELS.DETAILED,
        content: this.generateUsageHint(command, taskDescription),
        cost: 20
      });
    }

    // Advanced concept hint
    if (difficulty > 60) {
      hints.push({
        type: this.HINT_LEVELS.DETAILED,
        content: this.generateConceptHint(command),
        cost: 30
      });
    }

    // Solution hint (always available but expensive)
    hints.push({
      type: this.HINT_LEVELS.SOLUTION,
      content: this.generateSolutionHint(command),
      cost: 50
    });

    return hints;
  }

  private static generateSyntaxHint(command: string): string {
    const parts = command.split(' ');
    const baseCommand = parts[0];
    const flags = parts.filter(p => p.startsWith('-'));
    
    return `The command structure uses '${baseCommand}' with ${
      flags.length ? `these flags: ${flags.join(', ')}` : 'no flags'
    }.`;
  }

  private static generateUsageHint(command: string, taskDescription: string): string {
    return `This command is typically used when you need to ${
      taskDescription.toLowerCase().includes('create') ? 'create or set up' :
      taskDescription.toLowerCase().includes('remove') ? 'remove or clean up' :
      taskDescription.toLowerCase().includes('modify') ? 'modify or update' :
      'manage'
    } resources.`;
  }

  private static generateConceptHint(command: string): string {
    return `Understanding the underlying concept: This command is part of ${
      command.startsWith('docker') ? 'container management' :
      command.startsWith('kubectl') ? 'container orchestration' :
      command.startsWith('git') ? 'version control' :
      'system administration'
    } operations.`;
  }

  private static generateSolutionHint(command: string): string {
    return `Complete solution: Use the command '${command}' ${
      this.getCommandExplanation(command)
    }`;
  }

  private static getCommandExplanation(command: string): string {
    const parts = command.split(' ');
    const flags = parts.filter(p => p.startsWith('-'));
    const args = parts.filter(p => !p.startsWith('-') && p !== parts[0]);

    return flags.length || args.length ?
      `where ${
        flags.length ? `${flags.join(', ')} ${flags.length === 1 ? 'is the flag' : 'are the flags'}` : ''
      }${flags.length && args.length ? ' and ' : ''}${
        args.length ? `${args.join(', ')} ${args.length === 1 ? 'is the argument' : 'are the arguments'}` : ''
      }.` :
      'without any additional flags or arguments.';
  }
}