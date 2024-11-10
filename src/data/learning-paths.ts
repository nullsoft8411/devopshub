import { LearningPath } from '@/types/learning-path';
import { kubernetesExpertPath } from './learning-paths/kubernetes-expert';

export const learningPaths: LearningPath[] = [
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    description: 'Master modern software delivery practices and tools',
    level: 'Intermediate',
    duration: '6 months',
    category: 'DevOps',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=1200',
    prerequisites: [
      {
        id: 'linux-basics',
        type: 'course',
        title: 'Linux Fundamentals',
        description: 'Basic Linux system administration',
        completed: false
      },
      {
        id: 'git-basics',
        type: 'skill',
        title: 'Git Version Control',
        description: 'Basic Git operations and workflow',
        completed: false
      }
    ],
    milestones: [
      {
        id: 'containers-mastery',
        title: 'Container Mastery',
        description: 'Complete all Docker and container orchestration courses',
        xpReward: 1000,
        completed: false
      },
      {
        id: 'ci-cd-expert',
        title: 'CI/CD Expert',
        description: 'Build and deploy applications using modern CI/CD tools',
        xpReward: 1500,
        completed: false
      }
    ],
    courses: [
      'docker-fundamentals',
      'kubernetes-essentials',
      'ci-cd-pipeline',
      'infrastructure-as-code',
      'monitoring-logging'
    ],
    skills: [
      'Container Orchestration',
      'Infrastructure as Code',
      'CI/CD Pipelines',
      'Cloud Platforms',
      'Monitoring & Logging'
    ],
    certification: {
      name: 'Certified DevOps Engineer',
      description: 'Professional certification for DevOps practices',
      validityPeriod: '2 years'
    }
  },
  kubernetesExpertPath,
  {
    id: 'cloud-architect',
    title: 'Cloud Architect',
    description: 'Design and implement scalable cloud solutions',
    level: 'Advanced',
    duration: '8 months',
    category: 'Cloud',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
    prerequisites: [
      {
        id: 'devops-basics',
        type: 'certification',
        title: 'DevOps Fundamentals',
        description: 'Basic DevOps principles and practices',
        completed: false
      },
      {
        id: 'aws-basics',
        type: 'course',
        title: 'AWS Essentials',
        description: 'Fundamental AWS services and concepts',
        completed: false
      }
    ],
    milestones: [
      {
        id: 'cloud-infrastructure',
        title: 'Cloud Infrastructure Expert',
        description: 'Design and implement cloud infrastructure at scale',
        xpReward: 2000,
        completed: false
      },
      {
        id: 'security-compliance',
        title: 'Security & Compliance Master',
        description: 'Implement secure and compliant cloud solutions',
        xpReward: 1800,
        completed: false
      }
    ],
    courses: [
      'aws-architecture',
      'cloud-security',
      'microservices',
      'serverless-computing',
      'cloud-networking'
    ],
    skills: [
      'Cloud Architecture',
      'Security & Compliance',
      'Cost Optimization',
      'High Availability',
      'Disaster Recovery'
    ],
    certification: {
      name: 'Certified Cloud Architect',
      description: 'Professional certification for cloud architecture',
      validityPeriod: '2 years'
    }
  }
];