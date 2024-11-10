import { DockerCommand } from '@/types/lab';

export const gitCommands: Record<string, DockerCommand> = {
  'git init': {
    command: 'git init',
    description: 'Initialize a new Git repository',
    output: 'Initialized empty Git repository in /project/.git/'
  },
  'git add .': {
    command: 'git add .',
    description: 'Stage all changes',
    output: ''
  },
  'git status': {
    command: 'git status',
    description: 'Show working tree status',
    output: 'On branch main\n\n' +
      'No commits yet\n\n' +
      'Changes to be committed:\n' +
      '  (use "git rm --cached <file>..." to unstage)\n' +
      '        new file:   README.md\n' +
      '        new file:   src/index.js\n'
  },
  'git commit -m "Initial commit"': {
    command: 'git commit -m "Initial commit"',
    description: 'Create a new commit',
    output: '[main (root-commit) f7b7a3d] Initial commit\n' +
      ' 2 files changed, 25 insertions(+)\n' +
      ' create mode 100644 README.md\n' +
      ' create mode 100644 src/index.js'
  },
  'git log': {
    command: 'git log',
    description: 'Show commit history',
    output: 'commit f7b7a3d9f4d9c9d4e6f8g9h0i1j2k3l4m5n6o7\n' +
      'Author: John Doe <john@example.com>\n' +
      'Date:   Mon Jan 1 12:00:00 2024 +0000\n\n' +
      '    Initial commit'
  }
};