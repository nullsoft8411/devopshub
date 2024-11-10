import { DockerCommand } from '@/types/lab';

export const linuxCommands: Record<string, DockerCommand> = {
  'uname -a': {
    command: 'uname -a',
    description: 'Show system information',
    output: 'Linux localhost 5.15.0-1031-aws #35-Ubuntu SMP Fri Feb 10 02:07:18 UTC 2023 x86_64 x86_64 x86_64 GNU/Linux'
  },
  'df -h': {
    command: 'df -h',
    description: 'Show disk usage',
    output: 'Filesystem      Size  Used Avail Use% Mounted on\n' +
      '/dev/root       30G   15G   15G  50% /\n' +
      'tmpfs          2.0G     0  2.0G   0% /dev/shm\n' +
      '/dev/sda1      500M   50M  450M  10% /boot'
  },
  'ps aux': {
    command: 'ps aux',
    description: 'List all processes',
    output: 'USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\n' +
      'root         1  0.0  0.1 169684  9164 ?        Ss   Feb10   0:04 /sbin/init\n' +
      'root         2  0.0  0.0      0     0 ?        S    Feb10   0:00 [kthreadd]'
  },
  'free -h': {
    command: 'free -h',
    description: 'Show memory usage',
    output: '              total        used        free      shared  buff/cache   available\n' +
      'Mem:           7.7Gi       1.2Gi       4.8Gi       286Mi       1.7Gi       5.9Gi\n' +
      'Swap:          2.0Gi          0B       2.0Gi'
  },
  'netstat -tuln': {
    command: 'netstat -tuln',
    description: 'Show network connections',
    output: 'Proto Recv-Q Send-Q Local Address           Foreign Address         State\n' +
      'tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN\n' +
      'tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN'
  }
};