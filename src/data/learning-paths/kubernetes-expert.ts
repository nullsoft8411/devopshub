import { LearningPath } from '@/types/learning-path';

export const kubernetesExpertPath: LearningPath = {
  id: 'kubernetes-expert',
  title: 'Kubernetes Expert',
  description: 'Master Kubernetes orchestration from basics to advanced concepts',
  level: 'Advanced',
  duration: '3 months',
  category: 'Kubernetes',
  image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=1200',
  prerequisites: [
    {
      id: 'docker-basics',
      type: 'course',
      title: 'Docker Fundamentals',
      description: 'Basic container concepts and Docker usage',
      completed: false
    }
  ],
  milestones: [
    {
      id: 'k8s-basics',
      title: 'Kubernetes Fundamentals',
      description: 'Complete basic Kubernetes operations and concepts',
      xpReward: 1000,
      completed: false
    },
    {
      id: 'k8s-advanced',
      title: 'Advanced Operations',
      description: 'Master advanced Kubernetes features and patterns',
      xpReward: 1500,
      completed: false
    }
  ],
  courses: [
    'kubernetes-basics',
    'kubernetes-networking',
    'kubernetes-security',
    'kubernetes-advanced-ops'
  ],
  skills: [
    'Container Orchestration',
    'Kubernetes Architecture',
    'Service Management',
    'Pod Scheduling',
    'Cluster Administration',
    'Security Policies'
  ],
  certification: {
    name: 'Certified Kubernetes Expert',
    description: 'Professional certification for Kubernetes expertise',
    validityPeriod: '2 years'
  }
};