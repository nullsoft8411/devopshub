import { DockerCommand } from '@/types/lab';

export const kubernetesCommands: Record<string, DockerCommand> = {
  'kubectl cluster-info': {
    command: 'kubectl cluster-info',
    description: 'Display cluster information',
    output: 'Kubernetes control plane is running at https://kubernetes.docker.internal:6443\n' +
      'CoreDNS is running at https://kubernetes.docker.internal:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy'
  },
  'kubectl run nginx --image=nginx': {
    command: 'kubectl run nginx --image=nginx',
    description: 'Create an Nginx pod',
    output: 'pod/nginx created'
  },
  'kubectl get pods': {
    command: 'kubectl get pods',
    description: 'List all pods',
    output: 'NAME    READY   STATUS    RESTARTS   AGE\n' +
      'nginx   1/1     Running   0          10s'
  },
  'kubectl describe pod nginx': {
    command: 'kubectl describe pod nginx',
    description: 'Show detailed pod information',
    output: 'Name:         nginx\n' +
      'Namespace:    default\n' +
      'Priority:     0\n' +
      'Node:         docker-desktop/192.168.65.4\n' +
      'Start Time:   Mon, 01 Jan 2024 12:00:00 +0000\n' +
      'Labels:       run=nginx\n' +
      'Status:       Running\n' +
      'IP:           10.1.0.1\n' +
      'Containers:\n' +
      '  nginx:\n' +
      '    Container ID:   docker://1234567890abcdef\n' +
      '    Image:          nginx\n' +
      '    Image ID:       docker-pullable://nginx@sha256:123456789\n' +
      '    Port:          <none>\n' +
      '    Host Port:     <none>\n' +
      '    State:         Running\n' +
      '      Started:     Mon, 01 Jan 2024 12:00:00 +0000\n' +
      '    Ready:         True'
  },
  'kubectl delete pod nginx': {
    command: 'kubectl delete pod nginx',
    description: 'Delete the Nginx pod',
    output: 'pod "nginx" deleted'
  }
};