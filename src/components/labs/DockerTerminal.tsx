import React from 'react';
import { Terminal } from './Terminal';
import { DockerValidator } from '@/lib/validation/dockerValidator';

interface DockerTerminalProps {
  onCommand: (command: string) => void;
  expectedCommand: string;
  className?: string;
}

export function DockerTerminal({
  onCommand,
  expectedCommand,
  className = ''
}: DockerTerminalProps) {
  const handleCommand = (command: string) => {
    const output = validateDockerCommand(command, expectedCommand);
    onCommand(command);
    return output;
  };

  const validateDockerCommand = (command: string, expected: string): string => {
    if (command !== expected) {
      return `Command '${command}' not recognized. ${DockerValidator.getHint(command)}`;
    }

    // Simulate Docker command output
    switch (true) {
      case command.includes('--version'):
        return 'Docker version 24.0.7, build afdd53b';
      case command.includes('pull nginx'):
        return 'Using default tag: latest\nlatest: Pulling from library/nginx\nDigest: sha256:abc123\nStatus: Downloaded newer image for nginx:latest\ndocker.io/library/nginx:latest';
      case command.includes('docker run'):
        return 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2';
      case command.includes('docker ps'):
        return 'CONTAINER ID   IMAGE   COMMAND   CREATED   STATUS   PORTS   NAMES\na1b2c3d4e5f6   nginx   "/docker-entrypoint.…"   2 minutes ago   Up 2 minutes   0.0.0.0:80->80/tcp   eloquent_newton';
      default:
        return 'Command executed successfully';
    }
  };

  return (
    <Terminal
      onCommand={handleCommand}
      className={className}
      prompt="$ "
    />
  );
}