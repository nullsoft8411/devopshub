import { DockerCommand } from '@/types/lab';
import { dockerCommands } from './docker-commands';
import { kubernetesCommands } from './kubernetes-commands';
import { gitCommands } from './git-commands';
import { linuxCommands } from './linux-commands';
import { awsCommands } from './aws-commands';

export const commandRegistry: Record<string, DockerCommand> = {
  ...dockerCommands,
  ...kubernetesCommands,
  ...gitCommands,
  ...linuxCommands,
  ...awsCommands
};