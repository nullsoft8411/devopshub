import { DockerCommand } from '@/types/lab';

export const awsCommands: Record<string, DockerCommand> = {
  'aws s3 ls': {
    command: 'aws s3 ls',
    description: 'List S3 buckets',
    output: '2024-01-01 12:00:00 my-bucket\n' +
      '2024-01-02 13:00:00 my-assets\n' +
      '2024-01-03 14:00:00 my-backups'
  },
  'aws ec2 describe-instances': {
    command: 'aws ec2 describe-instances',
    description: 'List EC2 instances',
    output: '{\n' +
      '    "Reservations": [\n' +
      '        {\n' +
      '            "Instances": [\n' +
      '                {\n' +
      '                    "InstanceId": "i-1234567890abcdef0",\n' +
      '                    "InstanceType": "t2.micro",\n' +
      '                    "State": {\n' +
      '                        "Name": "running"\n' +
      '                    }\n' +
      '                }\n' +
      '            ]\n' +
      '        }\n' +
      '    ]\n' +
      '}'
  },
  'aws iam list-users': {
    command: 'aws iam list-users',
    description: 'List IAM users',
    output: '{\n' +
      '    "Users": [\n' +
      '        {\n' +
      '            "UserName": "admin",\n' +
      '            "UserId": "AIDA1234567890EXAMPLE",\n' +
      '            "CreateDate": "2024-01-01T12:00:00Z"\n' +
      '        }\n' +
      '    ]\n' +
      '}'
  },
  'aws ec2 describe-security-groups': {
    command: 'aws ec2 describe-security-groups',
    description: 'List security groups',
    output: '{\n' +
      '    "SecurityGroups": [\n' +
      '        {\n' +
      '            "GroupName": "default",\n' +
      '            "GroupId": "sg-1234567890abcdef0",\n' +
      '            "Description": "default VPC security group"\n' +
      '        }\n' +
      '    ]\n' +
      '}'
  },
  'aws cloudwatch describe-alarms': {
    command: 'aws cloudwatch describe-alarms',
    description: 'List CloudWatch alarms',
    output: '{\n' +
      '    "MetricAlarms": [\n' +
      '        {\n' +
      '            "AlarmName": "CPUUtilization",\n' +
      '            "AlarmDescription": "CPU usage exceeds 80%",\n' +
      '            "StateValue": "OK"\n' +
      '        }\n' +
      '    ]\n' +
      '}'
  }
};