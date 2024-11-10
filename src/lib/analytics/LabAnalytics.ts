export class LabAnalytics {
  static calculateSuccessRate(completedTasks: number, totalAttempts: number): number {
    return Math.round((completedTasks / totalAttempts) * 100);
  }

  static calculateAverageCompletionTime(completionTimes: number[]): string {
    if (completionTimes.length === 0) return '0m';
    
    const avgTime = completionTimes.reduce((a, b) => a + b, 0) / completionTimes.length;
    const minutes = Math.floor(avgTime / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  }

  static calculateDifficultyDistribution(feedbacks: Array<{ difficulty: string }>): {
    tooEasy: number;
    justRight: number;
    tooHard: number;
  } {
    const total = feedbacks.length;
    if (total === 0) {
      return { tooEasy: 0, justRight: 0, tooHard: 0 };
    }

    const counts = feedbacks.reduce((acc, { difficulty }) => {
      acc[difficulty] = (acc[difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      tooEasy: Math.round((counts.too_easy || 0) / total * 100),
      justRight: Math.round((counts.just_right || 0) / total * 100),
      tooHard: Math.round((counts.too_hard || 0) / total * 100)
    };
  }

  static calculateHelpfulnessScore(feedbacks: Array<{ helpful: boolean }>): number {
    if (feedbacks.length === 0) return 0;
    const helpfulCount = feedbacks.filter(f => f.helpful).length;
    return Math.round((helpfulCount / feedbacks.length) * 100);
  }

  static analyzeConceptsCovered(feedbacks: Array<{ concepts: string[] }>): Array<{
    name: string;
    count: number;
  }> {
    const conceptCounts = feedbacks.reduce((acc, { concepts }) => {
      concepts.forEach(concept => {
        acc[concept] = (acc[concept] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(conceptCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }
}