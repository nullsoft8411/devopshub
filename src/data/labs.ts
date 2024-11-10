import { Lab } from '@/types/lab';

export const labs: Lab[] = [
  {
    id: 'docker-basics',
    title: 'Docker Basics',
    description: 'Learn fundamental Docker commands and container management',
    duration: '45 minutes',
    difficulty: 'Beginner',
    category: 'Docker',
    prerequisites: ['Basic command line knowledge'],
    tasks: [
      {
        id: 1,
        title: 'Pull Nginx Image',
        description: 'Pull the official Nginx image from Docker Hub',
        command: 'docker pull nginx',
        hint: 'Use the docker pull command followed by the image name'
      },
      {
        id: 2,
        title: 'Run Nginx Container',
        description: 'Start a new Nginx container and map port 80',
        command: 'docker run -d -p 80:80 nginx',
        hint: 'Use docker run with -d (detach) and -p (port mapping) flags'
      },
      {
        id: 3,
        title: 'List Running Containers',
        description: 'View all currently running Docker containers',
        command: 'docker ps',
        hint: 'Use the docker ps command to list active containers'
      },
      {
        id: 4,
        title: 'List Docker Images',
        description: 'View all Docker images on your system',
        command: 'docker images',
        hint: 'Use the docker images command to see local images'
      },
      {
        id: 5,
        title: 'Explore Docker Networks',
        description: 'List all Docker networks',
        command: 'docker network ls',
        hint: 'Use docker network ls to view network configurations'
      }
    ]
  },
  {
    id: 'kubernetes-pods',
    title: 'Kubernetes Pods',
    description: 'Learn to manage Kubernetes pods and basic deployments',
    duration: '60 minutes',
    difficulty: 'Intermediate',
    category: 'Kubernetes',
    prerequisites: ['Docker basics', 'Basic Kubernetes knowledge'],
    tasks: [
      {
        id: 1,
        title: 'Check Cluster Status',
        description: 'Verify your connection to the Kubernetes cluster',
        command: 'kubectl cluster-info',
        hint: 'Use kubectl cluster-info to see cluster details'
      },
      {
        id: 2,
        title: 'Create Nginx Pod',
        description: 'Deploy a single Nginx pod to the cluster',
        command: 'kubectl run nginx --image=nginx',
        hint: 'Use kubectl run with the --image flag'
      },
      {
        id: 3,
        title: 'List Pods',
        description: 'View all pods in the current namespace',
        command: 'kubectl get pods',
        hint: 'Use kubectl get pods to list all pods'
      },
      {
        id: 4,
        title: 'Pod Details',
        description: 'Get detailed information about the Nginx pod',
        command: 'kubectl describe pod nginx',
        hint: 'Use kubectl describe pod followed by the pod name'
      },
      {
        id: 5,
        title: 'Delete Pod',
        description: 'Remove the Nginx pod from the cluster',
        command: 'kubectl delete pod nginx',
        hint: 'Use kubectl delete pod followed by the pod name'
      }
    ]
  },
  {
    id: 'git-workflow',
    title: 'Git Workflow',
    description: 'Master essential Git commands and workflow patterns',
    duration: '30 minutes',
    difficulty: 'Beginner',
    category: 'Version Control',
    prerequisites: ['Basic command line knowledge'],
    tasks: [
      {
        id: 1,
        title: 'Initialize Repository',
        description: 'Create a new Git repository',
        command: 'git init',
        hint: 'Use git init to create a new repository'
      },
      {
        id: 2,
        title: 'Stage Changes',
        description: 'Add files to the staging area',
        command: 'git add .',
        hint: 'Use git add . to stage all changes'
      },
      {
        id: 3,
        title: 'Check Status',
        description: 'View the status of your working directory',
        command: 'git status',
        hint: 'Use git status to see current changes'
      },
      {
        id: 4,
        title: 'Create Commit',
        description: 'Commit your changes with a message',
        command: 'git commit -m "Initial commit"',
        hint: 'Use git commit -m with a descriptive message'
      },
      {
        id: 5,
        title: 'View History',
        description: 'Check the commit history',
        command: 'git log',
        hint: 'Use git log to view commit history'
      }
    ]
  },
  {
    id: 'linux-basics',
    title: 'Linux System Administration',
    description: 'Learn essential Linux commands and system management',
    duration: '45 minutes',
    difficulty: 'Beginner',
    category: 'Linux',
    prerequisites: ['None'],
    tasks: [
      {
        id: 1,
        title: 'System Information',
        description: 'View system information and OS details',
        command: 'uname -a',
        hint: 'Use uname -a to see system details'
      },
      {
        id: 2,
        title: 'Disk Usage',
        description: 'Check disk space usage',
        command: 'df -h',
        hint: 'Use df -h to see human-readable disk usage'
      },
      {
        id: 3,
        title: 'Process List',
        description: 'View running processes',
        command: 'ps aux',
        hint: 'Use ps aux to list all processes'
      },
      {
        id: 4,
        title: 'Memory Usage',
        description: 'Check system memory usage',
        command: 'free -h',
        hint: 'Use free -h to see memory statistics'
      },
      {
        id: 5,
        title: 'Network Connections',
        description: 'View active network connections',
        command: 'netstat -tuln',
        hint: 'Use netstat to list network connections'
      }
    ]
  },
  {
    id: 'aws-cli',
    title: 'AWS CLI Essentials',
    description: 'Learn to manage AWS resources using the command line',
    duration: '60 minutes',
    difficulty: 'Advanced',
    category: 'Cloud',
    prerequisites: ['AWS account', 'Basic CLI knowledge'],
    tasks: [
      {
        id: 1,
        title: 'List S3 Buckets',
        description: 'View all S3 buckets in your account',
        command: 'aws s3 ls',
        hint: 'Use aws s3 ls to list buckets'
      },
      {
        id: 2,
        title: 'EC2 Instances',
        description: 'List running EC2 instances',
        command: 'aws ec2 describe-instances',
        hint: 'Use aws ec2 describe-instances to view EC2s'
      },
      {
        id: 3,
        title: 'IAM Users',
        description: 'List IAM users in your account',
        command: 'aws iam list-users',
        hint: 'Use aws iam list-users to see IAM users'
      },
      {
        id: 4,
        title: 'Security Groups',
        description: 'View EC2 security groups',
        command: 'aws ec2 describe-security-groups',
        hint: 'Use aws ec2 describe-security-groups'
      },
      {
        id: 5,
        title: 'CloudWatch Alarms',
        description: 'List CloudWatch alarms',
        command: 'aws cloudwatch describe-alarms',
        hint: 'Use aws cloudwatch describe-alarms'
      }
    ]
  }
];