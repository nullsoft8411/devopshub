import { DockerCommand } from '@/types/lab';

export const dockerCommands: Record<string, DockerCommand> = {
  'docker pull nginx': {
    command: 'docker pull nginx',
    description: 'Pull the nginx image from Docker Hub',
    output: 'Using default tag: latest\n' +
      'latest: Pulling from library/nginx\n' +
      'a2abf6c4d29d: Pull complete\n' +
      'a9edb18cadd1: Pull complete\n' +
      '589b7251471a: Pull complete\n' +
      'Status: Downloaded newer image for nginx:latest\n' +
      'docker.io/library/nginx:latest'
  },
  'docker run -d -p 80:80 nginx': {
    command: 'docker run -d -p 80:80 nginx',
    description: 'Run nginx container in detached mode with port mapping',
    output: '3a09b2588478c5ebf3a1d562713a718a5f0552c93123c47f15d303e8f6f6d553'
  },
  'docker ps': {
    command: 'docker ps',
    description: 'List running containers',
    output: 'CONTAINER ID   IMAGE   COMMAND                  CREATED         STATUS         PORTS                               NAMES\n' +
      '3a09b2588478   nginx   "/docker-entrypoint.…"   5 seconds ago   Up 3 seconds   0.0.0.0:80->80/tcp, :::80->80/tcp   wizardly_darwin'
  },
  'docker stop $(docker ps -q)': {
    command: 'docker stop $(docker ps -q)',
    description: 'Stop all running containers',
    output: '3a09b2588478'
  },
  'docker rm $(docker ps -aq)': {
    command: 'docker rm $(docker ps -aq)',
    description: 'Remove all containers',
    output: '3a09b2588478'
  },
  'docker images': {
    command: 'docker images',
    description: 'List all images',
    output: 'REPOSITORY   TAG       IMAGE ID       CREATED        SIZE\n' +
      'nginx        latest    605c77e624dd   2 days ago     141MB'
  },
  'docker network ls': {
    command: 'docker network ls',
    description: 'List all networks',
    output: 'NETWORK ID     NAME      DRIVER    SCOPE\n' +
      '075b9f628ccc   bridge    bridge    local\n' +
      '8ba6019c5b17   host      host      local\n' +
      'c2ca34d69a39   none      null      local'
  }
};