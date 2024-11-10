import { Lab } from '@/types/lab';

export const kubernetesBasicsLab: Lab = {
  id: 'kubernetes-basics',
  title: 'Kubernetes Fundamentals',
  description: 'Learn the core concepts of Kubernetes container orchestration, from pods to deployments.',
  duration: '60 minutes',
  difficulty: 'Intermediate',
  category: 'Kubernetes',
  image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=1200',
  prerequisites: ['Docker basics'],
  tasks: [
    {
      id: 1,
      title: 'Verify Cluster Connection',
      description: 'Check your connection to the Kubernetes cluster',
      command: 'kubectl cluster-info',
      hint: 'Use kubectl cluster-info to verify cluster connectivity'
    },
    {
      id: 2,
      title: 'Create Your First Pod',
      description: 'Deploy a simple Nginx pod to the cluster',
      command: 'kubectl run nginx --image=nginx',
      hint: 'Use kubectl run with the --image flag'
    },
    {
      id: 3,
      title: 'List Running Pods',
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
      title: 'Create a Deployment',
      description: 'Create a deployment to manage multiple Nginx pods',
      command: 'kubectl create deployment nginx-deploy --image=nginx --replicas=3',
      hint: 'Use kubectl create deployment with --replicas flag'
    },
    {
      id: 6,
      title: 'Scale the Deployment',
      description: 'Scale the Nginx deployment to 5 replicas',
      command: 'kubectl scale deployment nginx-deploy --replicas=5',
      hint: 'Use kubectl scale deployment to change replica count'
    },
    {
      id: 7,
      title: 'Expose the Deployment',
      description: 'Create a service to expose the Nginx deployment',
      command: 'kubectl expose deployment nginx-deploy --port=80 --type=LoadBalancer',
      hint: 'Use kubectl expose to create a service'
    },
    {
      id: 8,
      title: 'View Services',
      description: 'List all services in the current namespace',
      command: 'kubectl get services',
      hint: 'Use kubectl get services to list all services'
    }
  ]
};