import { DockerCommand } from '@/types/lab';
import { commandRegistry } from '@/lib/command-registry';

export interface EnvironmentState {
  containers: string[];
  networks: string[];
  volumes: string[];
  variables: Record<string, string>;
}

export class LabEnvironment {
  private state: EnvironmentState;
  private history: string[];
  private startTime: Date;

  constructor() {
    this.state = {
      containers: [],
      networks: [],
      volumes: [],
      variables: {}
    };
    this.history = [];
    this.startTime = new Date();
  }

  async executeCommand(command: string): Promise<{
    output: string;
    success: boolean;
    state: EnvironmentState;
  }> {
    this.history.push(command);

    const registryCommand = commandRegistry[command];
    if (!registryCommand) {
      return {
        output: 'Command not found',
        success: false,
        state: this.state
      };
    }

    // Update environment state based on command
    this.updateState(command);

    return {
      output: registryCommand.output,
      success: true,
      state: this.state
    };
  }

  private updateState(command: string) {
    const parts = command.split(' ');
    
    switch (parts[0]) {
      case 'docker':
        this.handleDockerCommand(parts.slice(1));
        break;
      case 'kubectl':
        this.handleKubernetesCommand(parts.slice(1));
        break;
      // Add more command handlers as needed
    }
  }

  private handleDockerCommand(args: string[]) {
    switch (args[0]) {
      case 'run':
        const containerName = this.extractContainerName(args);
        if (containerName) {
          this.state.containers.push(containerName);
        }
        break;
      case 'network':
        if (args[1] === 'create') {
          this.state.networks.push(args[2]);
        }
        break;
      case 'volume':
        if (args[1] === 'create') {
          this.state.volumes.push(args[2]);
        }
        break;
      case 'rm':
        const containerIndex = this.state.containers.indexOf(args[1]);
        if (containerIndex > -1) {
          this.state.containers.splice(containerIndex, 1);
        }
        break;
    }
  }

  private handleKubernetesCommand(args: string[]) {
    // Similar to Docker command handling
    // Implement Kubernetes-specific state updates
  }

  private extractContainerName(args: string[]): string | null {
    const nameFlag = args.indexOf('--name');
    if (nameFlag > -1 && args[nameFlag + 1]) {
      return args[nameFlag + 1];
    }
    return null;
  }

  getState(): EnvironmentState {
    return { ...this.state };
  }

  getHistory(): string[] {
    return [...this.history];
  }

  getSessionDuration(): number {
    return new Date().getTime() - this.startTime.getTime();
  }

  reset() {
    this.state = {
      containers: [],
      networks: [],
      volumes: [],
      variables: {}
    };
    this.history = [];
  }
}