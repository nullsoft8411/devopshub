import { Lab } from '@/types/lab';

export const kubernetesAdvancedLab: Lab = {
  id: 'kubernetes-advanced',
  title: 'Advanced Kubernetes Operations',
  description: 'Master advanced Kubernetes concepts including StatefulSets, DaemonSets, and custom resources.',
  duration: '90 minutes',
  difficulty: 'Advanced',
  category: 'Kubernetes',
  image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=1200',
  prerequisites: ['Kubernetes basics'],
  tasks: [
    {
      id: 1,
      title: 'Create a StatefulSet',
      description: 'Deploy a StatefulSet for a database application',
      command: 'kubectl apply -f mysql-statefulset.yaml',
      hint: 'Use kubectl apply with a StatefulSet configuration'
    },
    {
      id: 2,
      title: 'Create Persistent Volumes',
      description: 'Set up persistent storage for the StatefulSet',
      command: 'kubectl apply -f mysql-pv.yaml',
      hint: 'Apply the PersistentVolume configuration'
    },
    {
      id: 3,
      title: 'Deploy a DaemonSet',
      description: 'Create a DaemonSet for logging agents',
      command: 'kubectl apply -f logging-daemonset.yaml',
      hint: 'Use kubectl apply with a DaemonSet configuration'
    },
    {
      id: 4,
      title: 'Configure Resource Quotas',
      description: 'Set resource limits for the namespace',
      command: 'kubectl apply -f resource-quota.yaml',
      hint: 'Apply ResourceQuota configuration'
    },
    {
      id: 5,
      title: 'Create Network Policies',
      description: 'Implement network security policies',
      command: 'kubectl apply -f network-policy.yaml',
      hint: 'Apply NetworkPolicy configuration'
    },
    {
      id: 6,
      title: 'Configure HPA',
      description: 'Set up Horizontal Pod Autoscaling',
      command: 'kubectl autoscale deployment nginx-deploy --min=2 --max=10 --cpu-percent=80',
      hint: 'Use kubectl autoscale for HPA configuration'
    },
    {
      id: 7,
      title: 'Deploy Ingress Controller',
      description: 'Set up an Ingress controller for routing',
      command: 'kubectl apply -f ingress-controller.yaml',
      hint: 'Apply Ingress Controller configuration'
    },
    {
      id: 8,
      title: 'Configure RBAC',
      description: 'Set up Role-Based Access Control',
      command: 'kubectl apply -f rbac-config.yaml',
      hint: 'Apply RBAC configuration files'
    }
  ]
};