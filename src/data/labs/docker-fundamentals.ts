import { Lab } from '@/types/lab';

export const dockerFundamentalsLab: Lab = {
  id: 'docker-fundamentals',
  title: 'Docker Fundamentals',
  description: 'Master the basics of containerization with Docker. Learn essential commands, container management, and best practices for working with Docker in a production environment.',
  duration: '45 minutes',
  difficulty: 'Beginner',
  category: 'Docker',
  image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=1200',
  prerequisites: ['Basic command line knowledge'],
  tasks: [
    {
      id: 1,
      title: 'Docker Installation Check',
      description: 'Verify Docker installation and check the version',
      command: 'docker --version',
      hint: 'Use the --version flag to check Docker version',
      validation: (output: string) => output.includes('Docker version')
    },
    {
      id: 2,
      title: 'Pull Your First Image',
      description: 'Pull the official Nginx web server image from Docker Hub',
      command: 'docker pull nginx',
      hint: 'Use docker pull followed by the image name',
      validation: (output: string) => output.includes('Status: Downloaded') || output.includes('Status: Image is up to date')
    },
    {
      id: 3,
      title: 'Run Nginx Container',
      description: 'Start an Nginx container and map port 80',
      command: 'docker run -d -p 80:80 nginx',
      hint: 'Use -d for detached mode and -p for port mapping',
      validation: (output: string) => output.length === 64
    },
    {
      id: 4,
      title: 'List Running Containers',
      description: 'View all currently running Docker containers',
      command: 'docker ps',
      hint: 'docker ps shows running containers',
      validation: (output: string) => output.includes('nginx')
    },
    {
      id: 5,
      title: 'Container Logs',
      description: 'Check the logs of your running Nginx container',
      command: 'docker logs $(docker ps -q --filter ancestor=nginx)',
      hint: 'Use docker logs with container ID or name',
      validation: (output: string) => output.includes('nginx')
    },
    {
      id: 6,
      title: 'Stop Container',
      description: 'Stop the running Nginx container',
      command: 'docker stop $(docker ps -q --filter ancestor=nginx)',
      hint: 'Use docker stop with the container ID',
      validation: (output: string) => output.length === 12
    },
    {
      id: 7,
      title: 'Remove Container',
      description: 'Remove the stopped Nginx container',
      command: 'docker rm $(docker ps -aq --filter ancestor=nginx)',
      hint: 'Use docker rm to remove containers',
      validation: (output: string) => output.length === 12
    },
    {
      id: 8,
      title: 'List Docker Images',
      description: 'View all Docker images on your system',
      command: 'docker images',
      hint: 'docker images shows all local images',
      validation: (output: string) => output.includes('nginx')
    }
  ],
  resources: [
    {
      title: 'Docker Documentation',
      url: 'https://docs.docker.com/get-started/',
      type: 'documentation'
    },
    {
      title: 'Docker Command Cheatsheet',
      url: 'https://docs.docker.com/get-started/docker_cheatsheet.pdf',
      type: 'cheatsheet'
    }
  ]
};