import { DockerCommand } from '@/types/lab';

export class DockerValidator {
  static validateVersion(output: string): boolean {
    return output.includes('Docker version');
  }

  static validatePull(output: string): boolean {
    return output.includes('Status: Downloaded') || 
           output.includes('Status: Image is up to date');
  }

  static validateRun(output: string): boolean {
    // Docker container IDs are 64 characters long
    return /^[a-f0-9]{64}$/.test(output.trim());
  }

  static validatePs(output: string): boolean {
    return output.includes('CONTAINER ID') && 
           output.includes('IMAGE') && 
           output.includes('COMMAND');
  }

  static validateLogs(output: string): boolean {
    return output.includes('nginx') || 
           output.includes('server') || 
           output.includes('started');
  }

  static validateStop(output: string): boolean {
    // Stopped container IDs are 12 characters
    return /^[a-f0-9]{12}$/.test(output.trim());
  }

  static validateRm(output: string): boolean {
    // Removed container IDs are 12 characters
    return /^[a-f0-9]{12}$/.test(output.trim());
  }

  static validateImages(output: string): boolean {
    return output.includes('REPOSITORY') && 
           output.includes('TAG') && 
           output.includes('IMAGE ID');
  }

  static getHint(command: string): string {
    const hints: Record<string, string> = {
      'docker --version': 'Check if Docker is installed by running docker --version',
      'docker pull': 'Pull an image using docker pull [IMAGE_NAME]',
      'docker run': 'Run a container with docker run [OPTIONS] [IMAGE]',
      'docker ps': 'List running containers with docker ps',
      'docker logs': 'View container logs with docker logs [CONTAINER_ID]',
      'docker stop': 'Stop a container using docker stop [CONTAINER_ID]',
      'docker rm': 'Remove a container with docker rm [CONTAINER_ID]',
      'docker images': 'List all images using docker images'
    };

    const matchingHint = Object.entries(hints)
      .find(([key]) => command.startsWith(key));

    return matchingHint ? matchingHint[1] : 'Check the command syntax and try again';
  }
}