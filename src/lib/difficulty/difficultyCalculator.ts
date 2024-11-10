export class DifficultyCalculator {
  private static readonly WEIGHT_COMPLEXITY = 0.4;
  private static readonly WEIGHT_ATTEMPTS = 0.3;
  private static readonly WEIGHT_TIME = 0.3;

  static calculateComplexity(
    commandComplexity: number,
    prerequisiteCount: number,
    dependencyCount: number
  ): number {
    const baseComplexity = commandComplexity * 0.5;
    const prerequisiteWeight = Math.min(prerequisiteCount * 10, 30);
    const dependencyWeight = Math.min(dependencyCount * 5, 20);

    return Math.min(baseComplexity + prerequisiteWeight + dependencyWeight, 100);
  }

  static calculatePerformanceScore(
    attempts: number,
    timeSpent: number,
    expectedTime: number,
    complexity: number
  ): number {
    const attemptScore = Math.max(100 - (attempts - 1) * 20, 0);
    const timeScore = Math.max(100 - ((timeSpent - expectedTime) / expectedTime) * 100, 0);
    const complexityFactor = 1 + (complexity / 100) * 0.5;

    const weightedScore = (
      attemptScore * this.WEIGHT_ATTEMPTS +
      timeScore * this.WEIGHT_TIME
    ) * complexityFactor;

    return Math.min(Math.max(Math.round(weightedScore), 0), 100);
  }

  static getAssistanceThreshold(complexity: number): number {
    return Math.max(30, Math.min(70, complexity - 20));
  }

  static shouldProvideAssistance(
    performanceScore: number,
    attempts: number,
    timeSpent: number,
    expectedTime: number
  ): boolean {
    return (
      performanceScore < 60 ||
      attempts > 3 ||
      timeSpent > expectedTime * 1.5
    );
  }

  static getRecommendedLevel(complexity: number): string {
    if (complexity < 30) return 'Beginner';
    if (complexity < 60) return 'Intermediate';
    return 'Advanced';
  }
}