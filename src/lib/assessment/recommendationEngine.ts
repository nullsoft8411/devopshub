import { Lab } from '@/types/lab';

interface SkillGap {
  skill: string;
  currentLevel: number;
  targetLevel: number;
}

interface Recommendation {
  title: string;
  description: string;
  resourceUrl?: string;
  priority: number;
}

export class RecommendationEngine {
  private lab: Lab;
  private skillGaps: SkillGap[];
  private performance: {
    accuracy: number;
    efficiency: number;
    completionTime: number;
  };

  constructor(
    lab: Lab,
    skillGaps: SkillGap[],
    performance: {
      accuracy: number;
      efficiency: number;
      completionTime: number;
    }
  ) {
    this.lab = lab;
    this.skillGaps = skillGaps;
    this.performance = performance;
  }

  generateRecommendations(): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Add skill-based recommendations
    this.skillGaps
      .filter(gap => gap.targetLevel - gap.currentLevel > 20)
      .forEach(gap => {
        recommendations.push(this.getSkillRecommendation(gap));
      });

    // Add performance-based recommendations
    if (this.performance.accuracy < 70) {
      recommendations.push({
        title: 'Improve Command Accuracy',
        description: 'Practice the basic commands and syntax to improve your accuracy.',
        resourceUrl: '/resources/command-basics',
        priority: 1
      });
    }

    if (this.performance.efficiency < 60) {
      recommendations.push({
        title: 'Enhance Workflow Efficiency',
        description: 'Learn keyboard shortcuts and command patterns to work faster.',
        resourceUrl: '/resources/workflow-optimization',
        priority: 2
      });
    }

    // Add time management recommendations
    if (this.performance.completionTime > this.getExpectedCompletionTime() * 1.5) {
      recommendations.push({
        title: 'Time Management',
        description: 'Work on completing tasks within the suggested timeframe.',
        resourceUrl: '/resources/time-management',
        priority: 3
      });
    }

    // Sort by priority and return top recommendations
    return recommendations
      .sort((a, b) => a.priority - b.priority)
      .slice(0, 3);
  }

  private getSkillRecommendation(gap: SkillGap): Recommendation {
    const recommendations: Record<string, Recommendation> = {
      'Container Management': {
        title: 'Master Docker Fundamentals',
        description: 'Focus on container lifecycle and management commands.',
        resourceUrl: '/courses/docker-basics',
        priority: 1
      },
      'Orchestration': {
        title: 'Improve Kubernetes Skills',
        description: 'Practice with pods, deployments, and services.',
        resourceUrl: '/courses/kubernetes-essentials',
        priority: 1
      },
      'Version Control': {
        title: 'Git Workflow Mastery',
        description: 'Learn advanced git commands and branching strategies.',
        resourceUrl: '/courses/git-advanced',
        priority: 2
      },
      'System Administration': {
        title: 'Linux Administration',
        description: 'Strengthen your command line and system management skills.',
        resourceUrl: '/courses/linux-admin',
        priority: 2
      }
    };

    return recommendations[gap.skill] || {
      title: `Improve ${gap.skill}`,
      description: 'Practice more exercises in this area.',
      priority: 3
    };
  }

  private getExpectedCompletionTime(): number {
    const match = this.lab.duration.match(/(\d+)\s*(minute|hour)s?/);
    if (!match) return 3600000; // Default to 1 hour
    const [, value, unit] = match;
    return unit === 'hour'
      ? parseInt(value) * 60 * 60 * 1000
      : parseInt(value) * 60 * 1000;
  }
}